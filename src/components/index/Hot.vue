<template>
  <div>
      <ul class="hotQueryList">
      <li v-for ="(item,index) in flowers" :key="item.CnName" v-on:click="hot(index)">
        <div><img :src="item.EnName" alt="flowers"></div>
        <div>{{item.nowPrice}}</div>
        <div>{{item.HightestPrice}}</div>
        <div>{{item.LowPrice}}</div>
      </li>
  </ul>
  </div>
</template>
<script>
  export default{
     data() {
    return {
      flowers: []
    };
  },
   created() {
this.$fetch('/hotQueryList')
        .then(response => {
            if(response.success == true ) {
              this.flowers = response.data.projects.map(item => {
                  var img = null;
                  var HightestPrice = null;
                  try {
                    img = require(`../../assets/imgs/${item.EnName}.png`);
                  } catch (err) {
                    img = require('../../assets/imgs/btc.png');
                  }
                  return {
                    CnName: item.CnName,
                    HightestPrice: item.HightestPrice,
                    nowPrice: item.nowPrice,
                    LowPrice: item.LowPrice,
                    turnover:item.turnover,
                    generalCapital:item.generalCapital,
                    circulationCapital:item.circulationCapital,
                    EnName: img
                  }
                })
            }
        })

  },
  methods:{
    hot:function( index ){
      this.$store.commit('CnName',this.flowers[index].CnName);
      this.$store.commit('nowPrice',this.flowers[index].nowPrice);
      this.$store.commit('turnover',this.flowers[index].turnover);
      this.$store.commit('generalCapital',this.flowers[index].generalCapital);
      this.$store.commit('circulationCapital',this.flowers[index].circulationCapital);
      this.$store.state.stroe_data.CnName = this.flowers[index].CnName;
      this.$store.state.stroe_data.nowPrice = this.flowers[index].nowPrice;
      this.$store.state.stroe_data.turnover = this.flowers[index].turnover;
      this.$store.state.stroe_data.generalCapital = this.flowers[index].generalCapital;
      this.$store.state.stroe_data.circulationCapital = this.flowers[index].circulationCapital;
      this.$router.push({ name: 'Detail'});
    }
  }
  }
</script>
<style scoped>
.hotQueryList{
  padding-left: 0;
  /* display: flex; */
  margin: 0;
}
.hotQueryList li{
  width: 100%;
  display: flex;
  background: #ffffff;
  border-bottom: 1px solid #f5f5f5;
}
.hotQueryList li div{
  /* display:inline-block; */
  /* width: 25%; */
  text-align: center;
  flex: 1;
  font-size: 14px;
  height: 35px;
  line-height: 35px;
}
.hotQueryList li div:nth-last-of-type(2),
.hotQueryList li div:nth-last-of-type(3){
  color: red;
  font-size: 12px;
}
.hotQueryList li div:nth-of-type(4)
{
  color: #00ff16;
  font-size: 12px;
}
.hotQueryList li div img{
  width: 30px;
  transform: scale(0.9);
  vertical-align: bottom;
}
/* .hotQueryList li span:nth-of-type(1){
  width: 20px;
  height: 20px;
  background-size: contain;
}
.hotQueryList li span:nth-of-type(1) img{
  width: 100%;
  height: 100%;
} */
</style>
