<template>
  <div class="form_center">
    <el-form ref="editForm" :model="editForm" label-width="100px">
      <el-form-item label="属性类型：">
        <el-select
          v-model="editForm.productAttributeCategoryId"
          placeholder="请选择属性类型"
        >
          <el-option
            v-for="item in productAttributeCategoryOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="商品相册：">
        <el-card shadow="never" class="cardBg">
          <div>
            <div>
              <div v-for="(value, key) in imgs" :key="'uploadBox' + key">
                <div class="uploadImg">
                  <img :src="getObjectURL(value)" />
                  <img
                    class="closeImg"
                    src="../../../assets/img/goodprop/delete.png"
                    alt=""
                    @click="delImg(key)"
                  />
                </div>
              </div>
              <div>
                <input
                  type="file"
                  @change="addImg"
                  ref="inputer"
                  multiple
                  accept="image/*"
                />
              </div>
            </div>
          </div>
        </el-card>
      </el-form-item>
    </el-form>
    <div class="btn_center">
      <el-button @click="handlePrev">上一步</el-button>
      <el-button type="primary" @click="handleNext">提交</el-button>
    </div>
    <!--确定是否新增-->
    <el-dialog
      title="提示"
      :visible.sync="addlistdialogVisible"
      width="30%"
      :before-close="beforeClose"
    >
      <span>是否确认提交?</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="beforeClose">取 消</el-button>
        <el-button type="primary" @click="onSubmitList">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { updateGoodList, updateGoodListpush } from "@/api/goodslist";
import Bus from "../Bus";
export default {
  props: ["message"],
  data() {
    return {
      //控制dialog是否显示
      list4: {},
      list5: {},
      addlistdialogVisible: false,
      list3: {},
      list6: {},
      editForm: this.message,
      imgurl: "",
      formData: new FormData(),
      imgs: {},
      imgLen: 0,
      txtVal: 0,
      desc: "",
      productAttributeCategoryOptions: [
        {
          label: "服装",
          value: 1
        },
        {
          label: "家居",
          value: 2
        },
        {
          label: "电子设备",
          value: 3
        },
        {
          label: "鞋子",
          value: 4
        }
      ],
      selectProductParam: [],
      selectProductParam: [],
      form: {
        productAttributeCategoryId: "",
        selectProductPics: ""
      }
    };
  },
  created() {
    var _this = this;
    Bus.$on("eventTypeupdate1", function(msg) {
      _this.list4 = msg;
      // this.list4 = JSON.stringify(msg);
      // var end = this.list4.length - 1;
      // _this.list4 = this.list4.substring(1, end);
      // console.log(_this.list4, "this.list4");
    });
    Bus.$on("eventTypeupdate2", function(msg) {
      _this.list5 = msg;
      // this.list5 = JSON.stringify(msg);
      // var end = this.list5.length - 1;
      // _this.list5 = this.list5.substring(1, end);
      // console.log(this.list5, "this.list5");
    });
  },
  methods: {
    addImg(event) {
      let inputDOM = this.$refs.inputer;
      // 通过DOM取文件数据
      this.fil = inputDOM.files;
      // console.log(inputDOM.files)
      let oldLen = this.imgLen;
      for (let i = 0; i < this.fil.length; i++) {
        let size = Math.floor(this.fil[i].size / 1024);
        if (size > 5 * 1024 * 1024) {
          alert("请选择5M以内的图片！");
          return false;
        }
        this.imgLen++;
        this.$set(
          this.imgs,
          this.fil[i].name + "?" + new Date().getTime() + i,
          this.fil[i]
        );
        // console.log(this.imgs)
      }
      // console.log("this.fil", this.fil);
      // this.imgs = this.fil
    },
    getObjectURL(file) {
      var url = null;
      if (window.createObjectURL !== undefined) {
        // basic
        url = window.createObjectURL(file);
      } else if (window.URL !== undefined) {
        // mozilla(firefox)
        url = window.URL.createObjectURL(file);
      } else if (window.webkitURL !== undefined) {
        // webkit or chrome
        url = window.webkitURL.createObjectURL(file);
      }
      this.imgurl = url;
      return url;
    },
    delImg(key) {
      this.$delete(this.imgs, key);
      this.imgLen--;
    },
    handleNext() {
      this.addlistdialogVisible = true;
      this.$refs.editForm.validate(async valid => {
        if (valid) {
          console.log(this.editForm, "122222222");

          //发送请求 把数据保存到服务器
          let { data } = await updateGoodList(this.editForm);
          this.list3 = data;
          // this.list3 = JSON.stringify(data);
          // var end = this.list3.length - 1;
          // this.list3 = this.list3.substring(1, end);
          // console.log(this.list3, "this.list3");
          // console.log(this.list4, "this.list4");
          // this.list6 = this.list3 + this.list4 + this.list5;
          // JSON.parse(this.list6);
          console.log(this.list6, "this.list6");
          // addpush();
          this.list6 = Object.assign(this.list3, this.list4, this.list5);
          console.log(this.list6, "xxxxxxxxxxxthis.list6");
        }
      });
    },
    handlePrev() {
      this.$emit("prevStep");
    },
    // 点击按钮，处理查询结果
    async onSubmitList() {
      await updateGoodListpush(this.list6);
      console.log(this.list6, "??????????");
      this.addlistdialogVisible = false;
    },
    beforeClose() {
      this.addlistdialogVisible = false;
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
.cardBg {
  background: #f8f9fc;
}
.uploadImg {
  position: relative;
  width: 150px;
  height: 150px;
  display: block;
  overflow: hidden;
  background-color: brown;
}
.closeImg {
  width: 25px;
  height: 25px;
  position: absolute;
  top: 2%;
  right: 1%;
}
</style>
