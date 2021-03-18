
//vba + 回车
<template>
  <!-- 必须要有一个div包裹 -->

  <div>
    <div class="search-bar">
      <!-- vant是24格布局法 -->
      <van-row class="search-bar-row">
        <van-col span="3">
          <img v-lazy="locationIcon" alt="" class="location" />
        </van-col>

        <van-col span="16">
          <input type="text" />
        </van-col>
        <van-col span="5">
          <van-button size="mini" class="search-button">查找</van-button>
        </van-col>
      </van-row>
    </div>

    <div class="swiper-area">
      <van-swipe :autoplay="1000">
        <van-swipe-item v-for="(banner, index) in bannerPicArray" :key="index">
          <img v-lazy="banner.image" alt="" width="100%" />
        </van-swipe-item>
      </van-swipe>
    </div>

    <div class="type-bar">
      <div v-for="(cate, index) in category" :key="index" class="type-bar-con">
        <img v-lazy="cate.image" alt="" width="100%" class="img" />
        <span>{{ cate.mallCategoryName }}</span>
      </div>
    </div>

    <div>
      <img v-lazy="ad" alt="" width="100%" />
    </div>

    <div class="recommend2">
      <div class="recommend-title">商品推荐</div>
      <div class="recommend-boby">
        <swiper :options="swiperOptions">
          <swiper-slide v-for="(item, index) in recommendGoods" :key="index">
            <div class="recom-item">
              <img v-lazy="item.image" alt="" width="80%" />
              <div>{{ item.goodsName }}</div>
              <div>
                ¥{{ item.price | moneyFliter }}(¥{{
                  item.mallPrice | moneyFliter
                }})
              </div>
            </div>
          </swiper-slide>
        </swiper>
      </div>
    </div>

    <!-- <div class="floor">
      <div class="floor-anomaly">
        <div class="floor-one">
          <img :src="floor1_0.image" alt="" width="100%" />
        </div>

        <div>
          <div class="floor-two">
            <img :src="floor1_1.image" alt="" width="100%" />
          </div>
          <div class="floor-three">
            <img :src="floor1_2.image" alt="" width="100%" />
          </div>
        </div>

      </div>
      <div class="floor-rule">
        <div v-for="(item,index) in floor1.slice(1)" :key='index'>
          <img :src="item.image" alt="" width="100%">
        </div>
      </div>
    </div> -->

    <floor-components
      :floorData="floor1"
      :floorTitle="ftitle.floor1"
    ></floor-components>
    <floor-components
      :floorData="floor2"
      :floorTitle="ftitle.floor2"
    ></floor-components>
    <floor-components
      :floorData="floor3"
      :floorTitle="ftitle.floor3"
    ></floor-components>

    <!-- <swiperDefault></swiperDefault> -->
    <!-- <swiperDefault2></swiperDefault2> -->

    <!--Hot Area-->
    <div class="hot-area">
      <div class="hot-title">—— 热卖商品 ——</div>
      <div class="hot-goods">
        <!--这里需要一个list组件-->
        <van-list>
          <!-- gutter="20"每列要留一些空隙 -->
          <van-row>
            <van-col
              span="12"
              v-for="(item, index) in hotGoods"
              :key="index"
              style="padding-left=0"
            >
              <goodsInfo
                :goodsImage="item.image"
                :goodsName="item.name"
                :goodsPrice="item.price"
                :goodsId="item.goodsId"
              ></goodsInfo>
            </van-col>
          </van-row>
        </van-list>
        ----我是有底线的----
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

import "swiper/swiper-bundle.css";
import { Swiper, SwiperSlide, directive } from "vue-awesome-swiper";

// import swiperDefault from '../swiper/swiperDefault'
// import swiperDefault2 from '../swiper/swiperDefault2'

import floorComponents from "../component/floorComponents";

import goodsInfo from "../component/goodsInfoComponents";

import url from "@/serviceAPI.config.js";

// 没有使用deflute，所以要加一个括号,@代表src文件夹
import { toMoney } from "@/filter/moneyFilter.js";

