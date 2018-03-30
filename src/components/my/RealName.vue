<template>
  <div>
       <mt-header :title="biaot" :fixed='true'>
            <router-link to="/index/Hall" slot="left">
                <mt-button icon="back">返回</mt-button>
            </router-link>
        </mt-header>
        <div class="marginTop50">
            <mt-field label="手机号码" :attr="{ maxlength: 11 }" type="tel" placeholder="请输入手机号码" v-model="phone"></mt-field>
        </div>
         <div class="marginTop10">
            <mt-field label="姓名" placeholder="请输入姓名" v-model="name"></mt-field>
        </div>
         <div class="marginTop10">
            <mt-field label="身份证" :attr="{ maxlength: 18 }" placeholder="请输入身份证" v-model="userId"></mt-field>
        </div>
        <div class="marginTop50">
            <mt-button type="primary" size="large" @click.prevent="submit">提交</mt-button>
        </div>
  </div>
</template>
<script>
    import { Field } from 'mint-ui';
    import { Button } from 'mint-ui';
    import { Toast } from 'mint-ui';
    export default{
        data(){
            return {
                biaot:'ssssss',
                phone:'',
                name:'',
                userId:'',
            }
        },
        methods:{
            submit:function(){
                var phoneReg = /^1\d{10}$/ //手机号码
                var userIdReg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/ //身份证号码
                // console.log( this.phone );
                if(this.phone.length == 0){
                    alert("手机号码不能为空");
                    return false;
                }else if(!phoneReg.test(this.phone)){
                    alert("手机号码格式不正确，请重新输入");
                    return false;
                }else if( this.name == '' ){
                    alert("请输入您的真实姓名");
                    return false;
                }else if( this.userId.length == 0 ){
                    alert("请输入您的身份证");
                    return false;
                }else if( !userIdReg.test(this.userId) ){
                    alert("身份证格式不正确");
                    return false;
                }else{
                    var datas = {
                        'phone':this.phone,
                        'name':this.phone,
                        'userId':this.userId
                    }
                    this.$post('/realName',datas).then((response) => {
                    var a = JSON.stringify( response.data );
					if(response.status==200){
                            Toast({
                                message: '登陆成功',
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
</style>

