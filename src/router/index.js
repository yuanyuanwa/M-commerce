import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
//@符号就代表src目录
import ShoppingMail from '@/components/pages/ShoppingMail'
import S from '@/components/swiper/swiperDefault2'




Vue.use(Router)

export default new Router({
  routes: [
    { path: '/',name: 'ShoppingMail',component: ShoppingMail},
    { path: '/a',name: 'HelloWorld',component: HelloWorld},
    { path: '/b',name: 'ww',component: S},

  ]
})
