import axios from 'axios'
import { Message } from 'element-ui'
export default {
  namespaced: true,
  state: {
    cart: {
      carts: []
    }
  },
  mutations: {
    CART(state, value) {
      state.cart = value
    }
  },
  actions: {
    getCart(context) {
      axios.get('api/ruby/cart').then((res) => {
        context.commit('CART', res.data.data)
      })
    },
    addToCart(context, { id, qty }) {
      const cart = {
        product_id: id,
        qty
      }
      axios.post('api/ruby/cart', { data: cart }).then((res) => {
        if (res.data.message !== '已加入購物車') {
          return Message.error('加入购物车失败')
        } else {
          Message.success('商品已加入购物车')
          context.dispatch('getCart')
        }
      })
    },
    removeCartItem(context, id) {
      axios.delete(`api/ruby/cart/${id}`).then((res) => {
        if (!res.data.success) {
          return Message.error('删除购物车商品失败')
        } else {
          Message.success('购物车商品已删除')
          context.dispatch('getCart')
        }
      })
    }
  }
}
