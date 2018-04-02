<template>
  <div>
        <mt-header :title="biaot" :fixed='true'>
            <router-link to="/index/detail" slot="left">
                <mt-button icon="back">返回</mt-button>
            </router-link>
        </mt-header>
        <div class="datas">
            <div class="page-part">
                <a class="mint-cell">
                    <div class="mint-cell-wrapper">
                        <div class="mint-cell-title">
                            <span class="mint-cell-text">当前余额：</span>
                        </div>
                        <div class="mint-cell-value">
                            <span style="margin-right: 5px;">{{mkSum}}</span>
                            <strong class="blue">MKB</strong>
                        </div>
                    </div>
                </a>
                <a class="mint-cell" style="margin-top:10px;">
                    <div class="mint-cell-wrapper">
                        <div class="mint-cell-title">
                            <span class="mint-cell-text">购买名称：</span>
                        </div>
                        <div class="mint-cell-value">
                            <span style="margin-right: 5px;">{{biaot}}</span>
                        </div>
                    </div>
                </a>
                <a class="mint-cell">
                    <div class="mint-cell-wrapper">
                        <div class="mint-cell-title">
                            <span class="mint-cell-text">购买价格：</span>
                        </div>
                        <div class="mint-cell-value">
                            <span style="margin-right: 5px;">{{buyPrice}}</span>
                            <strong class="blue">MKB</strong>
                        </div>
                    </div>
                </a>
                <a class="mint-cell">
                    <div class="mint-cell-wrapper">
                        <div class="mint-cell-title">
                            <span class="mint-cell-text">当前价格：</span>
                        </div>
                        <div class="mint-cell-value">
                            <span style="margin-right: 5px;">{{nowPrice}}</span>
                            <strong class="blue">MKB</strong>
                        </div>
                    </div>
                </a>
                <a class="mint-cell">
                    <div class="mint-cell-wrapper">
                        <div class="mint-cell-title">
                            <span class="mint-cell-text">最大值：</span>
                        </div>
                        <div class="mint-cell-value">
                            <span style="margin-right: 5px;">
                                <input type="number" v-model="max" class="height30" placeholder="请输入购买量">
                            </span>
                            <small class="blue">{{maxbuy}}(个)</small>
                        </div>
                    </div>
                </a>
                <mt-button size="large" type="primary" style="margin-top:40px;" @click="confirmBuy">确定购买</mt-button>
            </div>
        </div>
  </div>
</template>
<script>
import { MessageBox } from 'mint-ui';
import jquery from "jquery";
import md5 from 'js-md5';
    export default{
       data() {
           computed:{
                return {
                    biaot: this.$store.state.stroe_data.CnName,
                    mkSum:this.$store.state.stroe_data.mkSum,
                    buyPrice:this.$store.state.stroe_data.nowPrice,
                    nowPrice:this.$store.state.stroe_data.nowPrice,
                    maxbuy:'',
                    max:'',
                    // mkSum:this.$store.state.stroe_data.mkSum,
                    
                };
           }
  },
  created(){
        var maxBuy = parseInt( (this.$store.state.stroe_data.mkSum/this.$store.state.stroe_data.nowPrice)*10000)/10000;
        this.maxbuy = maxBuy;
      },
  methods:{
      confirmBuy(){
        //    var max = document.getElementById('inputValue').value();
        var maxBuy = parseInt( (this.$store.state.stroe_data.mkSum/this.$store.state.stroe_data.nowPrice)*10000)/10000;
          if( this.max.length<=0 || this.max ==0 ){
              alert("请输入购买量");
              return false;
          }else{
              if( this.max>maxBuy ){
                  alert("购买量大于最大值");
                  return false;
              }else{
                    MessageBox.prompt('请输入交易密码',{
            inputType:'password',
        }).then(({ value, action }) => {
            if (action == 'confirm') {
                if( value === null ){
                    alert("交易密码不能为空");
                    return false;
                    }else{
                        var transitionPassword = md5(value);
                        this.$post('/transactionPassword',transitionPassword).then((response) => {
                            if( response.status===200 && response.data.status == 'success'){
                                var datas = {
                                    'mkSum':this.$store.state.stroe_data.mkSum,
                                    'buyPrice':(this.$store.state.stroe_data.nowPrice),
                                    'max':this.max,
                                }
                            var buySum = (this.buyPrice)*(this.max);
                           this.$post('/transition',datas).then((response) => {
                                var a = JSON.stringify( response.data );
                                if(response.status==200 && a.status == true){
                                    MessageBox('提示', '购买成功');
                                    this.$router.push({ path: '/index/Hall' });
                                }
                            })
                            // return false;
                                // this.$store.state.stroe_data.mkSum =  this.maxbuy*this.$store.state.stroe_data.nowPrice
                                this.$store.commit('checkSum',buySum);
                                this.$router.push({ path: '/index/Detail' });
                            }
                        })
                    }
                }
                if(action == 'cancle'){
                    alert("取消");
                }
        })
              }
          }
      }
  }
    }
</script>
<style>
.datas{
    margin-top: 40px;
}
.blue{
    color: #26a2ff;
}
.height30{
    height: 30px;
    line-height: 30px;
    border:0;
}
</style>

