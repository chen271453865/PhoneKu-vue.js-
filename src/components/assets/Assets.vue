<template>
  <div>
        <mt-header :title="biaot" :fixed='true'>
            <router-link to="/index/detail" slot="left">
                <!-- <mt-button icon="back">返回</mt-button> -->
            </router-link>
        </mt-header>
        <div class="all_money">
          <div class="single" v-for="(item,index) in list" :key="item.EnName"  @click="toDetail(index)">
            <div class="left">
              <strong>{{item.EnName}}</strong>
            </div>
            <div class="right">
              <div class="top">
                  <P><small>持股</small><span>{{item.buyNum}}</span></P>
                  <P><small>成本</small><span>{{item.buyPrice}}</span></P>
              </div>
              <div class="bottom">
                  <P><small>可用</small><span>{{item.buyNum}}</span></P>
                  <P><small>现价</small><span>{{item.nowPrice}}</span></P>
              </div>
            </div>
          </div>
        </div>
        <footers></footers>
  </div>
</template>
<script>
import Footers from "@/components/public/Footers";
export default {
  data() {
    return {
	  biaot: "个人资产",
	  list:[],
    };
  },
  components: {
    Footers
  },
   created() {
	//    alert("ssssss");
this.$fetch('/personalAssets')
        .then(response => {
            if(response.status == "success" ) {
              this.list = response.data.projects.map(item => {
				  return {
				  	CnName: item.CnName,
                    EnName: item.EnName,
                    buyNum: item.buyNum,
                    buyPrice: item.buyPrice,
					nowPrice: item.nowPrice,
					turnover:item.turnover,
					generalCapital:item.generalCapital,
					circulationCapital:item.circulationCapital,
                  }
                })
            }
        })

  },
  methods:{
	  toDetail:function(index){
		//   alert( index );
		//   return false;
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
	  }
  }
};
</script>
<style scoped>
p{
	margin: 0;
}
.all_money {
  margin-top: 40px;
  padding: 10px;
}
.single {
  overflow: hidden;
  background: #ffffff;
  padding: 5px;
  border: 1px solid #d8d0d0;
  box-sizing: border-box;
  display: flex;
  margin-top: 10px;
}
.single:nth-of-type(1){
	margin-top: 0;
}
.left {
  flex: 1;
  text-align: center;
  line-height: 60px;
  border-right: 1px solid #f5f5f5;
}
.right {
  flex: 3;
}
.top,.bottom{
	display: flex;
}
.top p,.bottom p{
	flex: 1;
	height: 30px;
	line-height: 30px;
}
.top p:nth-of-type(1),.bottom p:nth-of-type(1){
	padding: 0 10px;
}
.top p small,.bottom p small{
	float: left;
	color: #9f9ca2;
}
.top p span,.bottom p span{
	float: right;
	font-weight: bold;
	font-size: 14px;
}
</style>

