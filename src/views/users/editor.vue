<template>
  <div class="container">
    <el-row>
      <el-col :span="12">
        <p class="title">修改密码</p>
        <el-form
          :model="modifyForm"
          :rules="modifyRules"
          ref="modifyForm"
          label-width="100px"
          class="modifyForm"
        >
          <el-form-item label="原密码" prop="password">
            <el-input type="password" v-model="modifyForm.password"></el-input>
          </el-form-item>
          <el-form-item label="新密码" prop="newpassword">
            <el-input
              type="password"
              v-model="modifyForm.newpassword"
            ></el-input>
          </el-form-item>
          <el-form-item label="确认新密码" prop="surepassword">
            <el-input
              type="password"
              v-model="modifyForm.surepassword"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('modifyForm')"
              >立即创建</el-button
            >
            <el-button @click="resetForm('modifyForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>




<script>
import { modifyPwd } from "@/api/user";
export default {
  data() {
    let validateNewpassword = (rule, value, callback) => {
      if (value == "") {
        callback(new Error("请输入新密码"));
      } else {
        if (this.modifyForm.surepassword !== "") {
          //如果新密码文本框输入了内容，再去校验确认新密码文本框(保证新密码和确认新密码一致)
          this.$refs.modifyForm.validateField("surepassword");
        }
        callback();
      }
    };
    let validateSurepassword = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入确认密码"));
      } else if (value !== this.modifyForm.newpassword) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      modifyForm: {
        password: "",
        newpassword: "",
        surepassword: "",
      },
      modifyRules: {
        password: [
          { required: true, message: "请输入原密码", trigger: "blur" },
        ],
        newpassword: [
          { required: true, validator: validateNewpassword, trigger: "blur" },
        ],
        surepassword: [
          { required: true, validator: validateSurepassword, trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs.modifyForm.validate(async (valid) => {
        //如果表单校验通过，则发送请求
        if (valid) {
          //向服务器发送请求来修改密码
          let result = await modifyPwd(this.modifyForm);
          //给用户消息提示
          this.$message({
            message: result.data,
            type: "success",
          });
          //在下一次dom循环结束的重置表单
          this.$nextTick(() => {
            this.resetForm("modifyForm");
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>



<style lang="scss" scoped>
.container {
  .title {
    font-weight: bold;
    text-align: center;
    line-height: 50px;
  }
  padding: 10px;
}
</style>