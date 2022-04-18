<template>
  <div>
    <el-row>
      <el-col>
        <el-button type="primary" @click="openDialog(true)">添加商品</el-button>
      </el-col>
    </el-row>
    <el-table :data="products" border stripe>
      <el-table-column label="#" type="index"></el-table-column>
      <el-table-column label="分类" prop="category"></el-table-column>
      <el-table-column label="产品名称" prop="title"></el-table-column>
      <el-table-column label="售价" prop="price">
        <template slot-scope="scope">
          {{ scope.row.price | currency }}
        </template>
      </el-table-column>
      <el-table-column label="是否启用" prop="is_enabled">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.is_enabled" size="mini">是</el-tag>
          <el-tag v-else type="danger" size="mini">否</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="200px">
        <template slot-scope="scope">
          <el-button
            type="primary"
            icon="el-icon-edit"
            size="mini"
            @click="openDialog(false, scope.row)"
            >编辑</el-button
          >
          <el-button
            type="danger"
            icon="el-icon-delete"
            size="mini"
            @click="removeItem(scope.row.id)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <Pagination :pagination="pagination" @updatePage="getProducts" />

    <el-dialog
      :title="dialogTitle"
      :visible.sync="dialogVisible"
      width="50%"
      @close="dialogClose"
    >
      <el-form
        ref="formRef"
        :model="tempProduct"
        :rules="formRules"
        label-width="100px"
      >
        <el-row type="flex" justify="center">
          <el-col :span="20">
            <el-form-item label="商品名称" prop="title">
              <el-input v-model="tempProduct.title"></el-input>
            </el-form-item>
            <el-form-item label="商品分类" prop="category">
              <el-input v-model="tempProduct.category"></el-input>
            </el-form-item>
            <el-form-item label="商品单位" prop="unit">
              <el-input v-model="tempProduct.unit"></el-input>
            </el-form-item>
            <el-form-item label="商品原价" prop="origin_price">
              <el-input v-model="tempProduct.origin_price" type="number">
              </el-input>
            </el-form-item>
            <el-form-item label="商品售价" prop="price">
              <el-input v-model="tempProduct.price" type="number"></el-input>
            </el-form-item>
            <el-form-item label="商品描述" prop="description">
              <el-input v-model="tempProduct.description" type="textarea">
              </el-input>
            </el-form-item>
            <el-form-item label="商品内容" prop="content">
              <el-input v-model="tempProduct.content" type="textarea">
              </el-input>
            </el-form-item>
            <el-form-item label="是否启用" prop="is_enabled">
              <el-radio-group v-model="tempProduct.is_enabled">
                <el-radio :label="1">是</el-radio>
                <el-radio :label="0">否</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="图片网址">
              <el-input
                v-model="tempProduct.imageUrl"
                placeholder="请输入图片连结"
              ></el-input>
            </el-form-item>
            <el-form-item label="或上傳圖片">
              <input type="file" ref="files" @change="uploadFile" />
              <el-button type="text" :loading="fileUploading"></el-button>
            </el-form-item>
            <div class="preview_image" v-if="tempProduct.imageUrl">
              <img :src="tempProduct.imageUrl" class="cover-fit" alt="image" />
            </div>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="updataProduct">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import Pagination from '../../components/Pagination.vue'

export default {
  name: 'AdminProducts',
  components: { Pagination },
  data() {
    return {
      products: [],
      pagination: {},
      tempProduct: {},
      isNew: false,
      dialogVisible: false,
      dialogTitle: '商品',
      formRules: {
        title: [{ required: true, message: '请输入商品名称', trigger: 'blur' }],
        category: [
          { required: true, message: '请输入商品分类', trigger: 'blur' }
        ],
        unit: [{ required: true, message: '请输入商品单位', trigger: 'blur' }],
        origin_price: [
          { required: true, message: '请输入商品原价', trigger: 'blur' }
        ],
        price: [{ required: true, message: '请输入商品售价', trigger: 'blur' }],
        description: [
          { required: true, message: '请输入商品描述', trigger: 'blur' }
        ],
        content: [
          { required: true, message: '请输入商品内容', trigger: 'blur' }
        ],
        is_enabled: [
          { required: true, message: '请选择是否启用', trigger: 'blur' }
        ]
      },
      fileUploading: false
    }
  },
  methods: {
    getProducts(page = 1) {
      this.$http.get(`api/ruby/admin/products?page=${page}`).then((res) => {
        if (!res.data.success) {
          return this.$message.error('获取商品列表失败')
        } else {
          this.products = res.data.products
          this.pagination = res.data.pagination
        }
      })
    },
    openDialog(isNew, row) {
      if (isNew) {
        this.tempProduct = {}
        this.isNew = true
        this.dialogTitle = '添加商品'
      } else {
        this.tempProduct = row
        this.isNew = false
        this.dialogTitle = '编辑商品'
      }
      this.dialogVisible = true
    },
    updataProduct() {
      this.$refs.formRef.validate((valid) => {
        if (!valid) return

        if (this.isNew) {
          this.$http
            .post('api/ruby/admin/product', {
              data: this.tempProduct
            })
            .then((res) => {
              if (!res.data.success) {
                return this.$message.error('添加商品失败')
              } else {
                this.dialogVisible = false
                this.getProducts()
                this.$message.success('添加商品成功')
              }
            })
        } else {
          this.$http
            .put(`api/ruby/admin/product/${this.tempProduct.id}`, {
              data: this.tempProduct
            })
            .then((res) => {
              if (!res.data.success) {
                return this.$message.error('编辑商品失败')
              } else {
                this.dialogVisible = false
                this.$message.success('编辑商品成功')
                this.getProducts()
              }
            })
        }
      })
    },
    uploadFile() {
      const uploadedFile = this.$refs.files.files[0]
      const formdata = new FormData()
      formdata.append('file-to-upload', uploadedFile)
      this.fileUploading = true
      this.$http
        .post(`/api/ruby/admin/upload`, formdata, {
          headers: {
            'Content-type': 'multipart/form-data'
          }
        })
        .then((res) => {
          this.fileUploading = false
          if (!res.data.success) {
            this.$message.error(res.data.message)
          } else {
            this.$set(this.tempProduct, 'imageUrl', res.data.imageUrl)
          }
        })
    },
    removeItem(id) {
      this.$confirm('此操作将永久删除该商品, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$http.delete(`api/ruby/admin/product/${id}`).then((res) => {
            if (!res.data.success) {
              return this.$message.error('删除商品失败')
            } else {
              this.getProducts()
              this.$message.success('删除成功!')
            }
          })
        })
        .catch(() => {
          this.$message.info('已取消删除')
        })
    },
    dialogClose() {
      this.$refs.formRef.resetFields()
    }
  },
  created() {
    this.getProducts()
  }
}
</script>

<style lang="scss" scoped>
.el-table {
  margin-top: 20px;
}
.preview_image {
  width: 200px;
  height: 200px;
  padding-left: 100px;
}
</style>
