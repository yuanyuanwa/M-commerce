<template>
  <div>
    <div class="main-div">
        <keep-alive>
            <router-view />
        </keep-alive>
      
    </div>

    <van-tabbar v-model="active" @change="changeTabbar(active)">
      <van-tabbar-item icon="shop">首页</van-tabbar-item>
      <van-tabbar-item icon="records">商品列表</van-tabbar-item>
      <van-tabbar-item icon="cart">购物车</van-tabbar-item>
      <van-tabbar-item icon="contact" info="20">个人中心</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: 0,
    };
  },
  created() {
    this.changeTabBarActive();
  },
  updated() {
    this.changeTabBarActive();
  },
  methods: {
    //加入购物车之后，图标选中的会变到购物车
    changeTabBarActive() {
        // console.log(1111111111111);
        // console.log(this.$route.path);
      this.nowPath = this.$route.path;
      if (this.nowPath == "/cart") {
        this.active = 2;
      }
      if (this.nowPath == "/categorylist") {
        this.active = 1;
      }
      if (this.nowPath == "/") {
        this.active = 0;
      }
      if (this.nowPath == "/vip") {
        this.active = 3;
      }
    },
    //点击底部导航栏到相应页面
    changeTabbar(active) {
      console.log(active);
      switch (active) {
        case 0:
          this.$router.push({ name: "ShoppingMail" });
          break;
        case 1:
          this.$router.push({ name: "CategoryList" });
          break;
        case 2:
          this.$router.push({ name: "Cart" });
          break;
        case 3:
          this.$router.push({ name: "Vip" });
          break;
      }
    },
  },
};
</script>

<style scoped>
</style>