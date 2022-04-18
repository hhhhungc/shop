// 引入 Vue 核心庫
import Vue from 'vue'
// 引入 Vuex
import Vuex from 'vuex'
import axios from 'axios'
import cartModule from './cart'
import productModule from './product'
// 應用 Vuex 插件
Vue.use(Vuex)

// 創建並暴露 store
export default new Vuex.Store({
  actions: {
    checkLogin(context) {
      axios.post('api/user/check').then((res) => {
        if (!res.data.success) {
          context.commit('LOGIN', false)
        } else {
          context.commit('LOGIN', true)
        }
      })
    }
  },
  mutations: {
    LOGIN(state, value) {
      state.login = value
    }
  },
  state: {
    login: false
  },
  modules: {
    cartModule,
    productModule
  }
})
