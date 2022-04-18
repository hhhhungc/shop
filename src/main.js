import Vue from 'vue'
import App from './App.vue'
import './plugins/element.js'
import './assets/css/global.scss'
import router from './router'
// 引入 filter
import date from './filters/date'
import currency from './filters/currency'
// 引入 store
import store from './store'
// axios
import axios from 'axios'
// import { Loading } from 'element-ui'
axios.defaults.baseURL = 'https://vue-course-api.hexschool.io/'
// axios.interceptors.request.use((config) => {
//   Loading.service()
//   return config
// })
// axios.interceptors.response.use((config) => {
//   Loading.service().close()
//   return config
// })
Vue.prototype.$http = axios
Vue.config.productionTip = false

Vue.filter('date', date)
Vue.filter('currency', currency)
new Vue({
  el: '#app',
  router,
  store,
  render: (h) => h(App)
})
