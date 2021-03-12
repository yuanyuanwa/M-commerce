<template>
    <div class="aa">
        <van-nav-bar 
        title="用户注册"
        left-text='返回'
        left-arrow
        @click-left='goBack'
        ></van-nav-bar>
   
    <div class="register-panel">
        <van-field 
        v-model="username"
        label='用户名:'
        clearable=true
        placeholder="输入用户名"
        required
        >
        </van-field>
        <van-field
        v-model="password"
        type="password"
        label='密码:'
        clearable=true
        placeholder="请输入密码"
        required
        >
        </van-field>
        <div class="register-button">
            <van-button type="primary" size="large" >马上注册</van-button>
        </div>

    </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
            username: '',
            password:''
            }
        },
        methods:{
            goBack(){
                this.$router.go(-1)
            }
        }
    }
</script>

<style lang="less" scoped>
// .aa{
//       background-color: #eee;
//      }
.register-panel{
    width: 96%;
    border-radius:  5px;
    margin: 20px auto;
    padding-bottom: 80px;
//    .van-field{
//        &:first-child{
//            margin-bottom: 2px;
//        }
//    }
    .register-button{
        padding-top: 10px;
        font-size: 16px;
 
}

}


</style>