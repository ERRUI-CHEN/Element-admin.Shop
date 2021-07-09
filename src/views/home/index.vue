<template>
  <div class="app-container">
    <div class="address-layout">
      <el-row :gutter="20">
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <div class="layout-title">后台项目</div>
            <div class="color-main address-content">
              <a href="#">mall</a>
            </div>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <div class="layout-title">前端项目</div>
            <div class="color-main address-content">
              <a href="#">mall-admin-web</a>
            </div>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <div class="layout-title">学习教程</div>
            <div class="color-main address-content">
              <a href="#">mall-learning</a>
            </div>
          </div>
        </el-col>
      </el-row>
      <div class="address-total">
        <el-row :gutter="20">
          <el-col :span="6">
            <div class="total-frame">
              <img src="@/assets/img/01.png" class="total-icon" />
              <div class="total-title">今日订单总数</div>
              <div class="total-value">200</div>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="total-frame">
              <img src="@/assets/img/02.png" class="total-icon" />
              <div class="total-title">今日销售总额</div>
              <div class="total-value">￥5000</div>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="total-frame">
              <img src="@/assets/img/03.png" class="total-icon" />
              <div class="total-title">昨日销售总额</div>
              <div class="total-value">￥5000</div>
            </div>
          </el-col>
        </el-row>
      </div>
      <div class="un-handle-layout">
        <div class="layout-title">待处理事务</div>
        <div class="un-handle-content">
          <el-row :gutter="20">
            <el-col :span="8">
              <div class="un-handle-item">
                <span class="font-medium">待付款订单</span>
                <span style="float: right" class="color-danger">(10)</span>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="un-handle-item">
                <span class="font-medium">已完成订单</span>
                <span style="float: right" class="color-danger">(10)</span>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="un-handle-item">
                <span class="font-medium">待确认收货订单</span>
                <span style="float: right" class="color-danger">(10)</span>
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="8">
              <div class="un-handle-item">
                <span class="font-medium">待发货订单</span>
                <span style="float: right" class="color-danger">(10)</span>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="un-handle-item">
                <span class="font-medium">新缺货登记</span>
                <span style="float: right" class="color-danger">(10)</span>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="un-handle-item">
                <span class="font-medium">待处理退款申请</span>
                <span style="float: right" class="color-danger">(10)</span>
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="8">
              <div class="un-handle-item">
                <span class="font-medium">已发货订单</span>
                <span style="float: right" class="color-danger">(10)</span>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="un-handle-item">
                <span class="font-medium">待处理退货订单</span>
                <span style="float: right" class="color-danger">(10)</span>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="un-handle-item">
                <span class="font-medium">广告位即将到期</span>
                <span style="float: right" class="color-danger">(10)</span>
              </div>
            </el-col>
          </el-row>
        </div>
      </div>
      <div class="overview-layout">
        <el-row :gutter="20">
          <el-col :span="12">
            <div class="out-border">
              <div class="layout-title">商品总览</div>
              <div style="padding: 40px">
                <el-row>
                  <el-col :span="6" class="color-danger overview-item-value"
                    >100</el-col
                  >
                  <el-col :span="6" class="color-danger overview-item-value"
                    >400</el-col
                  >
                  <el-col :span="6" class="color-danger overview-item-value"
                    >50</el-col
                  >
                  <el-col :span="6" class="color-danger overview-item-value"
                    >500</el-col
                  >
                </el-row>
                <el-row class="font-medium">
                  <el-col :span="6" class="overview-item-title">已下架</el-col>
                  <el-col :span="6" class="overview-item-title">已上架</el-col>
                  <el-col :span="6" class="overview-item-title"
                    >库存紧张</el-col
                  >
                  <el-col :span="6" class="overview-item-title"
                    >全部商品</el-col
                  >
                </el-row>
              </div>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="out-border">
              <div class="layout-title">用户总览</div>
              <div style="padding: 40px">
                <el-row>
                  <el-col :span="6" class="color-danger overview-item-value"
                    >100</el-col
                  >
                  <el-col :span="6" class="color-danger overview-item-value"
                    >200</el-col
                  >
                  <el-col :span="6" class="color-danger overview-item-value"
                    >1000</el-col
                  >
                  <el-col :span="6" class="color-danger overview-item-value"
                    >5000</el-col
                  >
                </el-row>
                <el-row class="font-medium">
                  <el-col :span="6" class="overview-item-title"
                    >今日新增</el-col
                  >
                  <el-col :span="6" class="overview-item-title"
                    >昨日新增</el-col
                  >
                  <el-col :span="6" class="overview-item-title"
                    >本月新增</el-col
                  >
                  <el-col :span="6" class="overview-item-title"
                    >会员总数</el-col
                  >
                </el-row>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
      <div class="statistics-layout">
        <div class="layout-title">订单统计</div>
        <el-row>
          <el-col :span="4">
            <div style="padding: 20px">
              <div>
                <div style="color: #909399; font-size: 14px">本月订单总数</div>
                <div style="color: #606266; font-size: 24px; padding: 10px 0">
                  10000
                </div>
                <div>
                  <span class="color-success" style="font-size: 14px"
                    >+10%</span
                  >
                  <span style="color: #c0c4cc; font-size: 14px">同比上月</span>
                </div>
              </div>
              <div style="margin-top: 20px">
                <div style="color: #909399; font-size: 14px">本周订单总数</div>
                <div style="color: #606266; font-size: 24px; padding: 10px 0">
                  1000
                </div>
                <div>
                  <span class="color-danger" style="font-size: 14px">-10%</span>
                  <span style="color: #c0c4cc; font-size: 14px">同比上周</span>
                </div>
              </div>
              <div style="margin-top: 20px">
                <div style="color: #909399; font-size: 14px">本月销售总额</div>
                <div style="color: #606266; font-size: 24px; padding: 10px 0">
                  100000
                </div>
                <div>
                  <span class="color-success" style="font-size: 14px"
                    >+10%</span
                  >
                  <span style="color: #c0c4cc; font-size: 14px">同比上月</span>
                </div>
              </div>
              <div style="margin-top: 20px">
                <div style="color: #909399; font-size: 14px">本周销售总额</div>
                <div style="color: #606266; font-size: 24px; padding: 10px 0">
                  50000
                </div>
                <div>
                  <span class="color-danger" style="font-size: 14px">-10%</span>
                  <span style="color: #c0c4cc; font-size: 14px">同比上周</span>
                </div>
              </div>
            </div>
          </el-col>
          <el-col :span="10">
            <div class="mychartss">
              <div
                id="mycharts"
                style="width: 500; height: 500px; background-color: yellow"
              >
                <!-- <div id="main" :style="{ width: '100%', height: '3.54rem' }"></div> -->
              </div>
            </div>
          </el-col>
          <!-- <el-date-picker
            v-model="selectDay"
            type="date"
            placeholder="选择日"
            @change="dataSearch"
            value-format="yyyy-MM-dd"
          >
          </el-date-picker> -->
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
var echarts = require("echarts");
//引入 ECharts 主模块
var echarts = require("echarts/lib/echarts");
// 引入柱状图
require("echarts/lib/chart/bar");
// 引入提示框和标题组件
require("echarts/lib/component/tooltip");
require("echarts/lib/component/title");
export default {
  name: "Bank",
  data() {
    return {};
  },
  components: {},
  computed: {},
  methods: {},
  mounted() {
    /*ECharts图表*/
    var myChart = echarts.init(document.getElementById("mycharts"));
    myChart.setOption({
      series: [
        {
          name: "访问来源",
          type: "pie",
          radius: "55%",
          itemStyle: {
            normal: {
              // 阴影的大小
              shadowBlur: 200,
              // 阴影水平方向上的偏移
              shadowOffsetX: 0,
              // 阴影垂直方向上的偏移
              shadowOffsetY: 0,
              // 阴影颜色
              shadowColor: "rgba(0, 0, 0, 0.5)"
            }
          },
          data: [
            { value: 400, name: "搜索引擎" },
            { value: 335, name: "直接访问" },
            { value: 310, name: "邮件营销" },
            { value: 274, name: "联盟广告" },
            { value: 235, name: "视频广告" }
          ]
        }
      ]
    });
  }
};
</script>
<style lang="less">
.app-container {
  margin-top: 40px;
  margin-left: 120px;
  margin-right: 120px;

  .address-layout {
    width: 1000px;
    height: 500px;

    .grid-content {
      width: 280px;
      height: 110px;

      background-color: whitesmoke;
      border: 0.8px solid #dcdfe6;

      line-height: 30px;

      .layout-title {
        color: black;
        padding-left: 20px;
        font-weight: bold;
      }
      .color-main {
        a {
          color: #409eff;
          padding-left: 2px;
          font-weight: bold;
        }
      }
    }
    .address-total {
      margin-top: 10px;

      .total-frame {
        width: 280px;
        height: 110px;
        padding: 20px;
        background-color: whitesmoke;
        border: 0.8px solid #dcdfe6;
      }

      .total-icon {
        width: 60px;
        height: 60px;
      }
      .total-title {
        position: relative;
        font-size: 16px;
        color: #909399;
        left: 70px;
        top: -50px;
      }
      .total-value {
        position: relative;
        font-size: 18px;
        color: #606266;
        left: 70px;
        top: -40px;
      }
    }
    .un-handle-layout {
      margin-top: 20px;
      border: 1px solid #dcdfe6;
      width: 800px;
    }
    .layout-title {
      color: #606266;
      padding: 15px 20px;
      background: #f2f6fc;
      font-weight: bold;
    }
    .un-handle-content {
      padding: 20px 40px;
    }

    .un-handle-item {
      border-bottom: 1px solid #ebeef5;
      padding: 10px;
    }
    .color-danger {
      color: red;
    }
    .overview-layout {
      margin-top: 20px;
      width: 800px;
    }
    .overview-item-value {
      font-size: 24px;
      text-align: center;
    }
    .overview-item-title {
      margin-top: 10px;
      text-align: center;
    }
    .out-border {
      border: 1px solid #dcdfe6;
    }

    .statistics-layout {
      margin-top: 20px;
      border: 1px solid #dcdfe6;
    }
    .mine-layout {
      position: absolute;
      right: 140px;
      top: 107px;
      width: 250px;
      height: 235px;
    }
    .address-content {
      padding: 20px;
      font-size: 18px;
    }
    .mychartss {
      width: 800px;
      height: 300px;
    }
  }
}
</style>
