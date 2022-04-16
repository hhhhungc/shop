<template>
  <div>
    <el-menu
      :default-active="active"
      class="el-menu-demo"
      mode="horizontal"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
      router
    >
      <el-menu-item index="/">首頁</el-menu-item>
      <el-menu-item index="products">产品列表</el-menu-item>
      <el-menu-item index="orders">订单列表</el-menu-item>
      <el-menu-item index="cart">购物车</el-menu-item>
      <el-menu-item index="login"
        ><span class="iconfont icon-40one"></span>管理员登入</el-menu-item
      >
    </el-menu>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'NavbarComponent',
  data() {
    return {
      active: ''
    }
  },
  methods: {
    checkLogin() {
      this.$http.post('api/user/check').then((res) => {
        console.log('@@', res.data)
      })
    }
  },
  created() {
    // this.checkLogin()
  }
}
</script>

<style lang="scss" scoped>
.el-menu {
  padding-left: 40px;
}
.iconfont {
  margin-right: 4px;
}
.el-menu.el-menu--horizontal {
  border: none;
}
</style>
