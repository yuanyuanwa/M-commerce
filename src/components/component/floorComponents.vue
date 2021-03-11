// vba+回车
<template>
  <div>
    <div class="floor-title">—— {{floorTitle}} ——</div>
    <div class="floor">
      <div class="floor-anomaly">
        <div class="floor-one">
          <img :src="floorData0.image" alt="" width="100%" />
        </div>

        <div>
          <div class="floor-two">
            <img :src="floorData1.image" alt="" width="100%" />
          </div>
          <div class="floor-three">
            <img :src="floorData2.image" alt="" width="100%" />
          </div>
        </div>
      </div>
      <div class="floor-rule">
        <div v-for="(item, index) in floorData.slice(1)" :key="index">
          <img :src="item.image" alt="" width="100%" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  // vda+回车
  data() {
    return {
      floorData0: {},
      floorData1: {},
      floorData2: {},
    };
  },
  props:['floorData','floorTitle'],
  created(){
//因为用的axios，所有在页面加载完之后数据还没有引用过来就会报错
  },
  watch:{
      floorData:function(val){
          console.log(this.floorData);
          this.floorData0=this.floorData[0]
          this.floorData1=this.floorData[1]
          this.floorData2=this.floorData[2]
      }
  }
};
</script>

<style lang="less" scoped>
.floor {
  .floor-anomaly {
    display: flex;
    border-bottom: 1px solid #eee;
    // background-color: pink;
    div {
      width: 10rem;
      box-sizing: border-box;
      -webkit-box-sizing: border-box;
    }
    .floor-one {
      border-right: 1px solid #eee;
    }
    .floor-two {
      border-bottom: 1px solid #eee;
    }
  }
  .floor-rule {
    display: flex;
    flex-wrap: wrap;
    // width: 10rem;
    div {
      //  width: 10rem;
      border-right: 1px solid #eee;
      // box-sizing 属性可以被用来调整这些表现:content-box  是默认值。
      //如果你设置一个元素的宽为100px，那么这个元素的内容区会有100px宽，
      //并且任何边框和内边距的宽度都会被增加到最后绘制出来的元素宽度中。
      width: 10rem;
      box-sizing: border-box; //怪异盒模型
      -webkit-box-sizing: border-box;
      border-bottom: 1px solid #eee;
    }
  }
}
.floor-title{
    text-align: center;
    font-size: 14px;
    height: 1.8rem;
    color: #cc99cc;
    font-weight: bold;
    line-height: 1.8rem;
    border-bottom: 1px solid #eee;
}
</style>