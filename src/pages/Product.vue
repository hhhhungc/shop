<template>
  <div class="container">
    <el-row :gutter="20">
      <el-col :span="12">
        <div class="image">
          <img
            :src="product.imageUrl"
            class="rounded cover-fit"
            :alt="product.title"
          />
        </div>
      </el-col>
      <el-col :span="12">
        <div class="text">
          <ul class="list-unstyled">
            <li>
              <h2>{{ product.title }}</h2>
            </li>
            <li>
              <small>{{ product.content }}</small>
            </li>
            <li><el-divider></el-divider></li>
            <li class="cate">分類 : {{ product.category }}</li>
            <li class="price">{{ product.price | currency }}</li>
            <li><el-divider></el-divider></li>
          </ul>
          <div class="text_btn">
            <el-input-number v-model="num" :min="1" :max="10" label="商品数量">
            </el-input-number>
            <el-button type="primary" @click="addToCart">加入購物車</el-button>
          </div>
        </div>
      </el-col>
      <el-col class="bottom">
        <el-tabs type="border-card" stretch style="min-height: 300px">
          <el-tab-pane label="商品描述">{{ product.description }}</el-tab-pane>
          <el-tab-pane label="退换或须知">
            <ul>
              <li>
                商品到貨享十天猶豫期之權益，辦理退貨商品必須是全新狀態且包裝完整，商品一經拆封，等同商品價值已受損，僅能以福利品出售，若需退換貨，我方須收取價值損失之費用(回復原狀、整新費)，請先確認商品正確、外觀可接受，再行開機/使用，以免影響您的權利，祝您購物順心。
              </li>
              <li>
                個人衛生用品除商品本身有瑕疵外，未拆封商品仍享有十天猶豫期之退貨權利。但已拆封
                (如剪標、下水等情形…)，本公司無法接受退換貨。
              </li>
            </ul>
          </el-tab-pane>
          <el-tab-pane label="常见问答">
            <ol>
              <li>
                <b>訂單可以免運費嗎？</b><br />
                會員的所有訂單都可享受免費的普通達配送服務。普通達配送的訂單通常會在
                3-6 天內送達。
              </li>
              <li>
                <b>訂單如何退貨？</b><br />
                掃描商品外包裝箱側面 /
                黑色外包裝袋上的「官網退換貨」二維碼，或者直接掃碼下圖二維碼，開啟退貨。
              </li>
              <li>
                <b>訂單如何退貨？</b><br />
                要獲得訂單的退款，您首先要辦理退貨。收到並處理了您的退貨後，如果退貨成功，我們將立即處理您的退款。在我們處理退款時，您會收到電子郵件通知。
              </li>
              <li>
                <b>如何找到適合您的尺碼？</b><br />
                我們的尺碼表可以就您所選擇的男鞋、女鞋、服裝、配件來幫您確定合適的尺碼。點擊產品詳情頁面所顯示的「尺碼表」。
              </li>
            </ol>
          </el-tab-pane>
        </el-tabs>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'ProductPage',
  data() {
    return {
      product: {},
      num: 1
    }
  },
  methods: {
    getProduct(id) {
      this.$http.get(`api/ruby/product/${id}`).then((res) => {
        if (!res.data.success) {
          return this.$message.error('获取商品资料失败')
        } else {
          this.product = res.data.product
        }
      })
    },
    addToCart() {
      this.$store.dispatch('cartModule/addToCart', {
        id: this.product.id,
        qty: this.num
      })
      // const cart = {
      //   product_id: this.product.id,
      //   qty: this.num
      // }

      // this.$http.post('api/ruby/cart', { data: cart }).then((res) => {
      //   if (res.data.message !== '已加入購物車') {
      //     return this.$message.error('加入购物车失败')
      //   } else {
      //     this.$message.success('商品已加入购物车')
      //   }
      // })
    }
  },
  created() {
    this.getProduct(this.$route.query.id)
  }
}
</script>

<style lang="scss" scoped>
.image {
  height: 400px;
  border-radius: 4px;
  overflow: hidden;
}
.text {
  width: calc(100% - 80px);
  margin: 0 40px;
  li {
    padding-bottom: 8px;
  }
  h2 {
    margin: 12px 0;
  }
  small {
    color: #888;
    font-size: 14px;
  }
  .cate {
    font-size: 16px;
  }
  .price {
    color: #409eff;
    font-weight: bold;
    margin-top: 8px;
  }
}
.text_btn {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.bottom {
  margin: 40px 0;
  li {
    padding-bottom: 20px;
  }
}
.el-tab-pane {
  font-size: 16px;
}
</style>
