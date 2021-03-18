//在mian.js引入bar、List、PullRefresh
<template>
  <div>
    <div class="navbar-div">
      <van-nav-bar title="类别列表"></van-nav-bar>
    </div>
    <div>
      <van-col span="6">
        <div id="leftnav">
          <ul>
            <li
              @click="clickCategory(index, item.ID)"
              :class="{ categoryActive: categoryIndex == index }"
              v-for="(item, index) in category"
              :key="index"
            >
              {{ item.MALL_CATEGORY_NAME }}
            </li>
          </ul>
        </div>
      </van-col>
      <van-col span="18">
        <div class="tabCategorySub">
          <van-tabs v-model="active" @click="onClickCategorySub">
            <!-- 点击--调用onload（）--调用getGoodList（） -->
            <van-tab
              v-for="(item, index) in categorySub"
              :key="index"
              :title="item.MALL_SUB_NAME"
            >
            </van-tab>
          </van-tabs>
        </div>

        <div id="list-div">
          <!-- 上拉刷新 -->
          <van-pull-refresh v-model="isRefresh" @refresh="onRefresh">
            <!-- 下拉加载 -->
            <van-list
              v-model="loading"
              :finished="finished"
              @load="onload"
              finished-text="没有更多了"
            >
              <div
                class="list-item"
                v-for="(item, index) in goodList"
                :key="index"
                @click="goGoodsInfo(item.ID)"
              >
                <div class="list-item-img">
                  <img
                    :src="item.IMAGE1"
                    alt=""
                    width="100%"
                    :onerror="errorImg"
                  />
                </div>
                <div class="list-item-text">
                  <div class="name">{{ item.NAME }}</div>
                  <div class="price">￥{{ item.ORI_PRICE | moneyFliter() }}</div>
                </div>
              </div>
              <!-- <div
                class="list-item"
                v-for="(item, index) in goodList"
                :key="index"
              >
                <div class="list-item-img">
                  <img :src="item.IMAGE1" width="100%" />
                </div>
                <div class="list-item-text">
                  <div>{{ item.NAME }}</div>
                  <div class="">￥{{ item.ORI_PRICE }}</div>
                </div>
              </div> -->
            </van-list>
          </van-pull-refresh>
        </div>
      </van-col>
    </div>
  </div>
</template>

