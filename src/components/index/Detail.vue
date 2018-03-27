<template>
    <div id="detail">
        <mt-header :title="biaot" :fixed='true'>
            <router-link to="/index/Hall" slot="left">
                <mt-button icon="back">返回</mt-button>
            </router-link>
        </mt-header>
        <div class="transactionData">
            <p class="show"><strong>{{$store.state.stroe_data.nowPrice}}</strong></p>
            <div class="dataTitle">
                <small>今开</small>
                <small>最低</small>
                <small>最高</small>
                <small>今关</small>
            </div>
            <div class="dataContent">
                <small class="red" id="open"></small>
                <small class="green" id="low"></small>
                <small class="red" id="high"></small>
                <small class="red" id="close"></small>
            </div>
            <div class="dataTitle">
                <small>涨幅</small>
                <small>成交额</small>
                <small>总股本</small>
                <small>流通股本</small>
            </div>
            <div class="dataContent pdBottom0">
                <small class="red" id="zhangfu"></small>
                <small class="red">{{$store.state.stroe_data.turnover}}亿</small>
                <small class="red">{{$store.state.stroe_data.generalCapital}}亿</small>
                <small class="red">{{$store.state.stroe_data.circulationCapital}}亿</small>
            </div>
        </div>
        <div class="box">
            <div id="container" class="container"></div>
        </div>
        <div><message></message></div>
        <div class="buy">
          <mt-button type="primary" @click="buyBTC">购买</mt-button>
          <mt-button type="danger"  @click="sellBTC">出售</mt-button>
        </div>
    </div>
</template>
<script>
// import ChartData from "../../assets/js/chartData";

import Highcharts from "highcharts/highstock";
import HighchartsMore from "highcharts/highcharts-more";
import HighchartsDrilldown from "highcharts/modules/drilldown";
import Highcharts3D from "highcharts/highcharts-3d";
import Highmaps from "highcharts/modules/map";
import jquery from "jquery";
HighchartsMore(Highcharts);
HighchartsDrilldown(Highcharts);
Highcharts3D(Highcharts);
Highmaps(Highcharts);
import HighchartsComponent from "@/components/index/HighchartsComponent";
import Message from "@/components/index/Message";

import { mapState } from 'vuex'



