<template>
  <div class="form_center">
    <el-form
      ref="editForm"
      :model="editForm"
      :rules="rules"
      label-width="110px"
    >
      <el-form-item label="商品上架：" prop="publishStatus">
        <el-switch
          v-model="editForm.publishStatus"
          :active-value="1"
          :inactive-value="0"
        >
        </el-switch>
      </el-form-item>
      <el-form-item label="新品：" prop="newStatus">
        <el-switch
          v-model="editForm.newStatus"
          :active-value="1"
          :inactive-value="0"
        >
        </el-switch>
      </el-form-item>
      <el-form-item label="推荐：" prop="recommandStatus">
        <el-switch
          v-model="editForm.recommandStatus"
          :active-value="1"
          :inactive-value="0"
        >
        </el-switch>
      </el-form-item>
      <el-form-item label="商品关键字：" prop="keywords">
        <el-input v-model="editForm.keywords"></el-input>
      </el-form-item>
    </el-form>
    <div class="btn_center">
      <el-button @click="handlePrev">上一步</el-button>
      <el-button type="primary" @click="handleNext">下一步</el-button>
    </div>
  </div>
</template>
<script>
import { addGoods, updateGoodList } from "@/api/goodslist";
import Bus from "../Bus";
export default {
  props: ["message"],
  data() {
    return {
      updatelist1: [],
      editForm: this.message,
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
    //提交新增资金流水表单
    async handleNext() {
      // console.log(data, "datadatadata");
      this.$refs.editForm.validate(async valid => {
        if (valid) {
          //发送请求 把数据保存到服务器
          let { data } = await updateGoodList(this.editForm);
          // console.log(this.newserachList, "122222211121211");
          this.updatelist1 = data;
          // console.log(this.updatelist1, "this.updatelist1");
          Bus.$emit("eventTypeupdate2", this.updatelist2);
          this.$emit("nextStep");
          // console.log(this.message, "message");

          // console.log(this.editForm, "editForm");
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
