<template>
  <div>
    <div>
      <el-card class="box-card" style="width: 97%;margin: 20px;">
        <div slot="header" class="clearfix">
          <span>筛选搜索</span>
          <el-button style="float: right;" size="small">重置</el-button>
          <el-button
            style="float: right;  margin-right: 15px"
            type="primary"
            size="small"
            @click="handleSearchList()"
            >查询</el-button
          >
        </div>
        <div class="text item">
          <el-form :inline="true" :model="newserachList">
            <el-form-item label="输入搜索">
              <el-input
                placeholder="商品名称"
                v-model="newserachList.keywords"
                style="width:204px"
              ></el-input>
            </el-form-item>
            <el-form-item label="商品货号">
              <el-input
                placeholder="商品货号"
                v-model="newserachList.productSn"
                style="width:204px"
              ></el-input>
            </el-form-item>
            <el-form-item label="商品分类">
              <el-cascader
                clearable
                v-model="selectProductCateValue"
                :options="productCateOptions"
              >
              </el-cascader>
            </el-form-item>
            <el-form-item label="商品品牌">
              <el-select
                placeholder="请选择品牌"
                clearable
                v-model="newserachList.brandId"
              >
                <el-option
                  v-for="item in brandOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="上架状态">
              <el-select
                placeholder="全部"
                clearable
                v-model="newserachList.publishStatus"
              >
                <el-option
                  v-for="item in publishStatusOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-form>
        </div>
      </el-card>
    </div>
    <el-card shadow="never" style="width: 97%;margin: 20px;">
      <i class="el-icon-tickets"></i>
      <span>数据列表</span>
      <el-button style="float: right;" size="mini" @click="handleadd">
        添加
      </el-button>
    </el-card>
    <div class="table_div">
      <el-table
        ref="productTable"
        :data="list"
        v-loading="listLoading"
        style="width: 97%;margin: 20px;"
        height="500"
        border
      >
        <el-table-column
          align="center"
          fixed
          prop="id"
          label="编号"
          width="100"
        >
        </el-table-column>
        <el-table-column align="center" label="商品图片" width="120">
          <template slot-scope="scope"
            ><img style="height: 80px" :src="scope.row.pic"
          /></template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="brandName"
          label="商品品牌"
          width="100"
        >
        </el-table-column>
        <el-table-column
          align="center"
          prop="name"
          label="商品详情"
          width="180"
        >
        </el-table-column>
        <el-table-column align="center" prop="price" label="价格" width="100">
        </el-table-column>
        <el-table-column
          align="center"
          prop="productSn"
          label="货号"
          width="100"
        >
        </el-table-column>
        <el-table-column align="center" prop="stock" label="库存" width="100">
        </el-table-column>
        <el-table-column align="center" prop="sale" label="销量" width="100">
        </el-table-column>
        <el-table-column align="center" prop="tag" label="标签" width="150">
          <template slot-scope="scope">
            <p>
              上架：
              <el-switch
                :active-value="1"
                :inactive-value="0"
                v-model="scope.row.publishStatus"
              >
              </el-switch>
              <!-- {{ scope.row.publishStatus }} -->
            </p>
            <p>
              新品：
              <el-switch
                :active-value="1"
                :inactive-value="0"
                v-model="scope.row.newStatus"
              >
              </el-switch>
            </p>
            <p>
              推荐：
              <el-switch
                :active-value="1"
                :inactive-value="0"
                v-model="scope.row.recommandStatus"
              >
              </el-switch>
            </p>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="edit" label="操作">
          <template slot-scope="scope">
            <el-button
              type="primary"
              size="small"
              @click="handleedit(scope.row)"
              >编辑</el-button
            >
            <el-button
              type="danger"
              size="small"
              @click="handleClaer(scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <pagination
        v-show="total > 0"
        :total="total"
        :page.sync="listQuery.page"
        :limit.sync="listQuery.limit"
        @pagination="getGoodsList"
      />
    </div>
  </div>
