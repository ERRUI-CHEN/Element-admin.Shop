<template>
  <div class="com">
    <el-card class="form-container" shadow="never">
      <el-form
        :model="postForm"
        :rules="rules"
        ref="postForm"
        label-width="150px"
      >
        <el-form-item label="分类名称：" prop="name">
          <el-input v-model="postForm.name"></el-input>
        </el-form-item>

        <el-form-item label="上级分类：">
          <el-select v-model="postForm.parentId" placeholder="请选择分类">
            <el-option
              v-for="item in selectGoodClassList"
              :key="item.id"
              :label="item.label"
              :value="item.id"
            ></el-option>
            <!-- <el-option label="无上级分类" value="0"></el-option>
          <el-option label="服装" value="1"></el-option>
          <el-option label="手机数码" value="2"></el-option>
          <el-option label="家用电器" value="3"></el-option>
          <el-option label="家具家装" value="4"></el-option>
          <el-option label="汽车用品" value="5"></el-option>-->
          </el-select>
        </el-form-item>

        <el-form-item label="数量单位：">
          <el-input v-model="postForm.productUnit"></el-input>
        </el-form-item>
        <el-form-item label="排序：">
          <el-input v-model="postForm.sort"></el-input>
        </el-form-item>
        <el-form-item label="商品数量：">
          <el-input v-model="postForm.productCount"></el-input>
        </el-form-item>
        <el-form-item label="级别：">
          <el-radio-group v-model="postForm.level">
            <el-radio :label="0">一级分类</el-radio>
            <el-radio :label="1">二级分类</el-radio>
          </el-radio-group>
          <!-- <el-select v-model="postForm.level" placeholder="请选择">
          <el-option label="一级分类" value="0"></el-option>
          <el-option label="二级分类" value="1"></el-option>
        </el-select>-->
        </el-form-item>
        <!-- <el-form-item label="分类图标：">
        <single-upload v-model="postForm.icon"></single-upload>
      </el-form-item>-->
        <!-- 上传图片 -->
        <el-form-item label="分类图标：">
          <el-upload
            class="upload-demo"
            action="https://jsonplaceholder.typicode.com/posts/"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :before-remove="beforeRemove"
            multiple
            :limit="3"
            :on-exceed="handleExceed"
            :file-list="fileList"
          >
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">
              只能上传jpg/png文件，且不超过10MB
            </div>
          </el-upload>
        </el-form-item>
        <el-form-item label="筛选属性：">
          <!-- <span class="demonstration">默认 click 触发子菜单</span> -->
          <el-cascader
            clearable
            v-model="value"
            :options="options"
          ></el-cascader>
        </el-form-item>

        <el-form-item label="关键词：">
          <el-input v-model="postForm.keywords"></el-input>
        </el-form-item>
        <el-form-item label="分类描述：">
          <el-input
            type="textarea"
            :autosize="true"
            v-model="postForm.description"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm">提交</el-button>
          <el-button v-if="!isEdit" @click="resetForm">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { getList, newOrUpdateGoodClass, findGoodClass } from "@/api/goodclass";

const defaultpostForm = {
  description: "", //分类描述
  icon: "",
  keywords: "", //关键词
  name: "", //分类名称
  productCount: "",
  level: "",
  parentId: 0, //上级分类
  productUnit: "", //数量单位

  sort: 0 //排序
};
export default {
  name: "ClassDetail",
  props: {
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  data() {
    const validateRequire = (rule, value, callback) => {
      if (value === "") {
        callback(new Error(rule.field + "为必传项"));
      } else {
        callback();
      }
    };

    return {
      fileList: [], //上传图片列表
      loading: false,
      //表单
      postForm: Object.assign({}, defaultpostForm),
      // selectpostFormList: [],
      //规则
      rules: {
        name: [
          { required: true, message: "请输入品牌名称", trigger: "blur" },
          {
            min: 2,
            max: 140,
            message: "长度在 2 到 140 个字符",
            trigger: "blur"
          }
        ],
        keywords: [{ validator: validateRequire }]
      },
      //筛选属性的值
      value: [],
      options: [
        {
          value: "1",
          label: "服装-T恤",
          children: [
            {
              value: "24",
              label: "商品编号"
            },
            {
              value: "25",
              label: "适用季节"
            },
            {
              value: "37",
              label: "适用人群"
            },
            {
              value: "38",
              label: "上市时间"
            },
            {
              value: "39",
              label: "袖长"
            }
          ]
        },
        {
          value: "2",
          label: "服装-裤装",
          children: [
            {
              value: "32",
              label: "适用人群"
            },
            {
              value: "33",
              label: "风格"
            },
            {
              value: "41",
              label: "适用场景"
            },
            {
              value: "42",
              label: "上市时间"
            }
          ]
        },
        {
          value: "3",
          label: "手机数码-手机通讯",
          children: [
            {
              value: "45",
              label: "屏幕尺寸"
            },
            {
              value: "erwu",
              label: "适用季节"
            },
            {
              value: "46",
              label: "网络"
            },
            {
              value: "47",
              label: "系统"
            },
            {
              value: "48",
              label: "电池容量"
            }
          ]
        },
        {
          value: "4",
          label: "配件"
        },
        {
          value: "5",
          label: "居家"
        },
        {
          value: "6",
          label: "洗护"
        },
        {
          value: "10",
          label: "测试分类"
        }
      ],
      selectGoodClassList: [
        {
          id: 0,
          label: "无上级分类"
        },
        {
          id: 1,
          label: "服装"
        },
        {
          id: 2,
          label: "手机数码"
        },
        {
          id: 3,
          label: "家用电器"
        },
        {
          id: 4,
          label: "家具家装"
        },
        {
          id: 5,
          label: "汽车用品"
        }
      ]
    };
  },

  async created() {
    if (this.isEdit) {
      const id = this.$route.query && this.$route.query.id;
      let { data } = await findGoodClass({ id: id });
      this.postForm = data;
    }
  },

  methods: {
    //上传图片
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 3 个文件，本次选择了 ${
          files.length
        } 个文件，共选择了 ${files.length + fileList.length} 个文件`
      );
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },

    //发布
    submitForm() {
      this.$refs.postForm.validate(async valid => {
        if (valid) {
          console.log(this.postForm, "11111111");
          this.loading = true;

          this.$confirm("是否提交数据", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          }).then(() => {
            this.$router.back();
            this.$notify({
              title: "成功",
              message: data.message,
              type: "success",
              duration: 2000
            });
          });
          if (!this.postForm.id) {
            this.postForm.id = parseInt(Math.random() * 100) + 100;
          }
          //发送请求
          let data = await newOrUpdateGoodClass(this.postForm);
          //  this.getGoodClassList();
          // if (data.code === 20000) {

          // }
          this.loading = false;

          // this.$router.push("goodclass");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm() {
      this.$refs.postForm.resetFields();
      this.postForm = Object.assign({}, defaultpostForm);
    }
  }
};
</script>

<style scoped>
.com {
  padding: 20px 260px;
}
</style>
