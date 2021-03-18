import Vue from 'vue'
import Router from 'vue-router'
//@符号就代表src目录
import ShoppingMail from '@/components/pages/ShoppingMail'
import S from '@/components/swiper/swiperDefault2'
import Register from '@/components/pages/Register'
import Login from '@/components/pages/Login'
import Goods from '@/components/pages/Goods'
import CategoryList from '@/components/pages/CategoryList'
import Cart from '@/components/pages/Cart'
import Main from '@/components/pages/Main'
import Vip from '@/components/pages/Vip'




Vue.use(Router)

export default new Router({
  routes: [
    { path: '/',name: 'Main',component: Main,
    children:[
      { path: '/',name: 'ShoppingMail',component: ShoppingMail},
      { path: '/categorylist',name: 'CategoryList',component: CategoryList},
      { path: '/cart',name: 'Cart',component: Cart},
      { path: '/vip',name: 'Vip',component: Vip},
    ]
  },
   
    { path: '/register',name: 'Register',component: Register},
    { path: '/login',name: 'Login',component: Login},
    { path: '/goods',name: 'Goods',component: Goods},
    
    
    { path: '/b',name: 'ww',component: S},

  ]
})
