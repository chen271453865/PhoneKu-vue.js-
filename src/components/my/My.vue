<template>
  <div>
      <mt-header :title="biaot" :fixed='true'>
            <router-link to="/index/detail" slot="left">
                <!-- <mt-button icon="back">返回</mt-button> -->
            </router-link>
        </mt-header>
        <div class="marginTop40">
			<div class="all">
				<div class="left">
					<p>用户：<small>133435663920</small></p>
					<p>资产：<strong>0</strong><small>MKB</small></p>
				</div>
				<div class="right">2018-12-12</div>
			</div>
			<div class="ulMargin">
				<mt-cell title="玩家需知" is-link>
					<img slot="icon" src="../../assets/imgs/btc.png" width="24" height="24">
				</mt-cell>
			</div>
			<div class="ulMargin">
				<mt-cell title="实名认证" is-link to="/my/RealName">
					<img slot="icon" src="../../assets/imgs/btc.png" width="24" height="24">
				</mt-cell>
				<mt-cell title="充值" is-link to="/my/Recharge">
					<img slot="icon" src="../../assets/imgs/btc.png" width="24" height="24">
				</mt-cell>
				<mt-cell title="提现" is-link to="/my/Withdrawals">
					<img slot="icon" src="../../assets/imgs/btc.png" width="24" height="24">
				</mt-cell>
				<mt-cell title="修改登陆密码" is-link to="/my/ChangeLoginPassword">
					<img slot="icon" src="../../assets/imgs/btc.png" width="24" height="24">
				</mt-cell>
			</div>
			<div class="ulMargin">
				<mt-cell title="修改交易密码" is-link to="/my/ChangeTransitionPassword">
					<img slot="icon" src="../../assets/imgs/btc.png" width="24" height="24">
				</mt-cell>
			</div>
        </div>
        <footers></footers>
  </div>
</template>
<script>
import Footers from "@/components/public/Footers";
import { Cell } from "mint-ui";
export default {
  data() {
    return {
      biaot: "我的",
      list: []
    };
  },
  components: {
    Footers
  },
	methods:{
		realName:function(){
			alert("ssssss");
		}
	}
};
</script>
<style scoped>
.marginTop40 {
  margin-top: 40px;
}
.all{
	background: #ffffff;
	padding: 10px;
	display: flex;
}
.left{
	flex: 3;
}
.left p{
	height: 30px;
	line-height: 30px;
	padding-right: 20px;
	font-size: 14px;
}
.left p small{
	/* float: right; */
	color: #9f9ca2;
}
.right{
	flex: 2;
	font-size: 12px;
	height: 60px;
	line-height: 60px;
	text-align: center;
	border-left: 1px solid #f5f5f5;
}
p{
	margin: 0;
}
.ulMargin{
	margin-top: 10px;
}
</style>

