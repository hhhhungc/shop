import Vue from 'vue'
import VueRouter from 'vue-router'
import axios from 'axios'
// 引入組件
import Dashboard from '../components/Dashboard'
import Home from '../pages/Home'
import Products from '../pages/Products'
import Product from '../pages/Product'
import Orders from '../pages/Orders'
import Checkout from '../pages/Checkout'
import Cart from '../pages/Cart'
import Login from '../pages/Login'
import AdminDashboard from '../pages/admin/Dashboard'
import AdminHome from '../pages/admin/Home'
import AdminProducts from '../pages/admin/Products'
import AdminOrders from '../pages/admin/Orders'
import AdminCoupons from '../pages/admin/Coupons'
Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    {
      path: '/',
      component: Dashboard,
      children: [
        { path: '/', component: Home },
        { path: '/products', component: Products },
        { path: '/product', component: Product },
        { path: '/orders', component: Orders },
        { path: '/cart', component: Cart },
        { path: '/checkout', component: Checkout }
      ]
    },
    { path: '/login', component: Login, name: 'login' },
    {
      path: '/admin',
      component: AdminDashboard,
      meta: { isAuth: true },
      children: [
        {
          path: '/',
          component: AdminHome,
          meta: { isAuth: true }
        },
        {
          path: 'products',
          component: AdminProducts,
          meta: { isAuth: true }
        },
        {
          path: 'orders',
          component: AdminOrders,
          meta: { isAuth: true }
        },
        {
          path: 'coupons',
          component: AdminCoupons,
          meta: { isAuth: true }
        }
      ]
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.meta.isAuth) {
    axios.post('api/user/check').then((res) => {
      if (res.data.success) {
        next()
      } else {
        next({ name: 'login' })
      }
    })
  } else {
    next()
  }
})

export default router