<script>
// 引入axio和封装的aixos文件
import axios from "axios";
//@代表src文件夹
import url from "@/serviceAPI.config.js";
import { Toast } from "vant";
import { toMoney } from "@/filter/moneyFilter.js";
export default {
  data() {
    return {
      category: [], //保存一级分类的信息
      categoryIndex: 0,
      categorySub: [], //小类别
      active: 0, //激活标签的值，默认为0
      loading: false, //false才进行上拉加载，true就不可以上拉加载
      finished: false, //上拉加载是否有数据,flase就是还有数据
      // list:[],//商品数据
      isRefresh: false, //false进行下拉刷新

      page: 1, //商品列表的页数
      goodList: [], //商品列表信息
      categorySubId: "", //商品子类ID
      errorImg: 'this.src="' + require("@/assets/images/errorimg.png") + '"',
    };
  },
  //过滤器
   filters: {
    moneyFliter(money) {
      return toMoney(money);
    },
  },
  mounted() {
    //DOM加载完以后
    //左侧导航栏通栏

    //得到窗口高度
    let winHeight = document.documentElement.clientHeight;
    document.getElementById("leftnav").style.height = winHeight - 46 + "px";

    //设置右下一块的高度
    document.getElementById("list-div").style.height = winHeight - 90 + "px";
  },
  created() {
    this.getCategory();
  },
  methods: {
    //获取大类
    getCategory() {
      axios({
        url: url.getCategoryList,
        method: "get",
      })
        .then((response) => {
          console.log(response);
          //response.data.message不为空就是true
          if (Number(response.data.code) === 200 && response.data.message) {
            this.category = response.data.message;
            console.log(1, this.category);
            this.getCategorySubByCategoryID(this.category[0].ID);
          } else {
            Toast("服务器错误，数据获取失败");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },

    //反白效果制作,获取小类
    clickCategory(index, categoryId) {
      this.categoryIndex = index;
      this.page = 1;
      //把到顶效果去掉
      this.finished = false;
      this.goodList = [];
      this.getCategorySubByCategoryID(categoryId);
    },

    //根据大类ID读取小类列表
    getCategorySubByCategoryID(categoryId) {
      axios({
        url: url.getCategorySubList,
        method: "post",
        //categoryId是这个函数的形参，不是在data里面注册的变量，所以没有加this
        data: { categoryId: categoryId },
      })
        .then((response) => {
          console.log(response);
          if (Number(response.data.code) === 200 && response.data.message) {
            this.categorySub = response.data.message;
            this.active = 0;
            console.log(33, this.categorySubId);
            try {
              this.categorySubId = this.categorySubId[0].ID;
            } catch (e) {}

            this.onload();
          } else {
            Toast("服务器错误，数据获取失败");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },

    //上拉加载
    onload() {
      setTimeout(() => {
        console.log(this.categorySub);
        console.log(222, this.categorySubId);
        this.categorySubId = this.categorySubId
          ? this.categorySubId
          : this.categorySub[0].ID;
        this.getGoodList();

        // for(let i=0;i<10;i++){
        //     this.list.push(this.list.length+1)//this.list==[1,2,3,4,5,...]
        // }
        // console.log(this.loading);//true
        // this.loading=false;
        // if(this.list.length>=40){
        //     this.finished=true
        // }
      }, 1000);
    },

    //下拉刷新
    onRefresh() {
      setTimeout(() => {
        this.isRefresh = false;
        this.finished = false;
        this.goodList = [];
        this.page = 1;
        this.onload();
      }, 500);
    },

    //获取商品小类信息
    getGoodList() {
      axios({
        url: url.getGoodsListByCategorySubID,
        method: "post",
        data: {
          //获得子类别的ID
          categorySubId: this.categorySubId,
          //获取当前的页数
          page: this.page,
        },
      })
        .then((response) => {
          console.log(response);
          if (
            Number(response.data.code) === 200 &&
            response.data.message.length
          ) {
            this.page++;
            this.goodList = this.goodList.concat(response.data.message);
          } else {
            this.finished = ture; //不再进行上拉加载
          }
          this.loading = false;
        })
        .catch((error) => {
          console.log(error);
        });
    },

    //点击子类获取categorySubId
    onClickCategorySub(index, title) {
      //console.log( this.categorySub)
      this.categorySubId = this.categorySub[index].ID;
      console.log(this.categorySubId);

      this.goodList = [];
      this.finished = false;
      this.page = 1;
      this.onload();
    },

    //跳转到商品详情页
    goGoodsInfo(id) {
        //name，使用params是隐藏的，刷新会被清空，path使用query会出现在地址栏，刷新不会被清空
      this.$router.push({ name: "Goods", query: { goodsId: id } });
    },
  },
};
</script>

<style lang="less" scoped>
#leftnav {
  background-color: aliceblue;
  li {
    line-height: 2rem;
    border-bottom: 1px solid #eee;
    padding: 3px;
    font-size: 0.8rem;
  }
}
.categoryActive {
  background-color: white;
}
.list-item {
  border-bottom: 1px solid #f0f0f0;
  background-color: #fff;
}
#list-div {
  overflow: scroll;
}
.list-item {
  display: flex;
  flex-direction: row;
  font-size: 0.8rem;
  border-bottom: 1px solid #f0f0f0;
  background-color: #fff;
  padding: 5px;
}
.list-item-img {
  flex: 8;
}
.list-item-text {
  flex: 16;
  margin-top: 10px;
  margin-left: 10px;
  font-size: 14px;
  text-align: left;
  .price {
    color: #cc99cc;
    font-weight: bold;
  }
}
</style>