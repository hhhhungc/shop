<template>
  <div>
    <div class="header">
      <div class="header_mask">
        <p>BUY SOMETHING NOW !!!</p>
      </div>
    </div>
    <div class="container">
      <el-row :gutter="20">
        <el-col :span="6">
          <ul class="list-unstyled">
            <li class="title">排序</li>
            <li>
              <el-button
                type="text"
                style="padding: 20px"
                :class="{ active: sortBy === 'price' && isReverse === false }"
                @click=";(sortBy = 'price'), (isReverse = false)"
              >
                商品价格由高至低
              </el-button>
            </li>
            <li>
              <el-button
                type="text"
                style="padding: 20px"
                :class="{ active: sortBy === 'price' && isReverse === true }"
                @click=";(sortBy = 'price'), (isReverse = true)"
              >
                商品价格由低至高
              </el-button>
            </li>
          </ul>
        </el-col>
        <el-col :span="18">
          <el-row :gutter="20">
            <el-col :span="12" v-for="item in filterDate" :key="item.id">
              <el-card :body-style="{ padding: '0px' }" shadow="hover">
                <div class="image">
                  <img
                    :src="item.imageUrl"
                    class="cover-fit"
                    :alt="item.title"
                    :title="item.title"
                  />
                </div>
                <div class="text">
                  <h4>{{ item.title }}</h4>
                  <p>$ {{ item.price }}</p>
                  <div class="btn">
                    <el-button
                      type="primary"
                      size="small"
                      plain
                      @click="goProductPage(item.id)"
                      >查看商品</el-button
                    >
                    <el-button
                      type="primary"
                      size="small"
                      plain
                      @click="addToCart(item.id)"
                      >加入购物车</el-button
                    >
                  </div>
                </div>
              </el-card>
            </el-col>
          </el-row>
          <Pagination :pagination="pagination" @updatePage="getProducts" />
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import Pagination from '../components/Pagination.vue'
export default {
  name: 'ProductsPage',
  components: { Pagination },
  data() {
    return {
      products: [],
      pagination: {},
      sortBy: '',
      isReverse: true
    }
  },
  methods: {
    getProducts(page = 1) {
      this.$http.get(`api/ruby/products?page=${page}`).then((res) => {
        if (!res.data.success) {
          return this.$message.error('获取商品资料失败')
        } else {
          this.products = res.data.products
          this.pagination = res.data.pagination
        }
      })
    },
    goProductPage(id) {
      this.$router.push(`/product?id=${id}`)
    },
    addToCart(id, qty = 1) {
      const cart = {
        product_id: id,
        qty
      }
      this.$http.post('api/ruby/cart', { data: cart }).then((res) => {
        if (res.data.message !== '已加入購物車') {
          return this.$message.error('加入购物车失败')
        } else {
          this.$message.success('商品已加入购物车')
        }
      })
    }
  },
  computed: {
    filterDate() {
      const sortBy = this.sortBy
      const newProducts = JSON.parse(JSON.stringify(this.products))
      const newData = newProducts.sort((a, b) => {
        a = a[sortBy]
        b = b[sortBy]
        if (this.isReverse) {
          return a - b
        } else {
          return b - a
        }
      })
      return newData
    }
  },
  created() {
    this.getProducts()
  }
}
</script>

<style lang="scss" scoped>
.header {
  width: 100%;
  height: 400px;
  background: url('https://dogefs.s3.ladydaily.com/~/source/unsplash/photo-1462927114214-6956d2fddd4e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1738&q=80')
    center center;
  background-size: cover;
  position: relative;
}
.header_mask {
  background: rgba(255, 255, 255, 0.6);
  width: 80%;
  padding: 30px;
  margin: 0;
  text-align: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  p {
    margin: 0;
    font-size: 60px;
    font-weight: bold;
  }
}
.list-unstyled li {
  text-align: center;
}
.title {
  // text-align: center;
  padding-bottom: 30px;
}
.active {
  border: 1px solid #409eff;
}
.el-card {
  margin-bottom: 20px;
}
.image {
  height: 200px;
  position: relative;
}
.text {
  padding: 16px 16px 20px;
  h4 {
    text-align: center;
    margin: 8px 0;
  }
  p {
    text-align: center;
    margin: 8px 0;
    color: #409eff;
    font-weight: bold;
  }
  .btn {
    text-align: center;
  }
}
</style>
