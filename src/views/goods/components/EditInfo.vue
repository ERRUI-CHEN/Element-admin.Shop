<template>
  <div class="form_center">
    <el-form
      ref="editForm"
      :model="editForm"
      :rules="rules"
      label-width="100px"
    >
      <el-form-item label="商品分类" prop="productCategoryId">
        <el-select
          v-model="editForm.productCategoryId"
          placeholder="请选择分类"
        >
          <el-option
            v-for="item in cateOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="商品名称：" prop="name">
        <el-input v-model="editForm.name"></el-input>
      </el-form-item>
      <el-form-item label="副标题：" prop="subTitle">
        <el-input v-model="editForm.subTitle"></el-input>
      </el-form-item>
      <el-form-item label="商品品牌：" prop="brandName">
        <el-select v-model="editForm.brandName" placeholder="请选择品牌">
          <el-option
            v-for="item in brandOptions"
            :key="item.label"
            :label="item.label"
            :value="item.label"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="商品详情：" prop="description">
        <el-input
          :autoSize="true"
          type="textarea"
          v-model="editForm.description"
          placeholder="请输入内容"
        ></el-input>
      </el-form-item>
      <el-form-item label="商品货号：" prop="productSn">
        <el-input v-model="editForm.productSn"></el-input>
      </el-form-item>
      <el-form-item label="商品售价：" prop="price">
        <el-input v-model="editForm.price"></el-input>
      </el-form-item>
      <el-form-item label="市场价：" prop="originalPrice">
        <el-input v-model="editForm.originalPrice"></el-input>
      </el-form-item>
      <el-form-item label="商品库存：" prop="stock">
        <el-input v-model="editForm.stock"></el-input>
      </el-form-item>
      <el-form-item label="计量单位：" prop="unit">
        <el-input v-model="editForm.unit"></el-input>
      </el-form-item>
      <el-form-item label="商品重量：" prop="weight">
        <el-input v-model="editForm.weight"></el-input>
      </el-form-item>
    </el-form>
    <div class="btn_center">
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
      brandOptions: [
        {
          label: "华为",
          value: 0
        },
        {
          label: "小米",
          value: 1
        },
        {
          label: "海澜之家",
          value: 2
        },
        {
          label: "耐克",
          value: 3
        },
        {
          label: "苹果",
          value: 4
        }
      ],
      cateOptions: [
        {
          label: "手机通讯",
          value: 19
        },
        {
          label: "手机数码",
          value: 20
        },
        {
          label: "T恤",
          value: 8
        },
        {
          label: "男鞋",
          value: 21
        }
      ],
      flag1: "",
      hasEditCreated: false,
      productCateOptions: [],
      rules: {
        name: [
          { required: true, message: "请输入商品名称", trigger: "blur" },
          {
            min: 2,
            max: 140,
            message: "长度在 2 到 140 个字符",
            trigger: "blur"
          }
        ],
        subTitle: [
          { required: true, message: "请输入商品副标题", trigger: "blur" }
        ],
        productCategoryId: [
          { required: true, message: "请选择商品分类", trigger: "blur" }
        ],
        productSn: [
          { required: true, message: "请输入商品货号", trigger: "blur" }
        ],
        price: [{ required: true, message: "请输入商品售价", trigger: "blur" }],
        originalPrice: [
          { required: true, message: "请输入商品市场价", trigger: "blur" }
        ],
        stock: [{ required: true, message: "请输入商品库存", trigger: "blur" }],
        brandName: [
          { required: true, message: "请选择商品品牌", trigger: "blur" }
        ],
        requiredProp: [
          { required: true, message: "该项为必填项", trigger: "blur" }
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
          console.log(this.updatelist1, "this.updatelist1");
          Bus.$emit("eventTypeupdate1", this.updatelist1);
          this.$emit("nextStep");
          // console.log(this.message, "message");

          // console.log(this.editForm, "editForm");
        }
      });
    }

    // handleCateChange(val) {
    //   let productCategoryName = "";
    //   for (let i = 0; i < this.cateOptions.length; i++) {
    //     if (this.cateOptions[i].value === val) {
    //       productCategoryName = this.cateOptions[i].label;
    //       break;
    //     }
    //   }
    //   this.value.productCategoryName = productCategoryName;
    // }
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
