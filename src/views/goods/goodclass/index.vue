<template>
  <div class="app-container">
    <el-card class="operate-container" shadow="never">
      <i class="el-icon-tickets" style="margin-top: 5px"></i>
      <span style="margin-top: 5px">数据列表</span>
      <el-button class="btn-add" size="mini" @click="handleAdd()" style="float:right">添加</el-button>
    </el-card>

    <div class="table-container">
      <el-table
        fit
        highlight-current-row
        style="width: 100%"
        :data="list"
        v-loading="listLoading"
        border
      >
        <el-table-column label="编号" width="100" prop="id" align="center" sortable>
          <template slot-scope="scope">{{scope.row.id}}</template>
        </el-table-column>
        <el-table-column label="分类名称" align="center">
          <template slot-scope="scope">{{scope.row.name}}</template>
        </el-table-column>
        <el-table-column label="级别" width="100" align="center">
          <template slot-scope="scope">{{scope.row.level | levelFilter}}</template>
        </el-table-column>
        <el-table-column label="商品数量" width="180" align="center" sortable>
          <template slot-scope="scope">{{scope.row.productCount }}</template>
        </el-table-column>
        <el-table-column label="数量单位" width="180" align="center">
          <template slot-scope="scope">{{scope.row.productUnit }}</template>
        </el-table-column>

        <el-table-column label="排序" width="100" align="center" sortable>
          <template slot-scope="scope">{{scope.row.sort }}</template>
        </el-table-column>
        <el-table-column label="设置" width="200" align="center">
          <template slot-scope="scope">
            <el-button
              size="mini"
              :disabled="scope.row.level | disableNextLevel"
              @click="handleShowNextLevel(scope.$index, scope.row)"
            >查看下级</el-button>
          </template>
        </el-table-column>

        <el-table-column label="操作" width="240" align="center">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="handleUpdate(scope.$index, scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <div class="pagination-container" style="float:right">
      <pagination
        v-show="total>0"
        :total="total"
        :page.sync="listQuery.page"
        :limit.sync="listQuery.limit"
        @pagination="getGoodClassList"
      />
    </div>
  </div>
</template>

<script>
import { getList, deleteGoodClass } from "@/api/goodclass";
import Pagination from "@/components/Pagination";

export default {
  components: { Pagination },
  data() {
    return {
      list: [],
      total: 0,

      listLoading: false,
      listQuery: {
        page: 1,
        limit: 5,
        currentParentId: this.$route.query.parentId,
      },
      parentId: null,
    };
  },
  created() {
    this.getGoodClassList();
    this.resetParentId();
    
  },

  watch: {
    $route(route) {
      this.resetParentId();
      this.listQuery.currentParentId = this.$route.query.parentId;
      this.getGoodClassList();
      // console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx")
    },
  },
  methods: {
    resetParentId() {
      this.listQuery.page = 1;
      if (this.$route.query.parentId != null) {
        this.parentId = this.$route.query.parentId;
      } else {
        this.parentId = 0;
      }
    },
    handleAdd() {
      console.log(this.$router);
      this.$router.push("addGoodClass");
    },
    handleShowNextLevel(index, row) {
      this.$router.push({
        path: "/goods/goodclass",
        query: { parentId: row.id },
      });
      //  this.getGoodClassList()
      // this.listQuery.currentParentId = row.id
      this.getGoodClassList()
    },
    handleUpdate(index, row) {
      this.$router.push({
        path: "/goods/updateGoodClass",
        query: { id: row.id },
      });
    },

    async handleDelete(index, row) {
      let data = await deleteGoodClass({ id: row.id });
      this.$notify({
        title: "成功",
        message: data.message,
        type: "success",
        duration: 2000,
      });
      this.getGoodClassList();
    },
    //发送请求获取数据
    async getGoodClassList() {

      this.listLoading = true;
      let { data, total, slist } = await getList(this.listQuery);
      console.log(slist);
      // this.parentId=parentId;
      //  let selectlist=data.filter(item=>item.parentId===this.parentId);
      this.list = data;
      //  console.log(selectlist.length);
      //     total=selectlist.length;
      this.total = total;
      //  this.total =selectlist.length;
      this.listLoading = false;
    },
  },
  filters: {
    levelFilter(value) {
      if (value === 0) {
        return "一级";
      } else if (value === 1) {
        return "二级";
      }
    },
    disableNextLevel(value) {
      if (value === 0) {
        return false;
      } else {
        return true;
      }
    },
  },
};
</script>

