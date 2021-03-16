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
      <img :src="goodaInfo.IMAGE1" alt="" width="80%" />
    </div>
    <div class="goods-name">{{ goodaInfo.NAME }}</div>
    <div class="goods-price">价格：¥{{ goodaInfo.PRESENT_PRICE | moneyFliter()}}</div>
    <div class="tab">
      <van-tabs swipeable sticky>
        <van-tab title="商品详情">
          <!-- 注意当显示出的东西是html代码的时候就需要用v-html来转换-->
          <div class="detial" v-html="goodaInfo.DETAIL"></div>
        </van-tab>
        <van-tab title="评论"> 评论制作中... </van-tab>
      </van-tabs>
    </div>
    <!-- 底栏 -->
    <div class="goods-bottom">
        <van-button size="large" type="primary">加入购物车</van-button>
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
      goodaInfo: {}, //商品详细信息
    };
  },
  created() {
    console.log("-------");
    console.log(this.$route);
    this.goodsId = this.$route.query.goodsId;
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
          console.log(response);
          if (response.data.code == 200 && response.data.message) {
            this.goodaInfo = response.data.message;
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
.goods-bottom{
    position:fixed;
    bottom:0px;
    left: 0px;
    display: flex;
    background-color: white;
    width: 100%;
}
</style>