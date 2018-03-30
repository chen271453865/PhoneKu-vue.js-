<template>
  <div>
       <mt-header :title="biaot" :fixed='true'>
            <router-link to="/index/Hall" slot="left">
                <mt-button icon="back">返回</mt-button>
            </router-link>
        </mt-header>
        <div class="marginTop50">
             <a class="mint-cell">
                    <div class="mint-cell-wrapper">
                        <div class="mint-cell-title">
                            <span class="mint-cell-text">充值账户：</span>
                        </div>
                        <div class="mint-cell-value">
                            <strong style="display:inline-block;" class="colorBlack">13435663920&nbsp;&nbsp;(陈亮)</strong>
                        </div>
                    </div>
                </a>
        </div>
         <div class="marginTop10">
            <mt-field label="支付宝账号" :attr="{ maxlength: 20 }" placeholder="请输入支付宝账号" v-model="payNum"></mt-field>
        </div>
         <div class="marginTop10">
            <mt-field label="充值金额" :attr="{ mixlength: 3 }" type="number" placeholder="请输入充值金额" v-model="sum"></mt-field>
        </div>
         <div class="marginTop10">
            <mt-field label="流水单号" placeholder="请输入流水单号" v-model="payId"></mt-field>
        </div>
        <div class="marginTop10 imgContain">
           <img slot="icon" src="../../assets/imgs/lsdh.png">
        </div>
        <div class="marginTop50">
            <mt-button type="primary" size="large" @click.prevent="submit">提交充值</mt-button>
        </div>
  </div>
</template>
<script>
    import { Badge } from 'mint-ui';
    import { Field } from 'mint-ui';
    import { Button } from 'mint-ui';
    import { Toast } from 'mint-ui';
    export default{
        data(){
            return {
                biaot:'充值',
                payNum:'',
                sum:'',
                payId:'',
            }
        },
        methods:{
            submit:function(){
                var phoneReg = /^1\d{10}$/; //手机号码
                var qqReg = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/; //qq邮箱
                var moneyReg = /^[1-9]\d{0,2}$/;//金额不能为负数
                // console.log( this.phone );
                if(this.payNum.length == 0){
                    alert("支付宝不能为空");
                    return false;
                }else if(!phoneReg.test(this.payNum) && !qqReg.test(this.payNum) ){
                    alert("请输入正确的支付宝账号");
                    return false;
                }else if( this.sum.length ==0 || !moneyReg.test(this.sum) ){
                    alert("充值金额最低100元");
                    return false;
                }else if( this.payId.length == 0 ){
                    alert("请输入您的支付宝流水单号");
                    return false;
                }else{
                    var datas = {
                        'phone':this.payNum,
                        'name':this.sum,
                        'userId':this.payId
                    }
                    this.$post('/Recharge',datas).then((response) => {
                    var a = JSON.stringify( response.data );
					if(response.status==200){
                            Toast({
                                message: '提交成功,请等待审核',
                                iconClass: 'icon icon-success'
                            });
                            setTimeout(() => {
                                 this.$router.push({ path: '/my/My' });
                            }, 3000);
                           
                        }
                    })
				    return true;
                }
            }
        }
    }
</script>
<style scoped>
.marginTop50{
    margin-top: 50px;
}
.marginTop10{
    margin-top: 10px;
}
.colorBlack{
    color: #000000;
}
.imgContain{
    width: 100%;
    height: 85px;
    background-size: contain;
}
.imgContain img{
    width: 100%;
    height: 100%;
}
</style>