</template>
<script>
import { getList, fetchList, Deletegoods } from "@/api/goodslist";
import Pagination from "@/components/Pagination";
const defaultlistQuery = {
  keyword: null,
  page: 1,
  limit: 5,
  publishStatus: null,
  verifyStatus: null,
  productSn: null,
  productCategoryId: null,
  brandId: null
};
export default {
  components: { Pagination },
  data() {
    return {
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
      serachList: [],
      selectProductCateValue: null,
      productCateOptions: [],
      //价格下限
      // p_low: "",
      //价格上限
      // p_high: "",
      publishStatusOptions: [
        {
          value: 1,
          label: "上架"
        },
        {
          value: 0,
          label: "下架"
        }
      ],
      verifyStatusOptions: [
        {
          value: 1,
          label: "审核通过"
        },
        {
          value: 0,
          label: "未审核"
        }
      ],
      list: [],
      listLoading: false,
      listQuery: {
        page: 1,
        limit: 5
      },
      newserachList: Object.assign({}, defaultlistQuery),
      total: 0
    };
  },
  beforeCreate() {
    this.editForm = {};
  },
  created() {
    this.getGoodsList();
    // this.getProductCateList();
  },
  watch: {
    // selectProductCateValue: function(newValue) {
    //   if (newValue != null && newValue.length == 2) {
    //     this.newserachList.productCategoryId = newValue[1];
    //   } else {
    //     this.newserachList.productCategoryId = null;
    //   }
    // }
  },
  methods: {
    //获取商品列表
    async getGoodsList() {
      this.listLoading = true;
      let { data, total } = await getList(this.listQuery);

      this.total = total;
      this.list = data;
      // console.log(this.list, "1111111111");
      this.listLoading = false;
      // console.log(data);
      // console.log(this.newserachList, "1111111111");
      // console.log(total, "00000");
    },
    //点击按钮，处理查询结果
    async handleSearchList() {
      let { data } = await fetchList(this.newserachList);
      // console.log(this.newserachList, "122222211121211");
      this.list = data;
    },
    async handleClaer(row) {
      let { code } = await Deletegoods({ id: row.id });
      if (code == 20000) {
        this.getGoodsList();
      }
    },
    handleadd() {
      this.$router.push({ path: "addgoods" });
    },
    handleedit(row) {
      this.editForm = row;
      console.log("编辑", row);
      this.$router.push({ path: "editgoods", query: { editList: row } });
    },
    receiveFromChild(obj) {
      console.log("接收到孩子数据", obj);
    }
    // getProductCateList() {
    //   fetchListWithChildren().then(response => {
    //     let list = response.data;
    //     this.productCateOptions = [];
    //     for (let i = 0; i < list.length; i++) {
    //       let children = [];
    //       if (list[i].children != null && list[i].children.length > 0) {
    //         for (let j = 0; j < list[i].children.length; j++) {
    //           children.push({
    //             label: list[i].children[j].name,
    //             value: list[i].children[j].id
    //           });
    //         }
    //       }
    //       this.productCateOptions.push({
    //         label: list[i].name,
    //         value: list[i].id,
    //         children: children
    //       });
    //     }
    //   });
    // }
    //价格区间表单
    // <el-form-item label="价格区间">
    //           <el-col :span="11">
    //             <el-form-item>
    //               <el-input
    //                 placeholder="价格下限"
    //                 v-model="p_low"
    //                 style="width:204px"
    //               ></el-input>
    //             </el-form-item>
    //           </el-col>
    //           <el-col :span="1" style="margin-left:10px"> -</el-col>
    //           <el-col :span="11">
    //             <el-form-item>
    //               <el-input
    //                 placeholder="价格上限"
    //                 v-model="p_high"
    //                 style="width:204px"
    //               ></el-input>
    //             </el-form-item>
    //           </el-col>
    //         </el-form-item>
  }
};
</script>
<style>
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}
</style>
