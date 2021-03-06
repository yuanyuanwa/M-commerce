// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import {Tabbar,TabbarItem,Stepper,PullRefresh,Tab,Tabs,button,Row,Col,Swipe,SwipeItem ,Lazyload,List,Field,NavBar} from 'vant'

// import VueAwesomeSwiper from 'vue-awesome-swiper'
// import 'swiper/swiper-bundle.css'


Vue.use(Tabbar).use(TabbarItem).use(button).use(Row).use(Col).use(Swipe).use(SwipeItem).use(Lazyload).use(List).use(Field).use(NavBar).use(Tab).use(Tabs).use(PullRefresh).use(Stepper)
// Vue.use(VueAwesomeSwiper)

//引入vant第一种方法
// import vant from 'vant'
// // import 'vant/lib/vant-css/index.css'
// import 'vant/lib/index.css'
// Vue.use(vant)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
