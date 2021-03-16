<template>
  <div class="goods-info" @click="goGoodsPage()">
    <div class="goods-image">
      <img v-lazy="goodsImage" width="90%" />
    </div>
    <div class="goods-name">{{ goodsName }}</div>
    <div class="goods-price">￥{{ goodsPrice | moneyFliter }}</div>
  </div>
</template>

<script>
import { toMoney } from "@/filter/moneyFilter.js";
export default {
  props: ["goodsImage", "goodsName", "goodsPrice",'goodsId'],
  data() {
    return {};
  },
  methods:{
    goGoodsPage(){
      this.$router.push({name:'Goods',query:{goodsId:this.goodsId}})
    }
  },

  filters: {
    moneyFliter(money) {
      return toMoney(money);
    },
  },
};
</script>

<style>
.goods-name {
  margin: 0 8px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
 

}
.goods-info {
  background-color: white;
   border-right: 1px solid #eee;
    border-bottom: 1px solid #eee;
}
</style>