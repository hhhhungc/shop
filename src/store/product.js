import axios from 'axios'
import { Message } from 'element-ui'
export default {
  namespaced: true,
  state: {
    products: [],
    pagination: {}
  },
  mutations: {
    PRODUCTS(state, value) {
      state.products = value
    },
    PAGINATION(state, value) {
      state.pagination = value
    }
  },
  actions: {
    getProducts(context, page) {
      axios.get(`api/ruby/products?page=${page}`).then((res) => {
        if (!res.data.success) {
          return Message.error('获取商品资料失败')
        } else {
          context.commit('PRODUCTS', res.data.products)
          context.commit('PAGINATION', res.data.pagination)
        }
      })
    }
  }
}
