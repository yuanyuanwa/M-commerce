// 注册页面
<template>
  <div class="aa">
    <van-nav-bar
      title="用户登陆"
      left-text="返回"
      left-arrow
      @click-left="goBack"
    ></van-nav-bar>

    <div class="register-panel">
      <van-field
        v-model="username"
        label="用户名:"
        :clearable="true"
        placeholder="输入用户名"
        required
        :error-message="usernameErrorMsg"
      >
      </van-field>
      <van-field
        v-model="password"
        type="password"
        label="密码:"
        :clearable="true"
        placeholder="请输入密码"
        required
        :error-message="passwordErrorMsg"
      >
      </van-field>
      <div class="register-button">
        <!-- click绑定的方法写不写括号都可以 -->
        <van-button type="primary" size="large" @click="loginAction" :loading="openLoading"
          >马上登陆</van-button
        >
      </div>
    </div>
  </div>
</template>

<script>
//引入axio和封装的aixos文件
import axios from "axios";
//@代表src文件夹
import url from "@/serviceAPI.config.js";

import {Toast} from'vant'

export default {
  data() {
    return {
      username: "",
      password: "",
      openLoading:false,//是否开启用户注册的Loading状态
      usernameErrorMsg:'',//当用户名出现错误时的提示信息
      passwordErrorMsg:'',//当密码出现错误时的提示信息
    };
  },
  created(){
    //判断有没有这个东西
    if(localStorage.userInfo){
      Toast.success('您已经登陆过了')
      this.$router.push('/')
    }
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },

   loginAction(){
      // if(this.checkFrom()){
      //   this.axiosRegisterUser()
      // }
      this.checkFrom()&&this.axiosLoginUser()
    },
    //自定义的一个方法
    axiosLoginUser() {
      this.openLoading=true;
      axios({
        url: url.login,

        //表单一般都用post
        method: 'post',
        data: {
          //上面data注册的,用v-model进行双向绑定过，所有就可以拿到input框里的值

          //userName、password名字要和service/database/schema/User.js文件里面的名字一样
          userName: this.username,
          password: this.password,
        }
      })
        .then((response) => {

         console.log(response);
         if(response.data.code==200&&response.data.message){
            new Promise((resolve,reject)=>{
            localStorage.userInfo={userName:this.username}
            setTimeout(()=>{resolve},500)
          }).then(()=>{
            Toast.success('登陆成功')
           this.$router.push('/')
          }).catch(err=>{
            Toast.fail('登陆状态保存失败')
           console.log(error);
          })

           Toast.success('登陆成功')
           this.$router.push('/')
         }else{
           Toast.fail('登陆失败')
           this.openLoading='false'//按钮就可以再次使用了
         }
         
        })
        .catch((error) => {
          Toast.fail('登陆失败')
           this.openLoading='false'//按钮就可以再次使用了
        });
    },

    //*** 表单验证方法
    checkFrom(){
      let isOk=true;
      if(this.username.length<2){
        this.usernameErrorMsg='用户名不能小于2位'
        isOk=false
      }else{
        this.usernameErrorMsg=''
      }
      var regex= /^\d{5,}$/
      if(!regex.test(this.password)){
        this.passwordErrorMsg='密码不能少于5位'
        isOk=false
      }else{
        this.passwordErrorMsg=''
      }
      return isOk
    }
  },
};
</script>

<style lang="less" scoped>
// .aa{
//       background-color: #eee;
//      }
.register-panel {
  width: 96%;
  border-radius: 5px;
  margin: 20px auto;
  padding-bottom: 80px;
  //    .van-field{
  //        &:first-child{
  //            margin-bottom: 2px;
  //        }
  //    }
  .register-button {
    padding-top: 10px;
    font-size: 16px;
  }
}
</style>