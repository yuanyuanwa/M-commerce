// 注册页面
<template>
  <div class="aa">
    <van-nav-bar
      title="用户注册"
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
        <van-button type="primary" size="large" @click="registerAction" :loading="openLoading"
          >马上注册</van-button
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
  methods: {
    goBack() {
      this.$router.go(-1);
    },

    registerAction(){
      // if(this.checkFrom()){
      //   this.axiosRegisterUser()
      // }
      this.checkFrom()&&this.axiosRegisterUser()
    },
    //自定义的一个方法
    axiosRegisterUser() {
      this.openLoading=true;
      axios({
        url: url.registerURL,

        //表单一般都用post
        method: 'post',
        //data就是后端的ctx.request.body
        data: {
          //上面data注册的,用v-model进行双向绑定过，所有就可以拿到input框里的值

          //userName、password名字要和service/database/schema/User.js文件里面的名字一样
          userName: this.username,
          password: this.password,
        }
      })
        .then((response) => {
          // console.log(response);
          //response.data就是后端的ctx.body
          if(response.data.code==200){
            //vant提供的一个轻量化的提示组件
            Toast.success(response.data.message)

            //跳转到首页
             this.$router.push('/')
          }else{
            console.log(response.data.message);
            this.openLoading=false;
            Toast.fail('注册失败')
          }
        })
        .catch((error) => {
          console.log(error);
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