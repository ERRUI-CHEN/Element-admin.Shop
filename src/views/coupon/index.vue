<template>
  <div class="container">
    <div class="container1">
      <el-card class="filter-container" shadow="never">
        <div>
          <i class="el-icon-search"></i>
          <span>筛选搜索</span>
          <el-button style="float:right" type="primary" size="small">查询搜索</el-button>
          <el-button style="float:right;margin-right:40px" size="small">重置</el-button>
        </div>
      </el-card>
      <el-form :inline="true" size="small" label-width="140px">
        <el-form-item label="优惠券名称：">
          <el-input class="input-width" placeholder="优惠券名称"></el-input>
        </el-form-item>
        <el-form-item label="优惠券类型：">
          <el-select placeholder="全部" clearable class="input-width"></el-select>
        </el-form-item>
      </el-form>
    </div>
    <div class="container2" style="margin-top:25px">
      <el-card class="operate-container" shadow="never">
        <i class="el-icon-tickets"></i>
        <span>数据列表</span>
        <el-button size="mini" class="btn-add btn1">添加</el-button>
      </el-card>
    </div>
    <div class="container3">
      <el-table
        ref="multipleTable"
        :data="list"
        tooltip-effect="dark"
        style="width: 100% ;margin-top:10px;"
        @selection-change="handleSelectionChange"
        border
      >
        <el-table-column type="selection" width="55" align="center"></el-table-column>
        <el-table-column prop="id" label="编号" width="90" align="center"></el-table-column>
        <el-table-column prop="name" label="优惠券名称" width="120" align="center"></el-table-column>
        <el-table-column label="优惠券类型" width="120" align="center">
          <template slot-scope="scope">{{scope.row.type | formatType}}</template>
        </el-table-column>
        <el-table-column label="可使用商品" width="120" align="center">
          <template slot-scope="scope">{{scope.row.useType | formatUseType}}</template>
        </el-table-column>
        <el-table-column label="使用门槛" width="110" align="center">
          <template slot-scope="scope">满{{scope.row.minPoint}}元可用</template>
        </el-table-column>
        <el-table-column label="面值" width="110" align="center">
          <template slot-scope="scope">{{scope.row.amount}}元</template>
        </el-table-column>
        <el-table-column label="适用平台" width="110" align="center">
          <template slot-scope="scope">{{scope.row.platform|formatPlatform}}</template>
        </el-table-column>
        <el-table-column label="有效期" width="200" align="center">
          <template
            slot-scope="scope"
          >{{scope.row.startTime|formatDate}}至{{scope.row.endTime|formatDate}}</template>
        </el-table-column>
        <el-table-column label="状态" width="110" align="center">已过期</el-table-column>
        <el-table-column label="操作" width="130" align="center">
          <template slot-scope="scope">
            <el-botton size="small" type="text" @click="handleAdd(scope.$index,scope.row)">添加</el-botton>
            <el-botton size="small" type="text" @click="handleDelete(scope.row.id)">删除</el-botton>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { formatDate } from "@/utils/date.js";
import { getList, getDelete } from "@/api/coupon.js";
const defaultTypeOptions = [
  {
    label: "全场赠券",
    value: 0,
  },
  {
    label: "会员赠券",
    value: 1,
  },
  {
    label: "购物赠券",
    value: 2,
  },
  {
    label: "注册赠券",
    value: 3,
  },
];
export default {
  data() {
    return {
      downloadLoading: false,
      typeOptions: Object.assign({}, defaultTypeOptions),
      list: [],
    };
  },
  filters: {
    formatType(type) {
      for (let i = 0; i < defaultTypeOptions.length; i++) {
        if (type === defaultTypeOptions[i].value) {
          return defaultTypeOptions[i].label;
        }
      }
      return "";
    },
    formatUseType(useType) {
      if (useType === 0) {
        return "全场通用";
      } else if (useType === 1) {
        return "指定分类";
      } else {
        return "指定商品";
      }
    },
    formatPlatform(platform) {
      if (platform === 1) {
        return "移动平台";
      } else if (platform === 2) {
        return "PC平台";
      } else {
        return "全平台";
      }
    },
    formatDate(time) {
      if (time == null || time == "") {
        return "N/A";
      }
      let date = new Date(time);
      return formatDate(date, "yyyy-MM-dd");
    },
  },
  created() {
    this.getQuan();
  },
  methods: {
    async getQuan() {
      let { data } = await getList();
      this.list = data;
    },
    handleAdd(row) {
      this.$router.push(`/coupon/add?id=${row.id}`);
    },
    async handleDelete(id) {
      let { code, message } = await getDelete({ id: id });
      if (code == 20000) {
        this.$message({
          message: message,
          type: "success",
        });
      }
    },
  },
};
</script>


<style lang="scss" scoped>
     .container2{
         position:relative;
        .btn1{
            position:absolute;
            right:20px;
        }
   }
</style>
