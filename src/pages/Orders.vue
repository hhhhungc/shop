<template>
  <div class="container">
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
          ><el-button
            type="primary"
            size="mini"
            @click="goCheckout(scope.row.id)"
            >查看</el-button
          ></template
        >
      </el-table-column>
    </el-table>

    <Pagination :pagination="pagination" @updatePage="getOrders" />
  </div>
</template>

<script>
import Pagination from '../components/Pagination.vue'
export default {
  name: 'OrdersPage',
  components: { Pagination },
  data() {
    return {
      orders: [],
      tempOrder: {},
      pagination: {}
    }
  },
  methods: {
    getOrders(page = 1) {
      this.$http.get(`api/ruby/orders/?page=${page}`).then((res) => {
        if (!res.data.success) {
          return this.$message.error('获取订单资料失败')
        } else {
          this.orders = res.data.orders
          this.pagination = res.data.pagination
        }
      })
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
