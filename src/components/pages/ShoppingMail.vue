//vba + 回车
<template>
<!-- 必须要有一个div包裹 -->
    <div>

        <div class="search-bar">
            <!-- vant是24格布局法 -->
        <van-row class="search-bar-row">
            <van-col span='3'>
                <img v-lazy="locationIcon" alt="" class="location">
            </van-col>
            
            <van-col span='16'>
                <input type="text">
            </van-col>
            <van-col span='5'>
                <van-button size="mini" class="search-button" >查找</van-button>
            </van-col>
        </van-row>
        </div>

        <div class="swiper-area">
            <van-swipe :autoplay='1000'>
                <van-swipe-item v-for='(banner,index) in bannerPicArray' :key="index"> 
                    <img v-lazy="banner.imageUrl" alt="" width="100%">
                </van-swipe-item>
            </van-swipe>
            <!-- <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
  <van-swipe-item>1</van-swipe-item>
  <van-swipe-item>2</van-swipe-item>
  <van-swipe-item>3</van-swipe-item>
  <van-swipe-item>4</van-swipe-item>
</van-swipe> -->
        </div>
        

    </div>
</template>

<script>
    export default {
        //vdata + 回车
        data() {
            return {
                msg: 'shopping',
                locationIcon:require('../../assets/images/location.png'),
              bannerPicArray:[
                {imageUrl:require('../../assets/images/banner1.png')},
                {imageUrl:require('../../assets/images/banner2.png')},
                {imageUrl:require('../../assets/images/banner3.png')},
            ]
            }
        },
    }
</script>

<style scoped lang='less'>
*{
    padding: 0px;
    margin: 0px;
}
.search-bar{
    height: 2.2rem;//1rem=16px
    padding: 0.25rem 0rem;
    background-color: #CC99CC;  
     line-height: 2.2rem;
     overflow: hidden;
        img{
            display: inline-block;
            margin-top: .5rem;
            height: 1.5rem;
            width: 1.5rem;
        }
        input{
            height: 1.3rem;
            border-top: 0px;
            border-left: 0px;
            border-right: 0px;
            border-bottom:1px #fff solid !important ;
            background:#CC99CC ;
            width: 100%;
            color: #fff;
        }
        .search-button{
            padding-top:.2rem;
            padding-left: .2rem;
            border-radius: 0.2rem;
            //  height: rem;
            width: 2.6rem;
            // width:3rem;
            // width: 50px;
            // line-height: 1rem;
        }
    
    
}
.swiper-area{
    clear: both;
    max-height: 20rem;
    overflow: hidden;
 
}

    
</style>