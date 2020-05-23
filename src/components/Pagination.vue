<template>
  <div class="pagination">
    <div class="container">
      <!-- <el-pagination
        background
        layout="prev, pager, next"
        :pager-count="5"
        :total="80">
      </el-pagination> -->
      <el-pagination
        background
        @current-change="handleCurrentChange"
        :page-size="pagesize"
        :current-page="currentpage"
        layout="prev, pager, next"
        :hide-on-single-page="isHidePage"
        :total="total"
        :pager-count="5"
        >
      </el-pagination>
    </div>
  </div>

</template>

<script>
export default {
  name: 'pagination',
  props: {
    total: Number,
    handleSizeChange: {
      type: Function,
      default: () => {}
    },
    pagesize: Number,
    currentpage: Number,
    handleCurrentChange: {
      type: Function,
      default: () => {}
    },
    isHidePage: Boolean
  },
  data () {
    return {
    }
  }
}
</script>

<style scoped lang='scss'>
.pagination {
  padding: 5rem 0 8.2rem 0;
  .container {
    display: flex;
    justify-content: center;
  }
  /deep/ .el-pagination.is-background .el-pager li:not(.disabled).active {
    color: #252427;
    border:.1rem solid #252427!important;
  }
  /deep/ .el-pagination.is-background .btn-next, /deep/ .el-pagination.is-background .btn-prev, /deep/ .el-pagination.is-background .el-pager li {
    width:5rem!important;
    height:5rem!important;
    background:rgba(255,255,255,1)!important;
    border-radius: 50%!important;
    border:.1rem solid rgba(210,210,210,1)!important;
  }
   /deep/ .el-pagination.is-background .btn-prev{
     margin-right: 3rem;
   }
   /deep/ .el-pagination .el-pager li {
    line-height: 5rem;
    font-size:2.4rem;
    font-weight:600;
    color:rgba(210,210,210,1);
    margin-right: 3rem;
   }
   /deep/ .el-pagination .btn-next .el-icon, /deep/.el-pagination .btn-prev .el-icon {
    display: block;
    font-size: 2.4rem;
    font-weight: 600;
     color:rgba(210,210,210,1);
}
 /deep/.el-pagination.is-background .el-pager li:not(.disabled):hover {
    color: #252427;
    border:.1rem solid #252427!important;
}
@media screen and (max-width:991px) {
   /deep/ .el-pagination.is-background .btn-prev{
     margin-right: 1.6rem;
   }
   /deep/ .el-pagination .el-pager li {
    margin-right: 1.6rem;
   }
}
@media screen and (max-width:767px) {
   padding: 0rem 0 3.2rem 0;
   /deep/ .el-pagination.is-background .btn-next, /deep/ .el-pagination.is-background .btn-prev, /deep/ .el-pagination.is-background .el-pager li {
    width:3rem!important;
    height:3rem!important;
  }
   /deep/ .el-pagination.is-background .btn-prev{
     margin-right: .5rem;
   }
     /deep/ .el-pagination .el-pager li {
      line-height: 3rem;
      font-size:1.4rem;
      margin-right: .5rem;
   }
   /deep/ .el-pagination .btn-next .el-icon, /deep/.el-pagination .btn-prev .el-icon {
    font-size: 1.4rem;
  }
}
}
</style>
