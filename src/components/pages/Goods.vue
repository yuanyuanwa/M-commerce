//先在前端main.js文件里引入NavBar、Tab,Tabs
<template>
  <div class="body">
    <div class="navbar-div">
      <van-nav-bar
        title="商品详情"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
      ></van-nav-bar>
    </div>
    <div class="topimage-div">
      <img :src="goodsInfo.IMAGE1" alt="" width="80%" />
    </div>
    <div class="goods-name">{{ goodsInfo.NAME }}</div>
    <div class="goods-price">
      价格：¥{{ goodsInfo.PRESENT_PRICE | moneyFliter() }}
    </div>
    <div class="tab">
      <van-tabs swipeable sticky>
        <van-tab title="商品详情">
          <!-- 注意当显示出的东西是html代码的时候就需要用v-html来转换-->
          <div class="detial" v-html="goodsInfo.DETAIL"></div>
        </van-tab>
        <van-tab title="评论"> 评论制作中... </van-tab>
      </van-tabs>
    </div>
    <!-- 底栏 -->
    <div class="goods-bottom">
      <van-button size="large" type="primary" @click="addGoodsToCart">加入购物车</van-button>
      <van-button size="large" type="danger">直接购买</van-button>
    </div>
  </div>
</template>

<script>
// 引入axio和封装的aixos文件
import axios from "axios";
//@代表src文件夹
import url from "@/serviceAPI.config.js";
import { Toast } from "vant";
// 没有使用deflute，所以要加一个括号,@代表src文件夹
import { toMoney } from "@/filter/moneyFilter.js";
export default {
  data() {
    return {
      goodsId: "",
      goodsInfo: {}, //商品详细信息
    };
  },
  created() {
    console.log("this.$route--------------");
    console.log(this.$route);
    this.goodsId = this.$route.query.goodsId
      ? this.$route.query.goodsId
      : this.$route.params.goodsId;

    this.getInfo();
  },
  filters: {
    moneyFliter(money) {
      return toMoney(money);
    },
  },
  methods: {
    getInfo() {
      axios({
        url: url.getDetailGoodsInfo,
        method: "post",
        data: {
          goodsId: this.goodsId,
        },
      })
        .then((response) => {
          //response.data就是后端的ctx.body

          console.log("商品详情--------------------------");
          console.log(response);
          if (response.data.code == 200 && response.data.message) {
            this.goodsInfo = response.data.message;
          } else {
            //Toast需要在本页引入
            Toast("服务器出现错误，数据获取失败");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    onClickLeft() {
      this.$router.go(-1);
    },
    //增加商品到购物车
    addGoodsToCart() {
      //清空cartInfo
      //localStorage.removeItem('cartInfo')

      //取出本地购物车中到商品
      console.log("localStorage-------------------------");
      console.log(localStorage);

      let cartInfo = localStorage.cartInfo? JSON.parse(localStorage.cartInfo): [];
      //判断购物车内是否已经有这个商品
      //如果没有返回undeifnd，如果有返回第一个查找到的数据
      let isHaveGoods = cartInfo.find((cart) => cart.goodsId == this.goodsId);
      console.log(isHaveGoods);
      if (!isHaveGoods) {
        //没有商品直接添加到数组中
        //重新组成添加到购物车的信息
        console.log('this.goodsInfo');
        console.log(this.goodsInfo);
        let newGoodsInfo = {
          goodsId: this.goodsInfo.ID,
          Name: this.goodsInfo.NAME,
          price: this.goodsInfo.PRESENT_PRICE,
          image: this.goodsInfo.IMAGE1,
          count: 1,
        };
        console.log(newGoodsInfo);
        cartInfo.push(newGoodsInfo); //添加到购物车
        localStorage.cartInfo = JSON.stringify(cartInfo); //操作本地数据
        Toast.success("添加成功");
      } else {
        Toast.success("已有此商品");
      }
      this.$router.push({ name: "Cart" }); //进行跳转
    },
  },
};
</script>

<style lang="less" scoped>
.topimage-div {
  padding-top: 20px;
}
.body {
  background-color: white;
}
.goods-price {
  text-align: center;
  font-size: 14px;
  font-weight: bold;
  padding-bottom: 1rem;
  border-bottom: 1px solid #eee;
}
.goods-name {
  text-align: center;
  font-size: 14px;
  font-weight: bold;
}
.tab {
  font-size: 12px;
  margin-bottom: 3rem;
}
.detial {
  font-size: 0px;
}
.goods-bottom {
  position: fixed;
  bottom: 0px;
  left: 0px;
  display: flex;
  background-color: white;
  width: 100%;
}
</style>