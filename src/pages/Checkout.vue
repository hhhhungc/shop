<template>
  <div class="container">
    <div class="step">
      <el-steps :active="active" finish-status="success" align-center>
        <el-step title="确认订单"></el-step>
        <el-step title="付款资讯"></el-step>
        <el-step title="确认付款"></el-step>
        <el-step title="付款完成"></el-step>
      </el-steps>
    </div>
    <el-card>
      <div class="content">
        <el-row type="flex" justify="center">
          <el-col :span="8"><strong>订单总金额</strong></el-col>
          <el-col :span="16">{{ order.total | currency }}</el-col>
        </el-row>
        <el-row type="flex" justify="center">
          <el-col :span="8"><strong>订单成立时间</strong></el-col>
          <el-col :span="16">{{ order.create_at | date }}</el-col>
        </el-row>
        <el-row type="flex" justify="center">
          <el-col :span="8"><strong>收件人姓名</strong></el-col>
          <el-col :span="16">{{ order.user.name }}</el-col>
        </el-row>
        <el-row type="flex" justify="center">
          <el-col :span="8"><strong>收件人Email</strong></el-col>
          <el-col :span="16">{{ order.user.email }}</el-col>
        </el-row>
        <el-row type="flex" justify="center">
          <el-col :span="8"><strong>收件人电话</strong></el-col>
          <el-col :span="16">{{ order.user.tel }}</el-col>
        </el-row>
        <el-row type="flex" justify="center">
          <el-col :span="8"><strong>收件人地址</strong></el-col>
          <el-col :span="16">{{ order.user.address }}</el-col>
        </el-row>
        <el-row v-if="order.message" type="flex" justify="center">
          <el-col :span="8"><strong>留言</strong></el-col>
          <el-col :span="16">{{ order.message }}</el-col>
        </el-row>
        <el-row type="flex" justify="center">
          <el-col :span="8"><strong>付款狀態</strong></el-col>
          <el-col :span="16">
            <el-tag type="danger" v-if="!order.is_paid">尚未付款</el-tag>
            <el-tag type="primary" v-else>付款完成</el-tag>
          </el-col>
        </el-row>
      </div>
      <div class="cart_btn" v-if="!order.is_paid">
        <el-button @click="payOrder" type="primary">确认付款</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'CheckouutPage',
  data() {
    return {
      active: 2,
      orderId: '',
      order: {
        user: {}
      }
    }
  },
  methods: {
    getOrder() {
      this.$http.get(`api/ruby/order/${this.orderId}`).then((res) => {
        if (!res.data.success) {
          return this.$message.error('获取订单资料失败')
        } else {
          this.order = res.data.order
          if (res.data.order.is_paid) {
            this.active = 4
          }
        }
      })
    },
    payOrder() {
      this.$http.post(`api/ruby/pay/${this.orderId}`).then((res) => {
        if (!res.data.success) {
          return this.$message.error('订单付款失败')
        } else {
          this.getOrder()
          this.$message.success('订单付款完成')
          this.active = 4
        }
      })
    }
  },
  created() {
    this.orderId = this.$route.query.id
    this.getOrder()
  }
}
</script>

<style lang="scss" scoped>
.el-row {
  padding: 20px 10px;
  font-size: 16px;
  border-bottom: 1px solid #eee;
}
.content {
  max-width: 500px;
  margin: 0 auto 40px;
}
.cart_btn {
  display: flex;
  justify-content: center;
}
</style>
