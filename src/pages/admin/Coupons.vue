<template>
  <div>
    <el-row>
      <el-col>
        <el-button type="primary" @click="openDialog(true)">
          添加优惠码
        </el-button>
      </el-col>
    </el-row>
    <el-table :data="coupons" border stripe>
      <el-table-column type="index" lavel="#"></el-table-column>
      <el-table-column label="名称" prop="code"></el-table-column>
      <el-table-column label="折扣百分比" prop="percent"></el-table-column>
      <el-table-column label="到期日" prop="due_date">
        <template slot-scope="scope">
          {{ scope.row.due_date | date }}
        </template>
      </el-table-column>
      <el-table-column label="是否启用" prop="is_enabled">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.is_enabled" size="mini">是</el-tag>
          <el-tag v-else type="danger" size="mini">否</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="150px">
        <template slot-scope="scope">
          <el-button
            type="primary"
            icon="el-icon-edit"
            size="mini"
            @click="openDialog(false, scope.row)"
          ></el-button>
          <el-button
            type="danger"
            icon="el-icon-delete"
            size="mini"
            @click="removeItem(scope.row.id)"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>

    <Pagination :pagination="pagination" @updatePage="getCoupons" />

    <el-dialog
      :title="dialogTitle"
      :visible.sync="dialogVisible"
      width="50%"
      @close="dialogClose"
    >
      <el-form
        ref="formRef"
        :model="tempCoupon"
        :rules="formRules"
        label-width="100px"
      >
        <el-row type="flex" justify="center">
          <el-col :span="20">
            <el-form-item label="优惠码名称" prop="title">
              <el-input v-model="tempCoupon.title"></el-input>
            </el-form-item>
            <el-form-item label="优惠码" prop="code">
              <el-input v-model="tempCoupon.code"></el-input>
            </el-form-item>
            <el-form-item label="到期日" prop="due_date">
              <el-date-picker
                style="width: 100%"
                v-model="due_date"
                type="date"
                placeholder="选择日期"
              >
              </el-date-picker>
            </el-form-item>
            <el-form-item label="百分比" prop="percent">
              <el-input v-model="tempCoupon.percent"></el-input>
            </el-form-item>
            <el-form-item label="是否启用" prop="is_enabled">
              <el-radio-group v-model="tempCoupon.is_enabled">
                <el-radio :label="1">是</el-radio>
                <el-radio :label="0">否</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="updataCoupon">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import Pagination from '../../components/Pagination.vue'

export default {
  name: 'AdminCoupons',
  components: { Pagination },
  data() {
    return {
      coupons: [],
      pagination: {},
      tempCoupon: {
        title: '',
        is_enabled: 0,
        percent: 100,
        due_date: 0,
        code: ''
      },
      due_date: new Date(),
      isNew: false,
      dialogVisible: false,
      dialogTitle: '',
      formRules: {
        title: [
          { required: true, message: '请输入优惠码名称', trigger: 'blur' }
        ],
        code: [{ required: true, message: '请输入优惠码', trigger: 'blur' }],
        is_enabled: [
          { required: true, message: '请选择是否启用', trigger: 'blur' }
        ],
        percent: [{ required: true, message: '请输入百分比', trigger: 'blur' }],
        due_date: [
          { required: true, message: '请输入优惠码到期日', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    getCoupons(page = 1) {
      this.$http.get(`api/ruby/admin/coupons?page=${page}`).then((res) => {
        if (!res.data.success) {
          return this.$message.error('获取优惠码列表失败')
        } else {
          this.coupons = res.data.coupons
          this.pagination = res.data.pagination
        }
      })
    },
    openDialog(isNew, row) {
      if (isNew) {
        this.tempCoupon = {}
        this.isNew = true
        this.dialogTitle = '添加优惠码'
      } else {
        this.tempCoupon = row
        this.isNew = false
        this.dialogTitle = '编辑优惠码'
      }
      this.dialogVisible = true
    },
    updataCoupon() {
      this.$refs.formRef.validate((valid) => {
        if (!valid) return

        if (this.isNew) {
          this.$http
            .post('api/ruby/admin/coupon', {
              data: this.tempCoupon
            })
            .then((res) => {
              if (!res.data.success) {
                return this.$message.error('添加优惠码失败')
              } else {
                this.getCoupons()
                this.$message.success('添加优惠码成功')
                this.dialogVisible = false
              }
            })
        } else {
          this.$http
            .put(`api/ruby/admin/coupon/${this.tempCoupon.id}`, {
              data: this.tempCoupon
            })
            .then((res) => {
              if (!res.data.success) {
                return this.$message.error('编辑优惠码失败')
              } else {
                this.getCoupons()
                this.$message.success('编辑优惠码成功')
                this.dialogVisible = false
              }
            })
        }
      })
    },
    removeItem(id) {
      this.$confirm('此操作将永久删除该优惠码, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$http.delete(`api/ruby/admin/coupon/${id}`).then((res) => {
            if (!res.data.success) {
              return this.$message.error('删除优惠码失败')
            } else {
              this.$message.success('删除优惠码成功!')
              this.getCoupons()
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
    this.getCoupons()
  },
  watch: {
    due_date() {
      const timestamp = Math.floor(new Date(this.due_date) / 1000)
      this.tempCoupon.due_date = timestamp
    }
  }
}
</script>

<style lang="scss" scoped>
.el-table {
  margin-top: 20px;
}
</style>
