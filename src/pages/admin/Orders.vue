<template>
  <div>
    <el-table :data="orders" border stripe>
      <el-table-column type="index" label="#" align="center"></el-table-column>
      <el-table-column
        prop="create_at"
        label="购买时间"
        align="center"
        width="100px"
      >
        <template slot-scope="scope">{{ scope.row.create_at | date }}</template>
      </el-table-column>
      <el-table-column
        prop="user.name"
        label="订购人"
        align="center"
        width="100px"
      ></el-table-column>
      <el-table-column label="购买商品" align="center">
        <template slot-scope="scope"
          ><ul class="list-unstyled">
            <li v-for="(product, key) in scope.row.products" :key="key">
              {{ product.product.title }} 數量：{{ product.qty }}
              {{ product.product.unit }}
            </li>
          </ul>
        </template>
      </el-table-column>
      <el-table-column
        prop="total"
        label="应付金额"
        align="center"
        width="100px"
      >
        <template slot-scope="scope"
          >{{ scope.row.total | currency }}
        </template>
      </el-table-column>
      <el-table-column
        prop="is_paid"
        label="是否付款"
        align="center"
        width="100px"
      >
        <template slot-scope="scope">
          <el-tag v-if="scope.row.is_paid" size="small">已付款</el-tag>
          <el-tag v-else type="danger" size="small">未付款</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="100px">
        <template slot-scope="scope"
          ><el-button type="primary" size="mini" @click="openDialog(scope.row)"
            >查看</el-button
          ></template
        >
      </el-table-column>
    </el-table>

    <Pagination :pagination="pagination" @updatePage="getOrders" />

    <el-dialog title="查看" :visible.sync="dialogVisible" width="50%">
      <div class="content">
        <el-row type="flex" justify="center">
          <el-col :span="8"><strong>订单总金额</strong></el-col>
          <el-col :span="16">{{ tempOrder.total | currency }}</el-col>
        </el-row>
        <el-row type="flex" justify="center">
          <el-col :span="8"><strong>订单成立时间</strong></el-col>
          <el-col :span="16">{{ tempOrder.create_at | date }}</el-col>
        </el-row>
        <el-row type="flex" justify="center">
          <el-col :span="8"><strong>收件人姓名</strong></el-col>
          <el-col :span="16">{{ tempOrder.user.name }}</el-col>
        </el-row>
        <el-row type="flex" justify="center">
          <el-col :span="8"><strong>收件人Email</strong></el-col>
          <el-col :span="16">{{ tempOrder.user.email }}</el-col>
        </el-row>
        <el-row type="flex" justify="center">
          <el-col :span="8"><strong>收件人电话</strong></el-col>
          <el-col :span="16">{{ tempOrder.user.tel }}</el-col>
        </el-row>
        <el-row type="flex" justify="center">
          <el-col :span="8"><strong>收件人地址</strong></el-col>
          <el-col :span="16">{{ tempOrder.user.address }}</el-col>
        </el-row>
        <el-row v-if="tempOrder.message" type="flex" justify="center">
          <el-col :span="8"><strong>留言</strong></el-col>
          <el-col :span="16">{{ tempOrder.message }}</el-col>
        </el-row>
        <el-row type="flex" justify="center">
          <el-col :span="8"><strong>付款狀態</strong></el-col>
          <el-col :span="16">
            <el-tag type="danger" v-if="!tempOrder.is_paid"> 尚未付款 </el-tag>
            <el-tag type="primary" v-else>付款完成</el-tag>
          </el-col>
        </el-row>
        <el-row v-if="tempOrder.is_paid" type="flex" justify="center">
          <el-col :span="8"><strong>付款时间</strong></el-col>
          <el-col :span="16">{{ tempOrder.paid_date | date }}</el-col>
        </el-row>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible = false">
          确定
        </el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import Pagination from '../../components/Pagination.vue'
export default {
  name: 'AdminOrders',
  components: { Pagination },
  data() {
    return {
      orders: [],
      tempOrder: {
        user: {}
      },
      pagination: {},
      dialogVisible: false
    }
  },
  methods: {
    getOrders(page = 1) {
      this.$http.get(`api/ruby/admin/orders?page=${page}`).then((res) => {
        if (!res.data.success) {
          return this.$message.error('获取订单资料失败')
        } else {
          this.orders = res.data.orders
          this.pagination = res.data.pagination
        }
      })
    },
    openDialog(row) {
      this.tempOrder = row
      this.dialogVisible = true
    },
    goCheckout(id) {
      this.$router.push(`/checkout?id=${id}`)
    }
  },
  created() {
    this.getOrders()
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
</style>
