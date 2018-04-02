<template>
  <div>
       <mt-header :title="biaot" :fixed='true'>
            <router-link to="/my/My" slot="left">
                <mt-button icon="back">返回</mt-button>
            </router-link>
        </mt-header>
		 <div class="marginTop50">
            <mt-field label="原始交易密码" placeholder="8到16位数字与字母组合" type="password"  v-model="oldTransitionPassword"></mt-field>
        </div>
		<div class="marginTop10">
            <mt-field label="新交易密码" placeholder="8到16位数字与字母组合" type="password"  v-model="newTransitionPassword"></mt-field>
        </div>
		<div class="marginTop10">
            <mt-field label="确认新密码" placeholder="8到16位数字与字母组合" type="password"  v-model="comfirmNewTransitionPassword"></mt-field>
        </div>
		<div class="marginTop50">
            <mt-button type="primary" size="large" @click.prevent="submit">提交</mt-button>
        </div>
  </div>
</template>
<script>
import { MessageBox } from 'mint-ui';
import md5 from 'js-md5';
  export default{
    data() {
		return {
			biaot: '修改交易密码',
			oldTransitionPassword:'',
			newTransitionPassword:'',
			comfirmNewTransitionPassword:''
		}
	},
	methods:{
		submit:function(){
			// alert("ssssss");
			var passwordReg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/;//8到16位数字与字母组合
			if(this.oldTransitionPassword.length<=0){
				MessageBox('提示', '原始交易密码不能为空');
				return false;
			}else if(!passwordReg.test(this.oldTransitionPassword)){
				MessageBox('提示', '密码格式不正确');
				return false;
			}else if(this.newTransitionPassword.length<=0){
				MessageBox('提示', '新交易密码密码不能为空');
				return false;
			}else if(!passwordReg.test(this.newTransitionPassword)){
				MessageBox('提示', '新交易密码格式不正确');
				return false;
			}else if(this.oldTransitionPassword === this.newTransitionPassword){
				MessageBox('提示', '新密码跟原始密码相同，请重新填写');
				return false;
			}else if(this.comfirmNewTransitionPassword.length<=0){
				MessageBox('提示', '确认不能为空');
				return false;
			}else if(this.comfirmNewTransitionPassword != this.newTransitionPassword){
				MessageBox('提示', '密码不一致');
				return false;
			}else{
				var datas = {
					oldPassword:md5(this.oldTransitionPassword),
					newPassword:md5(this.newTransitionPassword),
					comfirmNewPassword:md5(this.comfirmNewTransitionPassword)
				}
				this.$post('/login',datas).then((response) => {
					if(response.status==200 && response.data.status == 'ok'){
						MessageBox('提示', '交易密码修改成功，请重新登陆');
						setTimeout(() => {
							this.$router.push({ path: '/' });
						}, 3000);
						
					}
				})
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
</style>
