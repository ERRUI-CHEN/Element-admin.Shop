<template>
  <div>
    <el-card
      class="form-container"
      shadow="never"
      align-center
      style="width:55%; margin:20px auto;"
    >
      <el-steps finish-status="success" :active="active" align-center style="margin-bottom:45px">
        <el-step title="填写商品信息"></el-step>
        <el-step title="填写商品促销"></el-step>
        <el-step title="填写商品属性"></el-step>
      </el-steps>
      <goods-info v-show="showStatus[0]" @nextStep="nextStep"></goods-info>
      <goods-sale v-show="showStatus[1]" @nextStep="nextStep" @prevStep="prevStep">></goods-sale>
      <goods-prop v-show="showStatus[2]" @nextStep="nextStep" @prevStep="prevStep">></goods-prop>
    </el-card>
  </div>
</template>
<script>
import GoodsInfo from './components/GoodsInfo.vue'
import GoodsProp from './components/GoodsProp.vue'
import GoodsSale from './components/GoodsSale.vue'

export default {
  data() {
    return {
      active: 0,
      showStatus: [true, false, false]
    };
  },
  created(){
       
  },
  methods: {
      hideAll() {
        for (let i = 0; i < this.showStatus.length; i++) {
          this.showStatus[i] = false;
        }
      },
      prevStep() {
        if (this.active > 0 && this.active < this.showStatus.length) {
          this.active--;
          this.hideAll();
          this.showStatus[this.active] = true;
        }
      },
      nextStep() {
        if (this.active < this.showStatus.length - 1) {
          this.active++;
          this.hideAll();
          this.showStatus[this.active] = true;
        }
      },
    },
    components:{
    GoodsInfo,
    GoodsProp,
    GoodsSale
  }
};
</script scoped>

