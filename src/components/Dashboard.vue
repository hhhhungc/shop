<template>
  <el-container>
    <el-header>
      <ul class="list-unstyled">
        <li>
          <router-link class="nav_title" to="/"> BUY SOMETHING </router-link>
        </li>
        <li>
          <router-link to="/products"> 產品列表 </router-link>
        </li>
        <li>
          <router-link to="/orders"> 訂單列表 </router-link>
        </li>
      </ul>
      <ul class="list-unstyled">
        <li class="cart">
          <span class="cart_num">0</span>
          <router-link to="/cart">
            购物车<span class="iconfont icon-cartfill"></span>
          </router-link>
        </li>
        <li>
          <router-link to="/login">
            登入<i class="el-icon-user-solid"></i>
          </router-link>
        </li>
        <li>
          <router-link to="/admin">
            管理员<i class="el-icon-user-solid"></i>
          </router-link>
        </li>
      </ul>
    </el-header>
    <el-main>
      <router-view></router-view>
    </el-main>
    <el-footer>
      本网站所有内容及资料全部来自网路，仅供网页开发练习使用，若有侵权请告知。
    </el-footer>
  </el-container>
</template>

<script>
export default {
  name: 'NavbarComponent',
  data() {
    return {}
  },
  methods: {
    checkLogin() {
      this.$http.post('api/user/check').then((res) => {
        console.log('@@', res.data.success)
      })
    }
  },
  created() {
    this.checkLogin()
  }
}
</script>

<style lang="scss" scoped>
.nav_title {
  padding-right: 20px;
  font-size: 20px;
}
.nav_title:hover {
  color: #f0f0f0;
}
ul {
  display: flex;
  align-items: center;
}
li {
  padding: 0 20px;
  font-size: 14px;
}
a {
  color: #f0f0f0;
  &:hover {
    color: #999;
  }
}
.cart {
  position: relative;
  padding-right: 20px;
  border-right: 1px solid #f0f0f0;
}
.cart_num {
  position: absolute;
  background: #f56c6c;
  color: #fff;
  top: -10px;
  left: 72px;
  padding: 2px 6px;
  font-size: 4px;
  border-radius: 100%;
}
.el-main {
  padding: 0;
}
.el-footer {
  font-size: 14px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-top: 1px solid #eee;
  padding: 10px 0;
  color: #999;
}
</style>
