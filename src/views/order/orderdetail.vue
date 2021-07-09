<template>
   
  <div class="detail-container">
    <div>
      <el-steps
        :active="formatStepStatus(list.status)"
        finish-status="success"
        align-center
      >
        <el-step
          title="提交订单"
          :description="formatTime(list.createTime)"
        ></el-step>
        <el-step
          title="支付订单"
          :description="formatTime(list.paymentTime)"
        ></el-step>
        <el-step
          title="平台发货"
          :description="formatTime(list.deliveryTime)"
        ></el-step>
        <el-step
          title="确认收货"
          :description="formatTime(list.receiveTime)"
        ></el-step>
        <el-step
          title="完成评价"
          :description="formatTime(list.commentTime)"
        ></el-step>
      </el-steps>
    </div>

    <div class="operate-container">
      <i class="el-icon-warning color-danger" style="margin-left: 20px"></i>
      <span class="color-danger dingdan"
        >当前订单状态：{{ list.status | formatStatus }}</span
      >

      <div class="operate-button-container" v-show="list.status === 0">
        <el-button size="mini" @click="showMarkOrderDialog">备注订单</el-button>
      </div>
      <div class="operate-button-container" v-show="list.status === 1">
        <el-button size="mini" @click="showUpdateReceiverDialog"
          >修改收货人信息</el-button
        >
        <el-button size="mini" @click="showMarkOrderDialog">备注订单</el-button>
      </div>
      <div
        class="operate-button-container"
        v-show="list.status === 2 || list.status === 3"
      >
          <el-button size="mini" @click="showLogisticsDialog">订单跟踪</el-button>
        <el-button size="mini" @click="showMarkOrderDialog">备注订单</el-button>
      </div>
      <div class="operate-button-container" v-show="list.status === 4">
        <el-button size="mini" @click="showMarkOrderDialog">备注订单</el-button>
        <el-button size="mini" @click="handleDeleteOrder">删除订单</el-button>
      </div>
    </div>
    <div style="margin-top: 20px">
      <svg-icon icon-class="marker" style="color: #606266"></svg-icon>
      <span class="font-small">基本信息</span>
    </div>
    <div class="table-layout">
      <el-row>
        <el-col :span="4" class="table-cell-title">订单编号</el-col>
        <el-col :span="4" class="table-cell-title">发货单流水号</el-col>
        <el-col :span="4" class="table-cell-title">用户账号</el-col>
        <el-col :span="4" class="table-cell-title">支付方式</el-col>
        <el-col :span="4" class="table-cell-title">订单来源</el-col>
        <el-col :span="4" class="table-cell-title">订单类型</el-col>
      </el-row>
      <el-row>
        <el-col :span="4" class="table-cell">{{ list.orderSn }}</el-col>
        <el-col :span="4" class="table-cell">暂无</el-col>
        <el-col :span="4" class="table-cell">{{ list.memberUsername }}</el-col>
        <el-col :span="4" class="table-cell">{{
          list.payType | formatPayType
        }}</el-col>
        <el-col :span="4" class="table-cell">{{
          list.sourceType | formatSourceType
        }}</el-col>
        <el-col :span="4" class="table-cell">{{
          list.orderType | formatOrderType
        }}</el-col>
      </el-row>
      <el-row>
        <el-col :span="4" class="table-cell-title">配送方式</el-col>
        <el-col :span="4" class="table-cell-title">物流单号</el-col>
        <el-col :span="4" class="table-cell-title">自动确认收货时间</el-col>
        <el-col :span="4" class="table-cell-title">订单可得优币</el-col>
        <el-col :span="4" class="table-cell-title">订单可得成长值</el-col>
        <el-col :span="4" class="table-cell-title">活动信息</el-col>
      </el-row>
      <el-row>
        <el-col :span="4" class="table-cell">{{
          list.deliveryCompany | formatNull
        }}</el-col>
        <el-col :span="4" class="table-cell">{{
          list.deliverySn | formatNull
        }}</el-col>
        <el-col :span="4" class="table-cell"
          >{{ list.autoConfirmDay }}天</el-col
        >
        <el-col :span="4" class="table-cell">{{
          list.integration | formatNull
        }}</el-col>
        <el-col :span="4" class="table-cell">{{
          list.growth | formatNull
        }}</el-col>
        <el-col :span="4" class="table-cell">
          <el-popover
            placement="top-start"
            title="活动信息"
            width="200"
            trigger="hover"
            :content="list.promotionInfo"
          >
            <span slot="reference">{{
              list.promotionInfo | formatLongText
            }}</span>
          </el-popover>
        </el-col>
      </el-row>
      <div style="margin-top: 20px">
        <svg-icon icon-class="marker" style="color: #606266"></svg-icon>
        <span class="font-small">收货人信息</span>
      </div>
      <div class="table-layout">
        <el-row>
          <el-col :span="6" class="table-cell-title">收货人</el-col>
          <el-col :span="6" class="table-cell-title">手机号码</el-col>
          <el-col :span="6" class="table-cell-title">邮政编码</el-col>
          <el-col :span="6" class="table-cell-title">收货地址</el-col>
        </el-row>
        <el-row>
          <el-col :span="6" class="table-cell">{{ list.receiverName }}</el-col>
          <el-col :span="6" class="table-cell">{{ list.receiverPhone }}</el-col>
          <el-col :span="6" class="table-cell">{{
            list.receiverPostCode
          }}</el-col>
          <el-col :span="6" class="table-cell">{{
            list | formatAddress
          }}</el-col>
        </el-row>
      </div>
      <div style="margin-top: 20px">
        <svg-icon icon-class="marker" style="color: #606266"></svg-icon>
        <span class="font-small">商品信息</span>
      </div>
      <el-table
        ref="orderItemTable"
        :data="list.orderItemList"
        style="width: 100%; margin-top: 20px"
        border
      >
        <el-table-column label="商品图片" width="120" align="center">
          <template slot-scope="scope">
            <img :src="scope.row.productPic" style="height: 80px" />
          </template>
        </el-table-column>
        <el-table-column label="商品名称" align="center">
          <template slot-scope="scope">
            <p>{{ scope.row.productName }}</p>
            <p>品牌：{{ scope.row.productBrand }}</p>
          </template>
        </el-table-column>
        <el-table-column label="价格/货号" width="120" align="center">
          <template slot-scope="scope">
            <p>价格：￥{{ scope.row.productPrice }}</p>
            <p>货号：{{ scope.row.productSn }}</p>
          </template>
        </el-table-column>
        <el-table-column label="属性" width="120" align="center">
          <template slot-scope="scope">
            {{ scope.row.productAttr | formatProductAttr }}
          </template>
        </el-table-column>
        <el-table-column label="数量" width="120" align="center">
          <template slot-scope="scope">
            {{ scope.row.productQuantity }}
          </template>
        </el-table-column>
        <el-table-column label="小计" width="120" align="center">
          <template slot-scope="scope">
            ￥{{ scope.row.productPrice * scope.row.productQuantity }}
          </template>
        </el-table-column>
      </el-table>
      <div style="float: right; margin: 20px">
        合计：<span class="color-danger">￥{{ list.totalAmount }}</span>
      </div>
      <div style="margin-top: 60px">
        <svg-icon icon-class="marker" style="color: #606266"></svg-icon>
        <span class="font-small">费用信息</span>
      </div>
      <div class="table-layout">
        <el-row>
          <el-col :span="6" class="table-cell-title">商品合计</el-col>
          <el-col :span="6" class="table-cell-title">运费</el-col>
          <el-col :span="6" class="table-cell-title">优惠券</el-col>
          <el-col :span="6" class="table-cell-title">积分抵扣</el-col>
        </el-row>
        <el-row>
          <el-col :span="6" class="table-cell">￥{{ list.totalAmount }}</el-col>
          <el-col :span="6" class="table-cell"
            >￥{{ list.freightAmount }}</el-col
          >
          <el-col :span="6" class="table-cell"
            >-￥{{ list.couponAmount }}</el-col
          >
          <el-col :span="6" class="table-cell"
            >-￥{{ list.integrationAmount }}</el-col
          >
        </el-row>
        <el-row>
          <el-col :span="6" class="table-cell-title">活动优惠</el-col>
          <el-col :span="6" class="table-cell-title">折扣金额</el-col>
          <el-col :span="6" class="table-cell-title">订单总金额</el-col>
          <el-col :span="6" class="table-cell-title">应付款金额</el-col>
        </el-row>
        <el-row>
          <el-col :span="6" class="table-cell"
            >-￥{{ list.promotionAmount }}</el-col
          >
          <el-col :span="6" class="table-cell"
            >-￥{{ list.discountAmount }}</el-col
          >
          <el-col :span="6" class="table-cell">
            <span class="color-danger"
              >￥{{ list.totalAmount + list.freightAmount }}</span
            >
          </el-col>
          <el-col :span="6" class="table-cell">
            <span class="color-danger"
              >￥{{
                list.payAmount + list.freightAmount - list.discountAmount
              }}</span
            >
          </el-col>
        </el-row>
      </div>
      <div style="margin-top: 20px">
        <svg-icon icon-class="marker" style="color: #606266"></svg-icon>
        <span class="font-small">操作信息</span>
      </div>
      <el-table
        style="margin-top: 20px; width: 100%"
        ref="orderHistoryTable"
        :data="list.historyList"
        border
      >
        <el-table-column label="操作者" width="120" align="center">
          <template slot-scope="scope">
            {{ scope.row.operateMan }}
          </template>
        </el-table-column>
        <el-table-column label="操作时间" width="160" align="center">
          <template slot-scope="scope">
            {{ formatTime(scope.row.createTime) }}
          </template>
        </el-table-column>
        <el-table-column label="订单状态" width="120" align="center">
          <template slot-scope="scope">
            {{ scope.row.orderStatus | formatStatus }}
          </template>
        </el-table-column>
        <el-table-column label="付款状态" width="120" align="center">
          <template slot-scope="scope">
            {{ scope.row.orderStatus | formatPayStatus }}
          </template>
        </el-table-column>
        <el-table-column label="发货状态" width="120" align="center">
          <template slot-scope="scope">
            {{ scope.row.orderStatus | formatDeliverStatus }}
          </template>
        </el-table-column>
        <el-table-column label="备注" align="center">
          <template slot-scope="scope">
            {{ scope.row.note }}
          </template>
        </el-table-column>
      </el-table>
    </div>

    <el-dialog
      title="修改收货人信息"
      :visible.sync="receiverDialogVisible"
      width="40%"
    >
      <el-form :model="receiverInfo" ref="receiverInfoForm" label-width="150px">
        <el-form-item label="收货人姓名：">
          <el-input
            v-model="receiverInfo.receiverName"
            style="width: 200px"
          ></el-input>
        </el-form-item>
        <el-form-item label="手机号码：">
          <el-input v-model="receiverInfo.receiverPhone" style="width: 200px">
          </el-input>
        </el-form-item>
        <el-form-item label="邮政编码：">
          <el-input
            v-model="receiverInfo.receiverPostCode"
            style="width: 200px"
          >
          </el-input>
        </el-form-item>
        <el-form-item label="所在区域：">
          <v-distpicker
            :province="receiverInfo.receiverProvince"
            :city="receiverInfo.receiverCity"
            :area="receiverInfo.receiverRegion"
            @selected="onSelectRegion"
          >
          </v-distpicker>
        </el-form-item>
        <el-form-item label="详细地址：">
          <el-input
            v-model="receiverInfo.receiverDetailAddress"
            type="textarea"
            rows="3"
          >
          </el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="receiverDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleUpdateReceiverInfo"
          >确 定</el-button
        >
      </span>
    </el-dialog>

    <el-dialog
      title="备注订单"
      :visible.sync="markOrderDialogVisible"
      width="40%"
    >
      <el-form :model="markInfo" label-width="150px">
        <el-form-item label="操作备注：">
          <el-input v-model="markInfo.note" type="textarea" rows="3">
          </el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="markOrderDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleMarkOrder">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog
      title="删除提醒"
      :visible.sync="markOrderDeleteVisible"
      width="40%"
    >
      <span style="font-size: 15px; font-weight: 700">您确定要删除吗</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="markOrderDeleteVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleDeleteOrderli">确 定</el-button>
      </span>
    </el-dialog>
    <logistics-dialog v-model="logisticsDialogVisible"></logistics-dialog>

  </div>
