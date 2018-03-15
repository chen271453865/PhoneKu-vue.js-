<template>
	<div class="mgTop40">
		<!-- <div class="img_contain">
			<img src="../assets/imgs/MKlogo.png" alt="">
		</div> -->
		<mt-field label="手机号" placeholder="请输入手机号" type="tel" :attr="{ maxlength: 11 }"  v-model="phone"></mt-field>
		<mt-field label="密码" placeholder="8到16位数字与字母组合" type="password"  v-model="password"></mt-field>
        <mt-field label="确认密码" placeholder="8到16位数字与字母组合" type="password"  v-model="comPassword"></mt-field>
        <mt-field label="交易密码" placeholder="6位数字与字母组合" type="password"  v-model="transactionPassword"></mt-field>
        <mt-field label="确认交易密码" placeholder="6位数字与字母组合" type="password"  v-model="comTransactionPassword"></mt-field>
		
		<mt-button size="large" type="primary" class="mgTop40" @click="register">注册</mt-button>
		<router-link to="/" class="toRegister">已有账号，返回登陆</router-link>
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
    comPassword:'',
    transactionPassword:'',
    comTransactionPassword:''
	}
	
},
 methods:{
	 register:function(){
		 var phoneReg = /^1\d{10}$/ //手机号码
         var passwordReg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/;//8到16位数字与字母组合
         var comPasswordReg = /^\d{6}$/;//6位数字交易密码
		 var datas = {
			 'phone':this.phone,
             'password':this.password,
             'transactionPassword':this.transactionPassword
         }
        //  手机号码
		 if( this.phone.length <= 0 ){
			  alert("请输入账号");
			 return false;
		 }else{
			 if( !phoneReg.test(this.phone)){
				 alert("请输入正确的手机号码");
				 return false;
             }
         }
        //  密码
         if(this.password.length<=0){
             alert("密码不能为空");
             return false;
         }else{
             if(this.comPassword.length<=0){
                 alert("确认密码不能为空");
                 return false;
             }
             if(!passwordReg.test(this.password)){
                 alert("请输入8到16位密码");
                 return false
             }else if( this.password != this.comPassword ){
                 alert("密码不一致");
                 return false;
             }
         }
        //  交易密码
         if(this.transactionPassword.length<=0){
             alert("交易密码不能为空");
             return false;
         }else{
             if(this.comTransactionPassword.length<=0){
                 alert("确认交易密码不能为空");
                 return false;
             }
             if(!comPasswordReg.test(this.transactionPassword)){
                 alert("请输入6位交易密码");
                 return false
             }else if( this.transactionPassword != this.comTransactionPassword ){
                 alert("交易密码不一致");
                 return false;
             }else{
                this.$post('/login',datas).then((response) => {
                        var a = JSON.stringify( response.data );
                        console.log(a);
                        if(response.status==200){
                            alert("注册成功");
                            this.$router.push({ path: '/' });
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
	margin-top: 10px;
	margin-bottom: 20px;
}

.toRegister{
	position: fixed;
	bottom: 40px;
	left: 50%;
	transform: translate(-50%,0);
}
</style>

