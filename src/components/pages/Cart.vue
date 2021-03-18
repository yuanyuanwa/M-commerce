//购物车
<template>
  <div>
    <div class="navbae-div">
      <van-nav-bar title="购物车"></van-nav-bar>
    </div>
        <div class="cart-title">
      <van-button size="small" type="danger" @click="clearCart()" > 清空购物车</van-button>
    </div>
    <div class="cart-list">
      <!-- 显示购物车中的商品 -->
      <div class="row" v-for="(item,index) in cartInfo" :key="index">
        <div class="image">
          <img :src="item.image" alt="" width="100%">
        </div>
        <div class="text">
          <div class="goods-name" @click="a(item)">{{item.Name}}</div>
          <div class="control">
            <!-- //v-model实现数据的双向绑定 -->
            <van-stepper v-model="item.count"></van-stepper>
          </div>
        </div>
        <div class="price">
          <div>
            ¥{{item.price | moneyFliter() }}
          </div>
          <div> 
            x{{item.count}}
          </div>
          <div class="allPrice">
            ¥{{item.price*item.count | moneyFliter()}}
          </div>
        </div>
      </div>
    </div>
    <!-- 显示总金额 -->
    <div class="totalMoney">
      <!-- //totalMoney计算属性 -->
      商品总价：¥{{totalMoney | moneyFliter()}}
    </div>
  </div>
</template>

<script>
import { toMoney } from "@/filter/moneyFilter.js";
export default {
  data() {
    return {
      cartInfo: [], //购物车信息
      isEmpty: false, //购物车是否为空，不为空则显示true，为空显示false
    };
  },
  //过滤器
   filters: {
    moneyFliter(money) {
      return toMoney(money);
    },
  },
  computed:{
    //计算属性是基于它们的响应式依赖进行缓存的。只在相关响应式依赖发生改变时它们才会重新求值。
    // 点击加减号会让双向绑定的count变化，引起cartInfo的变化，所以会重新求值
    totalMoney(){
      let allMoney=0
      console.log(this.cartInfo);
      this.cartInfo.forEach((item,index)=>{
        allMoney+=item.price*item.count
      })
      localStorage.cartInfo=JSON.stringify(this.cartInfo)
      return allMoney
    }
  },
  created(){
    this.getCartInfo()
  },
  methods: {
    //得到购物车信息
    getCartInfo() {
      //判断localStorage里是否有购物车数据
      if (localStorage.cartInfo) {
        //如果有数据，我们赋值给cartInfo，JSON.parse把字符串变成对象
        this.cartInfo = JSON.parse(localStorage.cartInfo);
      }
      //打印到控制台查看效果
      console.log(" this.cartInfo:" + JSON.stringify(this.cartInfo));
      this.isEmpty = this.cartInfo.length > 0 ? true : false;
    },
    //清空购物车
    clearCart(){
      localStorage.removeItem('cartInfo')
      this.cartInfo=[]
    },
    a(item){
      console.log(item);
    }
  },
};
</script>

<style lang="less" scoped>
.cart-title{
  height: 2rem;
  line-height: 2rem;
  background-color: #fff;
  border-bottom: 1px solid #E4E7ED;
  padding-bottom: 10px;
  padding-right: 10px;
  text-align: right;
}
.cart-list{
  background-color: white;
.row{
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  padding: 0.5rem;
  font-size: 0.85rem;
  border-bottom: 1px solid #EEE;
  .image{
    flex: 6;
  }
  .text{
    flex: 14;
    padding-inline-start: 10px;
    .control{
      padding-top: 10px;
    }
  }
  .price{
    flex: 4;
    text-align: right;
  }
  .allPrice{
    color: #cc99cc;
    font-weight: bold;
  }


}

}
.totalMoney{
    text-align: right;
    background-color: #fff;
     border-bottom:1px solid #E4E7ED;
     padding: 5px;
}

</style>