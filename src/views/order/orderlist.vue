<template>
  <div class="app-container">
    <el-card class="filter-container" shadow="never">
      <div>
        <i class="el-icon-search"></i>
        <span>筛选搜索</span>
        <el-form :inline="true" :model="newlist" class="demo-form-inline">
          <el-form-item label="输入搜索">
            <el-input
              v-model="newlist.orderSn"
              placeholder="订单编号"
            ></el-input>
          </el-form-item>
          <el-form-item label="提交时间">
            <el-date-picker
              type="date"
              value-format="yyyy-MM-dd"
              placeholder="选择日期"
              v-model="newlist.createTime"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item label="订单状态：">
            <el-select
              v-model="newlist.status"
              class="input-width"
              placeholder="全部"
              clearable
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
          <el-form-item label="订单分类：">
            <el-select
              v-model="newlist.orderType"
              class="input-width"
              placeholder="全部"
              clearable
            >
              <el-option
                v-for="item in orderTypeOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              @click="onSubmit"
              style="margin-left: 40px"
              >查询</el-button
            >
          </el-form-item>
          <el-form-item label="订单来源：">
            <el-select
              v-model="newlist.sourceType"
              class="input-width"
              placeholder="全部"
              clearable
            >
              <el-option
                v-for="item in sourceTypeOptions"
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
    <el-card class="operate-container" shadow="never">
      <i class="el-icon-tickets"></i>
      <span>数据列表</span>
    </el-card>
    <div class="table-container">
      <el-table :data="list" border style="width: 100%" v-loading="listLoading">
        <el-table-column prop="id" label="编号" width="100" align="center">
        </el-table-column>
        <el-table-column
          prop="orderSn"
          label="订单编号"
          width="250"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="createTime"
          label="提交时间"
          width="280"
          align="center"
        >
          <template slot-scope="scope">{{
            scope.row.createTime | formatCreateTime
          }}</template>
        </el-table-column>
        <el-table-column
          prop="totalAmount"
          label="订单金额"
          width="180"
          align="center"
        >
          <template slot-scope="scope">￥{{ scope.row.totalAmount }}</template>
        </el-table-column>
        <el-table-column
          prop="payType"
          label="支付方式"
          width="150"
          align="center"
        >
          <template slot-scope="scope">{{
            scope.row.payType | formatPayType
          }}</template>
        </el-table-column>
        <el-table-column
          prop="sourceType"
          label="订单来源"
          width="150"
          align="center"
        >
          <template slot-scope="scope">{{
            scope.row.sourceType | formatSourceType
          }}</template>
        </el-table-column>
        <el-table-column
          prop="status"
          label="订单状态"
          width="120"
          align="center"
        >
          <template slot-scope="scope">{{
            scope.row.status | formatStatus
          }}</template>
        </el-table-column>
        <el-table-column label="操作" width="200" align="center">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="primary" size="small"
              >查看订单</el-button
            >
            <el-button type="danger" size="small" @click="handleClaer(scope.row)"
              >删除订单</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>

    <div class="pagination-container">
      <pagination
        v-show="total > 0"
        :total="total"
        :page.sync="listQuery.page"
        :limit.sync="listQuery.limit"
        @pagination="getOrderList"
      />
    </div>
  </div>
</template>
<script>
import { fetchList, fetchnewList,getDelete } from "@/api/order";
import { formatDate } from "@/utils/date";
import Pagination from "@/components/Pagination";
const defaultListQuery = {
  orderSn: null,
  // receiverKeyword: null,
  status: null,
  orderType: null,
  sourceType: null,
  createTime: null,
};
export default {
  name: "orderList",
  components: { Pagination },
  data() {
    return {
      list: [],
      // newlist: [],
      newlist: Object.assign({}, defaultListQuery),
      listLoading: false,
      listQuery: {
        page: 1,
        limit: 10,
      },
      total: 0,
      statusOptions: [
        {
          label: "待付款",
          value: 0,
        },
        {
          label: "待发货",
          value: 1,
        },
        {
          label: "已发货",
          value: 2,
        },
        {
          label: "已完成",
          value: 3,
        },
        {
          label: "已关闭",
          value: 4,
        },
      ],
      orderTypeOptions: [
        {
          label: "正常订单",
          value: 0,
        },
        {
          label: "秒杀订单",
          value: 1,
        },
      ],
      sourceTypeOptions: [
        {
          label: "PC订单",
          value: 0,
        },
        {
          label: "APP订单",
          value: 1,
        },
      ],
      operateOptions: [
        {
          label: "批量发货",
          value: 1,
        },
        {
          label: "关闭订单",
          value: 2,
        },
        {
          label: "删除订单",
          value: 3,
        },
      ],
      // logisticsDialogVisible: false,
    };
  },
  created() {
    this.getOrderList();
  },
  filters: {
    formatCreateTime(time) {
      let date = new Date(time);
      return formatDate(date, "yyyy-MM-dd hh:mm:ss");
    },
    formatPayType(value) {
      if (value === 1) {
        return "支付宝";
      } else if (value === 2) {
        return "微信";
      } else {
        return "未支付";
      }
    },
    formatSourceType(value) {
      if (value === 1) {
        return "APP订单";
      } else {
        return "PC订单";
      }
    },
    formatStatus(value) {
      if (value === 1) {
        return "待发货";
      } else if (value === 2) {
        return "已发货";
      } else if (value === 3) {
        return "已完成";
      } else if (value === 4) {
        return "已关闭";
      } else if (value === 5) {
        return "无效订单";
      } else {
        return "待付款";
      }
    },
  },
  methods: {
    async getOrderList() {
      this.listLoading = true;
      let { data, total } = await fetchList(this.listQuery);

      this.total = total;
      this.list = data;

      this.listLoading = false;
    },
    handleClick(row) {
      this.$router.push({ path: "orderdetail", query: { id: row.id } });
    },

    async onSubmit() {
      let { data } = await fetchnewList(this.newlist);
      this.list = data;
      // this.newlist.orderSn='';

    },
    async handleClaer(row) {
   let {code}= await getDelete({ id: row.id });
   if(code==20000){
       this.getOrderList();
   }
     
    },
  },
};
</script>
<style scoped>
</style>


