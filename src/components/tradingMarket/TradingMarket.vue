<template>
<div>
   <mt-header :title="biaot" :fixed='true'>
            <router-link to="/index/Hall" slot="left">
                <!-- <mt-button icon="back">返回</mt-button> -->
            </router-link>
        </mt-header>
        <div class="hot paddingBottom40">
          <ul>
            <li>名称</li>
            <li>当前价格</li>
            <li>最高</li>
            <li>最低</li>
          </ul>
        </div>
        <div class="page-loadmore">
    <div class="page-loadmore-wrapper" ref="wrapper" :style="{ height: wrapperHeight + 'px' }">
      <mt-loadmore :top-method="loadTop" @translate-change="translateChange" @top-status-change="handleTopChange"       :bottom-method="loadBottom" @bottom-status-change="handleBottomChange" :bottom-all-loaded="allLoaded" ref="loadmore">
        <ul class="hotQueryList">
            <li v-for ="(item,index) in list" class="page-loadmore-listitem" :key="item.CnName" @click="toDetail(index)">
                <div><img :src="item.EnName" alt="list"></div>
                <div>{{item.nowPrice}}</div>
                <div>{{item.HightestPrice}}</div>
                <div>{{item.LowPrice}}</div>
            </li>
        </ul>
       <div slot="top" class="mint-loadmore-top">
          <span v-show="topStatus !== 'loading'" :class="{ 'is-rotate': topStatus === 'drop' }">↓</span>
          <span v-show="topStatus === 'loading'">
            <mt-spinner type="snake"></mt-spinner>
          </span>
        </div>    


        <div slot="bottom" class="mint-loadmore-bottom">
          <span v-show="bottomStatus !== 'loading'" :class="{ 'is-rotate': bottomStatus === 'drop' }">↑</span>
          <span v-show="bottomStatus === 'loading'">
            <mt-spinner type="snake"></mt-spinner>
          </span>
        </div>
      </mt-loadmore>
    </div>
  </div>
  <footers></footers>
</div>
  
</template>

<style>
.hot{
  width: 100%;
}
.hot ul{
  display: flex;
  background: #ffffff;
  padding: 5px 0px;
  list-style: none;
  margin: 0px 0;
}
.hot ul li{
  -webkit-box-flex: 1;
    -ms-flex: 1;
    flex: 1;
    text-align: center;
    font-size: 12px;
    color: #776f6f;
    font-weight: bold;
}
.loading-background,
.mint-loadmore-top span {
  -webkit-transition: 0.2s linear;
  transition: 0.2s linear;
}
.mint-loadmore-top span {
  display: inline-block;
  vertical-align: middle;
}

.mint-loadmore-top span.is-rotate {
  -webkit-transform: rotate(180deg);
  transform: rotate(180deg);
}

.page-loadmore .mint-spinner {
  display: inline-block;
  vertical-align: middle;
}

.page-loadmore-desc {
  text-align: center;
  color: #666;
  padding-bottom: 5px;
}

.page-loadmore-desc:last-of-type,
.page-loadmore-listitem {
  border-bottom: 1px solid #eee;
}

.page-loadmore-listitem {
  height: 50px;
  line-height: 50px;
  text-align: center;
}

.page-loadmore-listitem:first-child {
  border-top: 1px solid #eee;
}

.page-loadmore-wrapper {
  overflow: scroll;
}

.mint-loadmore-bottom span {
  display: inline-block;
  -webkit-transition: 0.2s linear;
  transition: 0.2s linear;
  vertical-align: middle;
}