</template>
<script>
import LogisticsDialog from './components/logisticsDialog.vue';

import {
  getOrderDetail,
  getOrderDetailmark,
  getDelete,
  getOrderDetailaddress,
} from "@/api/order";
import { formatDate } from "@/utils/date";
import VDistpicker from "v-distpicker";
const defaultReceiverInfo = {
  orderId: null,
  receiverName: null,
  receiverPhone: null,
  receiverPostCode: null,
  receiverDetailAddress: null,
  receiverProvince: null,
  receiverCity: null,
  receiverRegion: null,
  status: null,
};

export default {
  components: { VDistpicker,LogisticsDialog },
  data() {
    return {
      list: {},
      // id: "",
      receiverInfo: Object.assign({}, defaultReceiverInfo),
      id: this.$route.query.id,
      listLoading: false,
      receiverDialogVisible: false,
      markOrderDialogVisible: false,
      markInfo: { note: null, id: null },
      markOrderDeleteVisible: false,
      logisticsDialogVisible:false
    };
  },
  async created() {
    // let id = this.$route.query && this.$route.query.id;
    let { data } = await getOrderDetail({ id: this.id });
    this.list = data;
    // console.log(this.list);
  },
  filters: {
    formatNull(value) {
      if (value === undefined || value === null || value === "") {
        return "暂无";
      } else {
        return value;
      }
    },
    formatLongText(value) {
      if (value === undefined || value === null || value === "") {
        return "暂无";
      } else if (value.length > 8) {
        return value.substr(0, 8) + "...";
      } else {
        return value;
      }
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
    formatOrderType(value) {
      if (value === 1) {
        return "秒杀订单";
      } else {
        return "正常订单";
      }
    },
    formatAddress(order) {
      let str = order.receiverProvince;
      if (order.receiverCity != null) {
        str += "  " + order.receiverCity;
      }
      str += "  " + order.receiverRegion;
      str += "  " + order.receiverDetailAddress;
      return str;
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
    formatPayStatus(value) {
      if (value === 0) {
        return "未支付";
      } else if (value === 4) {
        return "已退款";
      } else {
        return "已支付";
      }
    },
    formatDeliverStatus(value) {
      if (value === 0 || value === 1) {
        return "未发货";
      } else {
        return "已发货";
      }
    },
    formatProductAttr(value) {
      if (value == null) {
        return "";
      } else {
        let attr = JSON.parse(value);
        let result = "";
        for (let i = 0; i < attr.length; i++) {
          result += attr[i].key;
          result += ":";
          result += attr[i].value;
          result += ";";
        }
        return result;
      }
    },
  },
  methods: {
    showLogisticsDialog(){
       this.logisticsDialogVisible=true
    },
    onSelectRegion(data) {
      this.receiverInfo.receiverProvince = data.province.value;
      this.receiverInfo.receiverCity = data.city.value;
      this.receiverInfo.receiverRegion = data.area.value;
    },
    showUpdateReceiverDialog() {
      this.receiverDialogVisible = true;
      this.receiverInfo = {
        orderId: this.list.id,
        receiverName: this.list.receiverName,
        receiverPhone: this.list.receiverPhone,
        receiverPostCode: this.list.receiverPostCode,
        receiverDetailAddress: this.list.receiverDetailAddress,
        receiverProvince: this.list.receiverProvince,
        receiverCity: this.list.receiverCity,
        receiverRegion: this.list.receiverRegion,
        status: this.list.status,
      };
    },
    async handleUpdateReceiverInfo() {
      let { code, message } = await getOrderDetailaddress(this.receiverInfo);
      //  console.log(this.receiverInfo);
      if (code == 20000) {
        this.$message({
          message: message,
          type: "success",
        });
      }
      this.receiverDialogVisible = false;
    this.$router.go(0)
    },

    showMarkOrderDialog() {
      this.markOrderDialogVisible = true;
    },
    async handleMarkOrder() {
      this.markInfo.id = this.id;
      let { code, message } = await getOrderDetailmark(this.markInfo);
      if (code == 20000) {
        this.$message({
          message: message,
          type: "success",
        });
      }
      this.markInfo.note = null;
      this.markOrderDialogVisible = false;
    },
    handleDeleteOrder() {
      this.markOrderDeleteVisible = true;
    },
    async handleDeleteOrderli() {
      let { code, message } = await getDelete({ id: this.id });
      if (code == 20000) {
        this.$message({
          message: message,
          type: "success",
        });
      }
      this.markOrderDeleteVisible = false;
    },

    formatTime(time) {
      if (time == null || time === "") {
        return "";
      }
      let date = new Date(time);
      return formatDate(date, "yyyy-MM-dd hh:mm:ss");
    },
    formatStepStatus(value) {
      if (value === 1) {
        //待发货
        return 2;
      } else if (value === 2) {
        //已发货
        return 3;
      } else if (value === 3) {
        //已完成
        return 4;
      } else {
        //待付款、已关闭、无限订单
        return 1;
      }
    },
  },
};
</script>
<style lang='scss' scoped>
.detail-container {
  padding: 20px 150px;
  .operate-container {
    width: 100%;
    height: 50px;
    line-height: 50px;
    background-color: #f2f6fc;
    .operate-button-container {
      float: right;
      margin-right: 20px;
    }

    .dingdan {
      color: red;
    }
  }
  .table-layout {
    margin-top: 20px;
    border-left: 1px solid #dcdfe6;
    border-top: 1px solid #dcdfe6;
  }
  .table-cell {
    height: 60px;
    line-height: 40px;
    border-right: 1px solid #dcdfe6;
    border-bottom: 1px solid #dcdfe6;
    padding: 10px;
    font-size: 14px;
    color: #606266;
    text-align: center;
    overflow: hidden;
  }

  .table-cell-title {
    border-right: 1px solid #dcdfe6;
    border-bottom: 1px solid #dcdfe6;
    padding: 10px;
    background: #f2f6fc;
    text-align: center;
    font-size: 14px;
    color: #303133;
  }
}
</style>

