<template>
  <div class="form_center">
    <el-form ref="form" :model="form" :rules="rules" label-width="110px">
      <el-form-item label="商品上架：" prop="publishStatus">
        <el-switch
          v-model="form.publishStatus"
          :active-value="1"
          :inactive-value="0"
        >
        </el-switch>
      </el-form-item>
      <el-form-item label="新品：" prop="newStatus">
        <el-switch
          v-model="form.newStatus"
          :active-value="1"
          :inactive-value="0"
        >
        </el-switch>
      </el-form-item>
      <el-form-item label="推荐：" prop="recommandStatus">
        <el-switch
          v-model="form.recommandStatus"
          :active-value="1"
          :inactive-value="0"
        >
        </el-switch>
      </el-form-item>
      <el-form-item label="商品关键字：" prop="keywords">
        <el-input v-model="form.keywords"></el-input>
      </el-form-item>
    </el-form>
    <div class="btn_center">
      <el-button @click="handlePrev">上一步</el-button>
      <el-button type="primary" @click="handleNext">下一步</el-button>
    </div>
  </div>
</template>
<script>
import { addGoods } from "@/api/goodslist";
import Bus from "../Bus";
export default {
  data() {
    return {
      list2: [],
      form: {
        publishStatus: "",
        newStatus: "",
        recommandStatus: "",
        keywords: ""
      },
      rules: {
        keywords: [
          { required: true, message: "请输入商品关键字", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    handleNext() {
      this.$refs.form.validate(async valid => {
        if (valid) {
          console.log(this.form, "122222222");
          //发送请求 把数据保存到服务器
          let { data } = await addGoods(this.form);
          this.list2 = data;
          console.log(this.list2, "xxxxxxxxxxx2");
          Bus.$emit("eventType2", this.list2);
          this.$emit("nextStep");
        }
      });
    },
    handlePrev() {
      this.$emit("prevStep");
    }
  }
};
</script>
<style scoped>
.form_center {
  width: 70%;
  margin: 0 auto;
}
.btn_center {
  width: 200px;
  margin: 0 auto;
}
</style>
