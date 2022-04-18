<template>
  <el-container class="admin_container">
    <el-header>
      <router-link class="nav_title" to="/">BUY SOMETHING</router-link>
      <el-button plain size="mini" @click="signout">登出</el-button>
    </el-header>
    <el-container>
      <el-aside width="200px">
        <el-menu
          default-active="2"
          class="el-menu-vertical-demo"
          background-color="#555555"
          text-color="#fff"
          active-text-color="#ffd04b"
        >
          <el-menu-item-group>
            <template slot="title">管理员</template>

            <router-link to="/admin/products">
              <el-menu-item>
                <i class="el-icon-s-goods"></i>商品列表
              </el-menu-item>
            </router-link>
            <router-link to="/admin/orders">
              <el-menu-item>
                <i class="el-icon-tickets"></i>订单列表
              </el-menu-item>
            </router-link>
            <router-link to="/admin/coupons">
              <el-menu-item>
                <i class="el-icon-s-ticket"></i>优惠码列表
              </el-menu-item>
            </router-link>
          </el-menu-item-group>
        </el-menu>
      </el-aside>
      <el-main><router-view></router-view></el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: 'AdminDashboard',
  methods: {
    signout() {
      this.$http.post('logout').then((res) => {
        if (res.data.success) {
          this.$router.push('/')
        }
      })
    }
  },
  created() {
    const token = document.cookie.replace(
      /(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/,
      '$1'
    )
    this.$http.defaults.headers.common['Authorization'] = token
  }
}
</script>

<style lang="scss" scoped>
.admin_container {
  height: 100vh;
}

.nav_title {
  padding: 0 20px;
  color: #f0f0f0;
  font-size: 20px;
}
.el-aside {
  background-color: #555;
}
.el-menu {
  border: transparent;
  i {
    color: #fff;
  }
}
.el-main {
  background-color: #eee;
}
</style>
