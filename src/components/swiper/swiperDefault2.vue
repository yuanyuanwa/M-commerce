<template>
  <div>
    <div class="swiper-container sw">
      <div class="swiper-wrapper">
        <div class="swiper-slide">Slide 1</div>
        <div class="swiper-slide">Slide 1</div>
        <div class="swiper-slide">Slide 2</div>
        <div class="swiper-slide">Slide 3</div>
        <div class="swiper-slide">Slide 1</div>
        <div class="swiper-slide">Slide 2</div>
        <div class="swiper-slide">Slide 3</div>
        <div class="swiper-slide">Slide 1</div>
        <div class="swiper-slide">Slide 2</div>
        <div class="swiper-slide">Slide 3</div>
      </div>
      <!-- 如果需要分页器 -->
      <div class="swiper-pagination" slot="pagination"></div>

      <!-- 如果需要导航按钮 -->
      <div class="swiper-button-prev" slot="button-prev"></div>
      <!--左箭头。如果放置在swiper-container外面，需要自定义样式。-->
      <div class="swiper-button-next" slot="button-next"></div>
      <!--右箭头。如果放置在swiper-container外面，需要自定义样式。-->
      <!-- 如果需要滚动条 -->
      <!-- <div class="swiper-scrollbar"></div> -->
    </div>
    <div style="height: 200px"></div>
  </div>
</template>

<script>
// import { Swiper, SwiperSlide, directive } from "vue-awesome-swiper";
import "swiper/swiper-bundle.min.css";
// import 'swiper/swiper.scss'
import Swiper2, { Navigation, Pagination, Autoplay } from "swiper"; // 这行代码很关键
Swiper2.use([Navigation, Pagination]); // 这行代码很关键
import Swiper from "swiper";
Swiper.use([Autoplay]);
export default {
  name: "",
  data() {
    return {};
  },

  mounted() {
    new Swiper(".sw", {
      // direction:'vertical',
      // slidesPerView:auto,
      // freeMode:true,
      mousewheel:true,
      direction: "vertical",
      loop: true,
      autoplay: {
        delay: 2000,
        stopOnLastSlide: false,
        disableOnInteraction: false,
      },
      pagination: {
        el: ".swiper-pagination",
        clickable: true, //允许分页点击跳转
      },
      scrollbar: ".swiper-scrollbar",
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
    });
  },
};
</script>
<style lang='less' scoped>
.swiper-slide {
  height: 4.7rem;
  // border-top: 1px solid #eee;
  // border-bottom: 1px solid #eee;
}
.swiper-container {
  width: 20rem;
  height: 10rem;
  margin: 1rem auto;
}
</style>