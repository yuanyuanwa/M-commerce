// vbase
<template>
  <div>
    <swiper>
      <swiper-slide v-for="(item,index) in slide" :key='index'>{{item}}</swiper-slide>
    </swiper>
  </div>
</template>

<script>
import "swiper/swiper-bundle.css";
import { Swiper, SwiperSlide, directive } from "vue-awesome-swiper";
export default {
  // vdata
  data() {
    return {
      slide: [1, 2, 3, 4, 5],
    };
  },
  components: {
    Swiper,
    SwiperSlide,
  },
  directives: {
    swiper: directive,
  }
};
</script>

<style lang="less" scoped>
.swiper-slide {
  height: 4rem;
  text-align: center;
  padding-top: .3em;
  border-bottom:1px solid #eee ;
}
</style>