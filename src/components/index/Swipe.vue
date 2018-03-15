<template>
    <div>
        <mt-swipe :auto="4000" class="swipe1">
            <mt-swipe-item>1</mt-swipe-item>
            <mt-swipe-item>2</mt-swipe-item>
            <mt-swipe-item>3</mt-swipe-item>
        </mt-swipe>
    </div>
</template>
<style>
.swipe1{
    width: 100%;
    height: 120px;
    background: red;
}
</style>
<script>
    export default{
        methods:{
            created:function(){
                alert("sssss");
            }
        }
    }
</script>
