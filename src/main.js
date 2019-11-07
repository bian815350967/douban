import Vue from 'vue'
import './cube-ui'
import App from './App.vue'
import router from './router'
import 'babel-polyfill' // 兼容旧浏览器
import {getHotData} from './api/getapi'
import VueLazyload from 'vue-lazyload'
// 引入nprogress
import NProgress from 'nprogress'
import 'nprogress/nprogress.css' // 这个样式必须引入

Vue.config.productionTip = false

Vue.prototype.$fetch = getHotData

Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: require('./assets/logo.png'),
  loading: require('./assets/logo.png'),
  attempt: 1
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

// 进度条
NProgress.configure({
  showSpinner: false,
  minimum: 0.6,
  easing: 'ease',
  speed: 200
})

router.beforeEach((to, from, next) => {
  NProgress.start()
  next()
})

router.afterEach((to, from, next) => {
  window.scrollTo(0, 0)
  NProgress.done()
})