.mint-loadmore-bottom span.is-rotate {
  -webkit-transform: rotate(180deg);
  transform: rotate(180deg);
}
.hotQueryList {
  padding-left: 0;
  /* display: flex; */
  margin: 0;
}
.hotQueryList li {
  width: 100%;
  display: flex;
  background: #ffffff;
  border-bottom: 1px solid #f5f5f5;
}
.hotQueryList li div {
  /* display:inline-block; */
  /* width: 25%; */
  text-align: center;
  flex: 1;
  font-size: 14px;
  height: 35px;
  line-height: 35px;
}
.hotQueryList li div:nth-last-of-type(2),
.hotQueryList li div:nth-last-of-type(3) {
  color: red;
  font-size: 12px;
}
.hotQueryList li div:nth-of-type(4) {
  color: #00ff16;
  font-size: 12px;
}
.hotQueryList li div img {
  width: 30px;
  transform: scale(0.9);
  vertical-align: bottom;
}
.paddingBottom40 {
  margin-top: 40px;
}
</style>

<script type="text/babel">
import Footers from "@/components/public/Footers";
export default {
  data() {
    return {
      list: [],
      allLoaded: false,
      bottomStatus: "",
      wrapperHeight: 0,
      topStatus: "",
      //wrapperHeight: 0,
      translate: 0,
      moveTranslate: 0,
      biaot: "交易市场",
    };
  },
  components: {
    Footers
  },
  methods: {

toDetail:function(index){
	 this.$store.commit('CnName',this.list[index].CnName);
      this.$store.commit('nowPrice',this.list[index].nowPrice);
      this.$store.commit('turnover',this.list[index].turnover);
      this.$store.commit('generalCapital',this.list[index].generalCapital);
      this.$store.commit('circulationCapital',this.list[index].circulationCapital);
      this.$store.state.stroe_data.CnName = this.list[index].CnName;
      this.$store.state.stroe_data.nowPrice = this.list[index].nowPrice;
      this.$store.state.stroe_data.turnover = this.list[index].turnover;
      this.$store.state.stroe_data.generalCapital = this.list[index].generalCapital;
      this.$store.state.stroe_data.circulationCapital = this.list[index].circulationCapital;
      this.$router.push({ name: 'Detail'});
},

    handleBottomChange(status) {
      this.bottomStatus = status;
    },

    loadBottom() {
      setTimeout(() => {
        let lastValue = this.list[this.list.length - 1];
        if (lastValue < 40) {
          for (let i = 1; i <= 10; i++) {
            this.list.push(lastValue + i);
          }
        } else {
          this.allLoaded = true;
        }
        this.$refs.loadmore.onBottomLoaded();
      }, 1500);
    },
    handleTopChange(status) {
      this.moveTranslate = 1;
      this.topStatus = status;
    },
    translateChange(translate) {
      const translateNum = +translate;
      this.translate = translateNum.toFixed(2);
      this.moveTranslate = (1 + translateNum / 70).toFixed(2);
    },
    loadTop() {
      setTimeout(() => {
        let firstValue = this.list[0];
        for (let i = 1; i <= 10; i++) {
          this.list.unshift(firstValue - i);
        }
        this.$refs.loadmore.onTopLoaded();
      }, 1500);
    }
  },
  created() {
    // for (let i = 1; i <= 10; i++) {
    //   this.list.push(i+"s");
    // }
    this.$fetch("/hotQueryList").then(response => {
      if (response.success == true) {
        this.list = response.data.projects.map(item => {
          var img = null;
          var HightestPrice = null;
          try {
            img = require(`../../assets/imgs/${item.EnName}.png`);
          } catch (err) {
            img = require("../../assets/imgs/btc.png");
          }
          return {
            CnName: item.CnName,
            HightestPrice: item.HightestPrice,
            nowPrice: item.nowPrice,
            LowPrice: item.LowPrice,
            EnName: img,
            turnover:item.turnover,
            generalCapital:item.generalCapital,
            circulationCapital:item.circulationCapital,
          };
        });
      }
    });
  },

  mounted() {
    this.wrapperHeight =
      document.documentElement.clientHeight -
      this.$refs.wrapper.getBoundingClientRect().top;
  }
};
</script>