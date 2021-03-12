import Vue from 'vue'
import Router from 'vue-router'
//@符号就代表src目录
import ShoppingMail from '@/components/pages/ShoppingMail'
import S from '@/components/swiper/swiperDefault2'
import Register from '@/components/pages/Register'




Vue.use(Router)

export default new Router({
  routes: [
    { path: '/',name: 'ShoppingMail',component: ShoppingMail},
    { path: '/register',name: 'Register',component: Register},
    { path: '/b',name: 'ww',component: S},

  ]
})
