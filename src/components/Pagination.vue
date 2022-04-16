<template>
  <div class="pagination">
    <el-pagination
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage"
      layout="prev, pager, next"
      :page-size="pageSize"
      :total="pagination.total_pages * pageSize"
    >
    </el-pagination>
  </div>
</template>

<script>
export default {
  name: 'PaginationComponent',
  props: ['pagination'],
  data() {
    return {
      pageSize: 10,
      currentPage: 1
    }
  },
  methods: {
    handleCurrentChange(page) {
      this.$emit('updatePage', page)
    }
  }
}
</script>

<style lang="scss" scoped>
.pagination {
  display: flex;
  justify-content: center;
  margin: 20px 0;
}
</style>
