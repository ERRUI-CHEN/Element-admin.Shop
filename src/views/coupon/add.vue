<template>
  <div>
    <div style="margin: 20px;"></div>
    <el-form :label-position="labelPosition" label-width="120px" :model="formLabelAlign">
      <el-form-item label="编号">
        <el-input v-model="formLabelAlign.id"></el-input>
      </el-form-item>
      <el-form-item label="优惠券名称">
        <el-input v-model="formLabelAlign.name"></el-input>
      </el-form-item>
      <el-form-item label="优惠券类型">
        <el-input v-model="formLabelAlign.type"></el-input>
      </el-form-item>
      <el-form-item label="可使用商品">
        <el-input v-model="formLabelAlign.use"></el-input>
      </el-form-item>
      <el-form-item label="使用门槛">
        <el-input v-model="formLabelAlign.door"></el-input>
      </el-form-item>
      <el-form-item label="面值">
        <el-input v-model="formLabelAlign.money"></el-input>
      </el-form-item>
      <el-form-item label="适用平台">
        <el-input v-model="formLabelAlign.table"></el-input>
      </el-form-item>
      <el-form-item label="有效期">
        <el-input v-model="formLabelAlign.time"></el-input>
      </el-form-item>
      <el-form-item label="状态">
        <el-input v-model="formLabelAlign.state"></el-input>
      </el-form-item>
      <el-form-item>
    <el-button type="primary" @click="submitForm">提交</el-button>
    <el-button @click="resetForm()">重置</el-button>
  </el-form-item>
    </el-form>
  </div>
</template>


<script>
import {getAdd} from '../../api/coupon'
const li={
     id: '',
          name: '',
          type: '',
          use:'',
          door:'',
          money:'',
          table:'',
          time:'',
          state:'',
}
  export default {
    data() {
      return {
        labelPosition: 'right',
        formLabelAlign: Object.assign({},li),
        }
      
    },
  
    
    methods: {
     async submitForm() {
          let {code,message} = await getAdd(this.formLabelAlign)
           if (code === 20000){
               this.$message({
                   message:message,
                   type:"success"
               })
              //this.$router.push("/coupon/index")
           }
      },
      resetForm() {
        //  console.log("XXXXXXXXXXXXXX")
        // this.$refs[formLabelAlign].resetFields();
        this.formLabelAlign.id='';
        this.formLabelAlign.type= '',
        this.formLabelAlign.use='',
        this.formLabelAlign.door='',
        this.formLabelAlign.money='',
        this.formLabelAlign.table='',
        this.formLabelAlign.time='',
        this.formLabelAlign.state='',
         this.formLabelAlign.name=''

      }
    }
  }
</script>
