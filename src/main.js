import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/style/index.scss'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'

import { Pagination, Breadcrumb, BreadcrumbItem, DatePicker, Select, Option, Upload, Message } from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'vue2-animate/dist/vue2-animate.min.css'
import Schema from 'async-validator'
import VueQuillEditor from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import Loading from './components/Loading.vue'

Vue.component('Loading', Loading)

Vue.use(VueQuillEditor /* { default global options } */)
Vue.use(VueAwesomeSwiper /* { default options with global component } */)
Vue.use(Pagination)
Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)
Vue.use(DatePicker)
Vue.use(Select)
Vue.use(Option)
Vue.use(Upload)
Vue.config.productionTip = false
Vue.prototype.Schema = Schema
// 彈出框禁止滑動
Vue.prototype.noScroll = function () {
  const mo = function (e) { e.preventDefault() }
  document.body.style.overflow = 'hidden'
  document.addEventListener('touchmove', mo, false)// 禁止頁面滑動
}
// 彈出框可以滑動
Vue.prototype.canScroll = function () {
  const mo = function (e) {
    e.preventDefault()
  }
  document.body.style.overflow = '' // 出現滾動條
  document.removeEventListener('touchmove', mo, false)
}
Vue.prototype.imgs = 'http://f5point.twczw.website/'
Vue.prototype.$message = Message
Vue.filter('dateFormat', function (originVal) {
  const dt = new Date(originVal)
  const m = (dt.getMonth() + 1 + '')
  const d = (dt.getDate() + '')

  const hh = (dt.getHours() + '')
  const mm = (dt.getMinutes() + '')
  return ` ${m}月${d}日 ${hh}:${mm}`
})
Vue.filter('dateFormats', function (originVal) {
  const dt = new Date(originVal)

  const y = dt.getFullYear()
  const m = (dt.getMonth() + 1 + '').padStart(2, '0')
  const d = (dt.getDate() + '').padStart(2, '0')

  const hh = (dt.getHours() + '').padStart(2, '0')
  const mm = (dt.getMinutes() + '').padStart(2, '0')
  const ss = (dt.getSeconds() + '').padStart(2, '0')

  return `${y}年${m}月${d}日 ${hh}:${mm}:${ss}`
})
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
