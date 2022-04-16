import Vue from 'vue'
import VueRouter from 'vue-router'
import axios from 'axios'
// 引入組件
import Navbar from '../components/Navbar'
import Home from '../pages/Home'
import Products from '../pages/Products'
import Product from '../pages/Product'
import Orders from '../pages/Orders'
import Checkout from '../pages/Checkout'
import Cart from '../pages/Cart'
import Login from '../pages/Login'
import Dashboard from '../pages/admin/Dashboard'
Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    {
      path: '/',
      component: Navbar,
      children: [
        { path: '/', component: Home },
        { path: '/products', component: Products },
        { path: '/product', component: Product },
        { path: '/orders', component: Orders },
        { path: '/cart', component: Cart },
        { path: '/checkout', component: Checkout }
      ]
    },
    { path: '/login', component: Login },
    {
      path: '/admin',
      component: Dashboard,
      meta: { isAuth: true },
      children: []
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.meta.isAuth) {
    axios.post('api/user/check').then((res) => {
      if (res.data.success) {
        next()
      } else {
        next({ path: 'login' })
      }
    })
  } else {
    next()
  }
})

export default router
