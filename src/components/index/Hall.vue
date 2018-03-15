<template>
  <div>
   <swipe></swipe>
   <div class="recommend">推荐</div>
   <router-view></router-view>
<ul class="queryList">
      <li v-for ="(item,index) in flowers" :key="item.CnName" v-on:click="onclick(index)">
          <img :src="item.EnName" alt="flowers">
          <p class="">{{item.CnName}}</p>
      </li>
  </ul>
  <div class="recommend">热门</div>
<div class="hot">
  <ul>
    <li>名称</li>
    <li>当前价格</li>
    <li>最高</li>
    <li>最低</li>
  </ul>
</div>
<hot></hot>
<footers></footers>
  </div>
</template>
<script>
import Swipe from "@/components/index/Swipe";
import Hot from "@/components/index/Hot";
import Footers from "@/components/public/Footers";
export default {
  data() {
    return {
      flowers: []
    };
  },
  components:{
    Swipe,
    Hot,
    Footers
  },
  created() {
this.$fetch('/queryList')
        .then(response => {
            console.log( response );
            if(response.success == true ) {
              this.flowers = response.data.projects.map(item => {
                  var img = null;
                  try {
                    img = require(`../../assets/imgs/${item.EnName}.png`);
                  } catch (err) {
                    img = require('../../assets/imgs/btc.png');
                  }
                  return {
                    CnName: item.CnName,
                    EnName: img
                  }
                })
            }
        })
  },
  methods:{
    onclick:function(index){
      var params = this.flowers[index];
      alert(params);
      this.$router.push({ name: 'Detail',params:{flowers:params} });
    }
  }
};
</script>
<style>
.recommend {
  background: #ffffff;
  padding: 5px 10px;
  color: #000000;
  margin: 10px 0;
}
image[lazy="loading"] {
  width: 40px;
  height: 300px;
  margin: auto;
}
.queryList{
  display: flex;
  padding-left: 0;
  margin: 10px 0;
}
.queryList li{
  flex: 1;
  background: #ffffff;
  display:inline-block;
  background-size: contain;
  margin-left:5px;
  padding-top: 5px;
  text-align: center;
}
.queryList li:nth-child(3){
  margin-right: 5px;
}
.queryList li img{
  width: 100%;
  height: 100%;
  width: 60px;
  height: 60px;
  margin: 0 auto;
  transform: scale(0.8);
}
.queryList li p{
  margin: 0px 0;
  text-align: center;
  font-size: 14px;
  color: #8c8a8a;
}
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
</style>

