<template>
	<div class="mgTop40">
		<div class="img_contain">
			<img src="../assets/imgs/MKlogo.png" alt="">
		</div>
		<mt-field label="手机号" placeholder="请输入手机号" type="tel" :attr="{ maxlength: 11 }"  v-model="phone"></mt-field>
		<mt-field label="密码" placeholder="8到16位数字与字母组合" type="password"  v-model="password"></mt-field>
		<!-- <mt-field label="验证码" v-model="captcha">
			<img src="../assets/logo.png" height="45px" width="100px">
		</mt-field> -->
		<mt-button size="large" type="primary" class="mgTop40" @click="login">登陆</mt-button>
		 <router-link to="register" class="toRegister">未有账号，前往注册</router-link>
	</div>
</template>
<script>
import {setCookie,getCookie} from '../assets/js/cookie.js'
import {checkMobile} from '../assets/js/base.js'
import md5 from 'js-md5';
export default {
data:function(){
	return{
	phone:'',
	password:'',
	}
	
},
 methods:{
	 login:function(){
		 var phoneReg = /^1\d{10}$/ //手机号码
		 var passwordReg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/;//8到16位数字与字母组合
		 var datas = {
			 'phone':this.phone,
			 'password':this.password
		 }
		 if( this.phone.length <= 0 || this.password.length <= 0 ){
			  alert("请输入账号或者密码");
			 return false;
		 }else{
			 if( !phoneReg.test(this.phone)){
				 alert("请输入正确的手机号码");
				 return false;
			 }else if( !passwordReg.test(this.password)){
				  alert("请输入8到16位密码，数字与字母组合");
				 return false;
			 }else{
					this.$post('/login',datas).then((response) => {
					var a = JSON.stringify( response.data );
					console.log(a);
					if(response.status==200){
						this.$router.push({ path: '/index/Hall' });
					}
				})
				//  console.log( md5( this.password ) );
				 return true;
			 }
		 }
	 }
 }
};
</script>
<style>
.mgTop40{
	margin-top: 20px;
	margin-bottom: 20px;
}
.img_contain{
	margin-left: 25%;
	position: relative;
	width: 150px;
	height: 150px;
	background-size: contain;
	overflow: hidden;
}
.img_contain img{
	width: 100%;
	height: 100%;
	transform: scale(0.8);
}
.toRegister{
	position: fixed;
	bottom: 40px;
	left: 50%;
	transform: translate(-50%,0);
}
</style>

