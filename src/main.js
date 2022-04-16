import Vue from 'vue'
import App from './App.vue'
import './plugins/element.js'
import './assets/css/global.scss'
import router from './router'
import axios from 'axios'
// 引入 filter
import date from './filters/date'
import currency from './filters/currency'
axios.defaults.baseURL = 'https://vue-course-api.hexschool.io/'
Vue.prototype.$http = axios
Vue.config.productionTip = false

Vue.filter('date', date)
Vue.filter('currency', currency)
new Vue({
  el: '#app',
  router,
  render: (h) => h(App)
})
