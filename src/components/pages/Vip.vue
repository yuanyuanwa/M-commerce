<template>
    <div>
         <van-nav-bar
        title="个人中心"
       
      ></van-nav-bar>
    </div>
</template>

<script>
    export default {
        
    methods:{
        onClickLeft() {
      this.$router.go(-1);
    },
    }
    }
    
</script>

<style lang="less" scoped>

</style>