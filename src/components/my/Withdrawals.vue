<template>
  <div>
      <mt-header :title="biaot" :fixed='true'>
            <router-link to="/my/My" slot="left">
                <mt-button icon="back">返回</mt-button>
            </router-link>
        </mt-header>
		<div class="marginTop50">
            <mt-field label="姓名" type="text" :attr="{ maxlength: 4 }" onKeypress="javascript:if(event.keyCode == 32)event.returnValue = false;" placeholder="请输入姓名" v-model="withName"></mt-field>
        </div>
		<div class="marginTop10">
            <mt-field label="身份证" type="text" :attr="{ maxlength: 18 }" placeholder="请输入身份证" v-model="withUserId"></mt-field>
        </div>
		<div class="marginTop10">
            <mt-field label="银行卡号" type="num" placeholder="请输入银行卡号" v-model="withBankId"></mt-field>
        </div>
		<div class="marginTop10">
			<div @click="addressSelect">
				<mt-cell  title="所属银行" is-link><span :bankName="bankName">{{bankName}}</span></mt-cell>
			</div>
			<mt-popup
			v-model="popupVisible"
			position="bottom">
				<mt-picker :slots="slots" style="width:100%" @change="onValuesChange"></mt-picker>
			</mt-popup>
        </div>
		<div class="marginTop10">
            <mt-field label="支行名称" type="text" placeholder="请输入支行名称" v-model="withBranchName"></mt-field>
        </div>
		<div class="marginTop10">
				 <a class="mint-cell">
                    <div class="mint-cell-wrapper">
                        <div class="mint-cell-title">
                            <span class="mint-cell-text">最大值：</span>
                        </div>
                        <div class="mint-cell-value">
                            <span style="margin-right: 5px;">
                                <input type="number" v-model="max" onKeypress="javascript:if(event.keyCode == 32)event.returnValue = false;" class="height30" placeholder="最大可提现">
                            </span>
                            <small class="blue">{{mkSum}}(MKB)</small>
                        </div>
                    </div>
                </a>
        </div>
		<div class="marginTop50">
            <mt-button type="primary" size="large" @click="comfirmWithDraw">确认提现</mt-button>
        </div>
  </div>
</template>
<script>
	import { Picker } from 'mint-ui';
	import { Popup } from 'mint-ui';
	import { MessageBox } from 'mint-ui';
	import md5 from 'js-md5';
	export default{
		data(){
			return {
				biaot:"提现",
				bankName:'',
				withName:'',
				withUserId:'',
				withBankId:'',
				popupVisible:false,
				withBranchName:'',
				mkSum:this.$store.state.stroe_data.mkSum,
				max:'',
				slots: [
					{
						values: ['招商银行', '建设银行', '工商银行','农商银行','农业银行']
					}
				]
			}
		},
		methods: {
			onValuesChange(picker, values) {
					this.bankName = values[0];
					this.popupVisible = false;
				},
			comfirmWithDraw:function(){
				var userNameReg = /^([\u4e00-\u9fa5]){2,7}$/;//姓名
				var userIdReg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/ //身份证号码
				var bankReg = /^([1-9]{1})(\d{14}|\d{18})$/ //银行卡号
				// console.log( this.mkSum );
				// return false;
				if( this.withName == '' ){
					MessageBox('提示', '姓名不能为空');
					return false;
				}else if( !userNameReg.test(this.withName) ){
					MessageBox('提示', '姓名格式不正确');
					return false;
				}else if( this.withUserId.length <=0 ){
					MessageBox('提示', '身份证不能为空');
					return false;
				}else if( !userIdReg.test(this.withUserId) ){
					MessageBox('提示', '身份证格式不正确');
					return false;
				}else if( this.withBankId.length <=0 ){
					MessageBox('提示', '银行卡号不能为空');
					return false;
				}else if( !bankReg.test(this.withBankId) ){
					MessageBox('提示', '银行卡号格式不正确');
					return false;
				}else if( this.withBranchName == '' ){
					MessageBox('提示', '支行名称不能为空');
					return false;
				}else if( this.max.length <=0 ){
					MessageBox('提示', '提现金额不能为空');
					return false;
				}else if(this.max > this.mkSum ){
					MessageBox('提示', '提现金额不能大于最大值');
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
											// 先进行交易密码验证，验证成功的话再提交数据
											var transitionPassword = md5(value);
											var datas = {
															withName : this.withName,
															withUserId : this.withUserId,
															withBankId : this.withBankId,
															withBranchName : this.withBranchName,
															bankName : this.bankName,
															max : this.max
														}
											 this.$post('/transactionPassword',transitionPassword).then((response) => {
												if( response.status===200 && response.data.status == 'success'){
													// 提交数据
														this.$post('/withDrawals',datas).then((response) => {
															// var a = JSON.stringify( response.data );
															// console.log( a );
															console.log( response );
															if(response.status==200 && response.data.status == true){
																alert("ssssss顶顶顶顶顶顶");
																MessageBox('提示', '申请成功，等待审核');
																setTimeout(() => {
																	this.$router.push({ path: '/my/My' });
																}, 3000);	
															}
														})
												}
											})

										}
									}
									if(action == 'cancle'){
										alert("取消");
									}
							})
				}
			},
			addressSelect:function(){
					this.popupVisible = true;
				}
			},
	}
</script>
<style scoped>
.marginTop50{
    margin-top: 50px;
}
.height30{
    height: 30px;
    line-height: 30px;
    border:0;
}
.marginTop10{
	margin-top: 10px;
}
.mint-popup{
	width: 100% !important;
}
</style>