export default {
  //vdata + 回车

  data() {
    return {
      msg: "shopping",
      locationIcon: require("../../assets/images/location.png"),
      bannerPicArray: [
        { imageUrl: require("../../assets/images/banner1.png") },
        { imageUrl: require("../../assets/images/banner2.png") },
        { imageUrl: require("../../assets/images/banner3.png") },
      ],
      category: [],
      ad: "",
      bannerPicArray: [],
      recommendGoods: [],
      swiperOptions: {
        slidesPerView: 3,
      },
      floor1: [],
      floor2: [],
      floor3: [],
      // floor1_0: {},
      // floor1_1: {},
      // floor1_2: {},
      ftitle: {},
      hotGoods: [], //热卖商品
    };
  },
  filters: {
    moneyFliter(money) {
      return toMoney(money);
    },
  },
  components: {
    Swiper,
    SwiperSlide,
    // swiperDefault,
    // swiperDefault2
    floorComponents,
    goodsInfo,
  },
  directives: {
    swiper: directive,
  },
  created() {
    axios({
      //  url:'https://www.fastmock.site/mock/672a975c04670f5e6d31191cf317570c/ecommerce/index'
      url: url.getShoppingMailInfo,
      method: "get",
    })
      .then((response) => {
        console.log(response);
        if (response.status == 200) {
          this.category = response.data.data.category;
          this.ad = response.data.data.advertesPicture.PICTURE_ADDRESS;
          this.bannerPicArray = response.data.data.slides;
          this.recommendGoods = response.data.data.recommend;
          this.floor1 = response.data.data.floor1;
          this.floor2 = response.data.data.floor2;
          this.floor3 = response.data.data.floor3;
          // this.floor1_0 = this.floor1[0];
          // this.floor1_1 = this.floor1[1];
          // this.floor1_2 = this.floor1[2];
          this.ftitle = response.data.data.floorName;
          this.hotGoods = response.data.data.hotGoods;
          // console.log(this.hotGoods);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  },
};
</script>

<style scoped lang='less'>
// 字体大小不建议写成rem，可以直接就是14px

* {
  padding: 0px;
  margin: 0px;
}

.search-bar {
  height: 2.2rem; //1rem=16px
  padding: 0.25rem 0rem;
  background-color: #cc99cc;
  line-height: 2.2rem;
  overflow: hidden;
  img {
    display: inline-block;
    margin-top: 0.5rem;
    height: 1.5rem;
    width: 1.5rem;
  }
  input {
    height: 1.3rem;
    border-top: 0px;
    border-left: 0px;
    border-right: 0px;
    border-bottom: 1px #fff solid !important ;
    background: #cc99cc;
    width: 100%;
    color: #fff;
  }
  .search-button {
    padding-top: 0.2rem;
    padding-left: 0.2rem;
    border-radius: 0.2rem;
    //  height: rem;
    width: 2.6rem;
    // width:3rem;
    // width: 50px;
    // line-height: 1rem;
  }
}
.swiper-area {
  clear: both;
  //max-height、overflow可以加载图片时，小圆点造成的空白消失
  max-height: 9rem;
  overflow: hidden;
}

.type-bar {
  background-color: #fff;
  display: flex;
  margin: 0 0.3rem 0.3rem 0.3rem;
  border-radius: 0.3rem;
  font-size: 14px;
  flex-direction: row;
  flex-wrap: nowrap;
  div {
    font-size: 12px;
    padding: 0.3rem;
    flex:1;
  }
}

.recommend2 {
  background-color: white;
  margin-top: 0.3rem;
  .recommend-title {
    text-align: left;
    font-size: 14px;
    border-bottom: 1px solid #eee;
    color: #cc99cc;
    font-weight: bold;
  }
  .recommend-boby {
    border-bottom: 1px solid #eee;
    font-size: 12px;
    text-align: center;
    // .recom-item{
    //     width: 99%;
    // }
  }
}
.hot-title {
  text-align: center;
  font-size: 12px;
  height: 1.8rem;
  line-height: 1.8rem;
  color: #cc99cc;
  font-weight: bold;
  border-bottom: 1px solid #eee;
}
.hot-goods {
  font-size: 12px;
  height: 118rem;
  overflow: hidden;


}
</style>