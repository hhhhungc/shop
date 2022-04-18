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
      <div v-if="active === 0">
        <el-table :data="cart.carts" stripe empty-text="购物车内无商品">
          <el-table-column align="center" width="100px">
            <template slot-scope="scope">
              <el-button
                type="danger"
                icon="el-icon-delete"
                size="mini"
                circle
                @click="removeCartItem(scope.row.id)"
              ></el-button>
            </template>
          </el-table-column>
          <el-table-column label="产品" align="center">
            <template slot-scope="scope">
              <el-image
                style="width: 160px; height: 160px"
                :src="scope.row.product.imageUrl"
                :alt="scope.row.product.title"
                :title="scope.row.product.title"
              ></el-image>
            </template>
          </el-table-column>
          <el-table-column>
            <template slot-scope="scope">
              <router-link :to="`/product?id=${scope.row.product.id}`">{{
                scope.row.product.title
              }}</router-link>
            </template>
          </el-table-column>
          <el-table-column
            prop="total"
            label="单价"
            align="center"
            width="100px"
          >
            <template slot-scope="scope">{{
              scope.row.total | currency
            }}</template>
          </el-table-column>
          <el-table-column prop="qty" label="数量" align="center" width="100px">
          </el-table-column>
          <el-table-column
            prop="final_total"
            label="总价"
            align="center"
            width="100px"
          >
            <template slot-scope="scope">{{
              scope.row.final_total | currency
            }}</template>
          </el-table-column>
        </el-table>
        <el-row type="flex" justify="space-between">
          <el-col :span="8">
            <el-input
              :placeholder="couponPlaceholder"
              v-model="coupon"
              class="input-with-select"
              :disabled="cart.total !== cart.final_total"
            >
              <el-button
                slot="append"
                @click="addCoupon"
                :disabled="cart.total !== cart.final_total"
                >{{
                  cart.total !== cart.final_total ? '已使用' : '使用'
                }}</el-button
              >
            </el-input>
          </el-col>
          <el-col :span="8">
            <ul class="list-unstyled">
              <li>
                总金额
                <p>{{ cart.total | currency }}</p>
              </li>
              <li>
                折扣金额
                <p>{{ cart.final_total - cart.total }}</p>
              </li>
              <li class="border-top">
                最后金额
                <p>{{ cart.final_total | currency }}</p>
              </li>
            </ul>
          </el-col>
        </el-row>
      </div>

      <div v-if="active === 1">
        <el-form
          ref="userFormRef"
          :model="form.user"
          label-width="100px"
          :rules="userFormRules"
        >
          <el-form-item label="收件人姓名" prop="name">
            <el-input v-model="form.user.name"></el-input>
          </el-form-item>
          <el-form-item label="收件人电话" prop="tel">
            <el-input v-model="form.user.tel"></el-input>
          </el-form-item>
          <el-form-item label="收件人邮箱" prop="email">
            <el-input v-model="form.user.email"></el-input>
          </el-form-item>
          <el-form-item label="收件人地址" prop="address">
            <el-input v-model="form.user.address"></el-input>
          </el-form-item>
          <el-form-item label="留言">
            <el-input type="textarea" v-model="form.message"></el-input>
          </el-form-item>
        </el-form>
      </div>

      <div class="cart_btn">
        <el-button @click="active--" type="primary" :disabled="active === 0"
          >上一步</el-button
        >
        <el-button @click="nextStep" type="primary">下一步</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
export default {
  name: 'CartPage',
  data() {
    const checkEmail = (rule, value, cb) => {
      const reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-]{2,4})$/
      if (reg.test(value)) {
        return cb()
      } else {
        cb(new Error('请输入合法的邮箱'))
      }
    }
    return {
      active: 0,
      // cart: {},
      coupon: '',
      form: {
        user: {
          name: 'ruby',
          email: 'aaa@aa.aa',
          tel: '12345678',
          address: 'shanghai'
        },
        message: ''
      },
      userFormRules: {
        name: [
          { required: true, message: '请输入收件人姓名', trigger: 'blur' }
        ],
        tel: [{ required: true, message: '请输入收件人电话', trigger: 'blur' }],
        email: [
          { required: true, message: '请输入收件人邮箱', trigger: 'blur' },
          { validator: checkEmail, trigger: 'blur' }
        ],
        address: [
          { required: true, message: '请输入收件人地址', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    ...mapActions('cartModule', ['getCart', 'removeCartItem']),
    // getCart() {
    //   this.$http.get('api/ruby/cart').then((res) => {
    //     if (!res.data.success) {
    //       return this.$message.error('获取购物车列表失败')
    //     } else {
    //       this.carts = res.data.data.carts
    //       this.cart = res.data.data
    //     }
    //   })
    // },
    // removeCartItem(id) {
    //   this.$http.delete(`api/ruby/cart/${id}`).then((res) => {
    //     if (!res.data.success) {
    //       return this.$message.error('删除购物车商品失败')
    //     } else {
    //       this.$message.success('购物车商品已删除')
    //       this.getCart()
    //     }
    //   })
    // },
    addCoupon() {
      this.$http
        .post('api/ruby/coupon', { data: { code: this.coupon } })
        .then((res) => {
          if (!res.data.success) {
            return this.$message.error(res.data.message)
          } else {
            this.$message.success(res.data.message)
            this.getCart()
          }
        })
    },
    nextStep() {
      if (this.active === 0) {
        if (this.cart.carts.length === 0) {
          return this.$message.info('购物车内无商品')
        }
        this.active++
      } else if (this.active === 1) {
        this.$refs.userFormRef.validate((valid) => {
          if (!valid) return
          this.$http.post('api/ruby/order', { data: this.form }).then((res) => {
            if (!res.data.success) {
              return this.$message('成立订单失败')
            } else {
              this.$store.dispatch('cartModule/getCart')
              this.$router.push(`/checkout?id=${res.data.orderId}`)
            }
          })
        })
      }
    }
  },
  computed: {
    couponPlaceholder() {
      return this.cart.total === this.cart.final_total
        ? '请输入优惠码'
        : '已使用优惠码'
    },
    ...mapState('cartModule', ['cart'])
  },
  created() {
    this.getCart()
  }
}
</script>

<style lang="scss" scoped>
.el-table {
  margin-bottom: 20px;
}
.cart_btn {
  display: flex;
  justify-content: center;
}
.el-card ul li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
  p {
    letter-spacing: 2px;
  }
}
.border-top {
  border-top: 1px solid #eee;
}
.el-form {
  max-width: 500px;
  margin: 40px auto;
}
</style>
