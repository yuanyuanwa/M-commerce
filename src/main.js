// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import {button,Row,Col,Swipe,SwipeItem ,Lazyload} from 'vant'


Vue.use(button).use(Row).use(Col).use(Swipe).use(SwipeItem).use(Lazyload)

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
