<template>
  <div>
    <el-card class="filter-container" shadow="never">
      <div>
        <i class="el-icon-search"></i>
        <span>筛选搜索</span>
        <el-button
          style="float: right"
          type="primary"
          @click="handleSearchList()"
          size="small"
        >
          查询搜索
        </el-button>
        <el-button
          style="float: right; margin-right: 15px"
          @click="handleResetSearch()"
          size="small"
        >
          重置
        </el-button>
      </div>
      <div style="margin-top: 15px">
        <el-form
          :inline="true"
          :model="listQuery"
          size="small"
          label-width="140px"
        >
          <el-form-item label="输入搜索：">
            <el-input
              v-model="listQuery.id"
              class="input-width"
              placeholder="服务单号"
            ></el-input>
          </el-form-item>
          <el-form-item label="处理状态：">
            <el-select
              v-model="listQuery.status"
              placeholder="全部"
              clearable
              class="input-width"
            >
              <el-option
                v-for="item in statusOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="申请时间：">
            <el-date-picker
              class="input-width"
              v-model="listQuery.createTime"
              value-format="yyyy-MM-dd"
              type="date"
              placeholder="请选择时间"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item label="操作人员：">
            <el-input
              v-model="listQuery.handleMan"
              class="input-width"
              placeholder="全部"
            ></el-input>
          </el-form-item>
          <el-form-item label="处理时间：">
            <el-date-picker
              class="input-width"
              v-model="listQuery.handleTime"
              value-format="yyyy-MM-dd"
              type="date"
              placeholder="请选择时间"
            >
            </el-date-picker>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
    <el-card class="operate-container" shadow="never">
      <i class="el-icon-tickets"></i>
      <span>数据列表</span>
    </el-card>
    <div class="filter-container">
      <el-button
        :loading="downloadLoading"
        type="success"
        plain
        icon="el-icon-download"
        @click="handleDownload"
        style="margin-left: 10px; margin-top: 10px"
        :inline="true"
      >
        导出成表格
      </el-button>
    </div>
    <div>
      <el-table
        ref="multipleTable"
        :data="list"
        tooltip-effect="dark"
        style="width: 100%; margin-top: 10px"
        @selection-change="handleSelectionChange"
        border
        v-loading="listLoading"
      >
        <el-table-column type="selection" width="55" align="center">
        </el-table-column>
        <el-table-column prop="id" label="服务单号" width="120" align="center">
        </el-table-column>
        <el-table-column
          prop="createTime"
          label="申请时间"
          width="200"
          align="center"
        >
          <template slot-scope="scope">{{
            scope.row.createTime | parseTime
          }}</template>
        </el-table-column>
        <el-table-column
          prop="memberUsername"
          label="用户账号"
          width="180"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="productRealPrice"
          label="退款金额"
          width="180"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="status"
          label="申请状态"
          width="180"
          align="center"
        >
          <template slot-scope="scope">{{
            scope.row.status | formatStatus
          }}</template>
        </el-table-column>
        <el-table-column
          prop="handleTime"
          label="处理时间"
          width="210"
          align="center"
        >
          <template slot-scope="scope">{{
            scope.row.handleTime | formatTime
          }}</template>
        </el-table-column>
        <el-table-column label="操作" width="180" align="center">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleViewDetail(scope.row)"
              >查看详情</el-button
            >
          </template>
        </el-table-column>
      </el-table>

      <pagination
        v-show="total > 0"
        :total="total"
        :page.sync="listQuery.page"
        :limit.sync="listQuery.limit"
        @pagination="getReturnList"
        align="right"
      />
    </div>
  </div>
</template>
<script>
import { parseTime } from "@/utils/index";
import { formatDate } from "@/utils/date";
import { getList, fetchList } from "@/api/returngoods";
import Pagination from "@/components/Pagination";
const defaultListQuery = {
  pageNum: 1,
  pageSize: 10,
  id: null,
  receiverKeyword: null,
  status: null,
  createTime: null,
  handleMan: null,
  handleTime: null
};
const defaultStatusOptions = [
  {
    label: "待处理",
    value: 0
  },
  {
    label: "退货中",
    value: 1
  },
  {
    label: "已完成",
    value: 2
  },
  {
    label: "已拒绝",
    value: 3
  }
];
export default {
  components: { Pagination },
  filters: {
    parseTime,
    formatTime(time) {
      if (time == null || time === "") {
        return "N/A";
      }
      let date = new Date(time);
      return formatDate(date, "yyyy-MM-dd hh:mm:ss");
    },
    formatStatus(status) {
      for (let i = 0; i < defaultStatusOptions.length; i++) {
        if (status === defaultStatusOptions[i].value) {
          return defaultStatusOptions[i].label;
        }
      }
    }
  },
  data() {
    return {
      listQuery: Object.assign({}, defaultListQuery),
      statusOptions: Object.assign({}, defaultStatusOptions),
      list: [
        {
          id: null,
          createTime: null,
          memberUsername: null,
          productRealPrice: null,
          status: null,
          handleTime: null
        }
      ],
      listLoading: false,
      multipleSelection: [],
      listQuery: {
        page: 1,
        limit: 10
      },
      total: 0
    };
  },
  created() {
    this.getReturnList();
  },
  methods: {
    handleResetSearch() {
      this.listQuery = Object.assign({}, defaultListQuery);
    },
    async handleSearchList() {
      let { data } = await fetchList(this.listQuery);
      this.list = data;
    },
    handleDownload() {
      this.downloadLoading = true;
      import("@/vendor/Export2Excel").then(excel => {
        //导出的表头
        const tHeader = [
          "服务单号",
          "申请时间",
          "用户账号",
          "退款金额",
          "申请状态",
          "处理时间"
        ];
        //导出的数据的属性
        const filterVal = [
          "id",
          "createTime",
          "memberUsername",
          "productRealPrice",
          "status",
          "handleTime"
        ];
        const data = this.formatJson(filterVal);
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: "ERRUI-list"
        });
        this.downloadLoading = false;
      });
    },
    formatJson(filterVal) {
      return this.list.map(v =>
        filterVal.map(j => {
          if (j === "timestamp") {
            return parseTime(v[j]);
          } else {
            return v[j];
          }
        })
      );
    },
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handleViewDetail(row) {
      this.$alert("服务器返回错误", "查看详情", {
        confirmButtonText: "确定",
        callback: action => {
          this.$message({
            type: "info",
            message: `action: ${action}`
          });
        }
      });
    },
    async getReturnList() {
      this.listLoading = true;
      let { data, total } = await getList(this.listQuery);
      console.log(data, "获取动态数据");
      this.total = total;
      this.list = data;
      this.listLoading = false;
    }
  }
};
</script>
