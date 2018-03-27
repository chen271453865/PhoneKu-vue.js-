<template>  
  <div class="page-navbar"> 
    <!-- navbar -->  
    <mt-navbar v-model="selected">  
      <mt-tab-item id="1">动态</mt-tab-item>  
      <mt-tab-item id="2">发行信息</mt-tab-item>
    </mt-navbar>
    <!-- tabcontainer -->  
    <mt-tab-container v-model="selected">  
      <mt-tab-container-item id="1"> 
          <div class="sellAll">
              <div class="sell">
                    <ul class="messageUl">
                        <li>
                            <small></small>
                            <small class="cellColor">价格</small>
                            <small class="cellColor">数量</small>
                            <small class="cellColor">累计数量</small>
                        </li>
                    </ul>
                    <ul class="messageUl" v-for="(n,index) in sells" :key="n.index">
                       <li>
                           <small class="cellColor">卖{{index+1}}</small>
                           <small class="red">{{n.sellPrice}}</small>
                           <small class="red">{{n.sellNum}}</small>
                           <small class="red">{{n.sellAllNum}}</small>
                       </li>
                    </ul>
              </div>
               <div class="buy">
                    <ul class="messageUl">
                        <li>
                            <small></small>
                            <small class="cellColor">价格</small>
                            <small class="cellColor">数量</small>
                            <small class="cellColor">累计数量</small>
                        </li>
                    </ul>
                    <ul class="messageUl" v-for="(n,index) in buys" :key="n.index">
                       <li>
                           <small class="cellColor">买{{index+1}}</small>
                           <small class="green">{{n.buyPrice}}</small>
                           <small class="green">{{n.buyNum}}</small>
                           <small class="green">{{n.buyAllNum}}</small>
                       </li>
                    </ul>
              </div>
          </div>
      </mt-tab-container-item>  
      <mt-tab-container-item id="2">  
        <div class="data">{{data}}</div>  
      </mt-tab-container-item>
    </mt-tab-container>  
  </div>  
</template>  
  
<script>  
export default {  
  name: 'page-navbar',  
  data() {  
    return {  
        selected: '1' ,
        data:'',
        buys:[],
        sells:[],
    };  
  },
  created:function(){
    // this.intervalid1 = setInterval(() => {
        
    // })
    this.$fetch('/sell').then(response => {
                if(response.success == true ) {
                this.sells = response.data.sell.map(n => {
                    return {
                        sellPrice: n.sellPrice,
                        sellNum:n.sellNum,
                        sellAllNum:n.sellAllNum
                    }
                    });
                     this.buys = response.data.buy.map(n => {
                return {
                    buyPrice: n.buyPrice,
                    buyNum:n.buyNum,
                    buyAllNum:n.buyAllNum
                }
                });
                this.data = response.data.message;
                }
            })
        }
    };  
</script>  
<style>
.mint-navbar .mint-tab-item.is-selected{
    border-bottom: 3px solid #26a2ff !important;
    color: #26a2ff !important;
    margin-bottom: 0;
}
.sellAll{
    background: #ffffff;
    /* padding: 10px 0; */
}
.messageUl{
    padding: 0;
    display: flex;
    margin: 3px;
}
.messageUl li{
    width: 100%;
    display: flex;
    height: 30px;
    line-height: 30px;
}
.messageUl li small{
    flex:1;
    text-align: center;
    font-size: 12px;
}
.red{
    color: #ff0000;
}
.green{
    color: #00ff16;
}
li{
    list-style: none;
}
.cellColor{
    color: #888;
}
.data{
    background: #ffffff;
    padding: 10px;
    font-size: 12px;
}
</style>