export default {
  // biaot: this.$route.params.flowers.CnName
  name: "detail",
  data() {
    computed:{
       return {
        biaot: this.$store.state.stroe_data.CnName,
        stockChart: null,
        messages: "",
      };
    }
  },
  components: {
    HighchartsComponent,
    Message
  },
  mounted() {
    this.createChart();
  },
  methods: {
    buyBTC(){
      var params = this.$route.params.flowers;
      this.$router.push({ name: 'Buy',params:{flowers:params} });
    },
    sellBTC(){
      var params = this.$route.params.flowers;
      this.$router.push({ name: 'Sell',params:{flowers:params} });
    },
    createChart() {
      Highcharts.setOptions({
        lang: {
          rangeSelectorZoom: ""
        }
      });
      jquery.getJSON(
        "https://data.jianshukeji.com/jsonp?filename=json/aapl-ohlcv.json&callback=?",
        data => {
          var ohlc = [],
            volume = [],
            dataLength = data.length,
            // set the allowed units for data grouping
            groupingUnits = [
              [
                "week", // unit name
                [1] // allowed multiples
              ],
              ["month", [1, 2, 3, 4, 6]]
            ],
            i = 0;
          for (i; i < dataLength; i += 1) {
            ohlc.push([
              data[i][0], // the date
              data[i][1], // open
              data[i][2], // high
              data[i][3], // low
              data[i][4] // close
            ]);
            volume.push([
              data[i][0], // the date
              data[i][5] // the volume
            ]);
          document.getElementById('open').innerHTML = data[i][1];
          document.getElementById('high').innerHTML = data[i][2];
          document.getElementById('low').innerHTML = data[i][3];
          document.getElementById('close').innerHTML = data[i][4];
          document.getElementById('zhangfu').innerHTML = (data[i][2]/data[i][3]).toFixed(2);
          }
          // console.log( volume );
          this.stockChart = new Highcharts.stockChart("container", {
            plotOptions:{
              candlestick:{
                allowPointSelect:true,
                point:{
                  events:{
                    mouseOver:function(){
                      // console.log(this);
                     document.getElementById('open').innerHTML = this.open;
                     document.getElementById('high').innerHTML = this.high;
                     document.getElementById('low').innerHTML = this.low;
                     document.getElementById('close').innerHTML = this.close;
                     document.getElementById('zhangfu').innerHTML = (this.high/this.low).toFixed(2);
                    }
                  }
                }
              },
              // column:{
              //   allowPointSelect:true,
              //   point:{
              //     events:{
              //       mouseOver:function(){
              //         console.log(this);
              //         document.getElementById('jiaoyiliang').innerHTML = this.y;
              //       }
              //     }
              //   }
              // }
            },
            // 增加代码
            tooltip: {
                  crosshairs: true,
                  enabled:false,
                },
            scrollbar: {
              enabled: false,
              height: 0,
              minWidth: 0
            },
            navigator: {
              enabled: false
            },
            credits: {
              enabled: false
            },
            rangeSelector: {
              buttonTheme: {
                style: {
                  fontWeight: "bold",
                  background: "red",
                  height: "30px"
                }
              },
              buttons: [
                {
                  type: "month",
                  count: 5,
                  text: "5分"
                },
                {
                  type: "month",
                  count: 10,
                  text: "15分"
                },
                {
                  type: "month",
                  count: 15,
                  text: "1小时"
                },
                {
                  type: "ytd",
                  count: 20,
                  text: "1天"
                },
                {
                  type: "week",
                  count: 25,
                  text: "周"
                },
                {
                  type: "year",
                  text: "1年"
                }
              ],
              inputEnabled: false,
              selected: 0,
              inputDateFormat: "%Y-%m-%d"
            },
            xAxis: {
              crosshair: true,
              dateTimeLabelFormats: {
                millisecond: "%H:%M:%S.%L",
                second: "%H:%M:%S",
                minute: "%H:%M",
                hour: "%H:%M",
                day: "%m-%d",
                week: "%m-%d",
                month: "%y-%m",
                year: "%Y"
              }
            },
            yAxis: [
              {
                labels: {
                  align: "right",
                  x: -3
                },
                title: {
                  text: ""
                },
                height: "60%",
                lineWidth: 2,
                crosshair: true
              },
              {
                labels: {
                  align: "right",
                  x: -3
                },
                title: {
                  text: ""
                },
                top: "65%",
                height: "35%",
                offset: 0,
                lineWidth: 2
              }
            ],
            series: [
              {
                type: "candlestick",
                name: "数据",
                color: "green",
                lineColor: "green",
                upColor: "red",
                upLineColor: "red",
                data: ohlc,
                dataGrouping: {
                  units: groupingUnits
                }
              },
              {
                type: "column",
                name: "",
                data: volume,
                yAxis: 1,
                dataGrouping: {
                  units: groupingUnits
                }
              }
            ]
          });
        }
      );
    }
  }
};

</script>
<style scoped>
.transactionData {
  background: #ffffff;
  padding: 30px 10px 10px;
}
.dataTitle,
.dataContent {
  display: flex;
  color: #8a8484;
}
.dataContent {
  padding: 6px 0;
  padding-top: 3px;
}
.dataContent small,
.dataTitle small {
  flex: 1;
  display: block;
  text-align: center;
  height: 20px;
  line-height: 20px;
}
.red {
  color: red;
  font-size: 12px;
  font-weight: 600;
}
.green {
  color: #00ff16;
  font-weight: 600;
  font-size: 12px;
}
.pdBottom0 {
  padding-bottom: 0 !important;
}
.box {
  width: 100%;
  height: 400px;
  display: inline-block;
  overflow: hidden;
  position: relative;
  margin-top: 10px;
}

.box h3 {
  position: absolute;
  top: -10px;
  left: 10px;
  z-index: 1000;
}
.buy{
  width: 100%;
  margin: 10px 0;
  text-align: center;
}
.buy button{
  width: 45%;
}
</style>

