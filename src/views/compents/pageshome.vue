<template>
    <div>
        <div class="pages" :style="styleDatas">
            <el-pagination
                background
                  @current-change="handleCurrentChange"
                  :current-page="cpage"
                  :page-size="pagesz"
                  layout="total, prev, pager, next"
                  :total="totals">
            </el-pagination>
       </div>
    </div>
</template>
<script>
export default {
  name: 'pages',
  data () {
    return {
      // 选择项目顶部
      headerRuleForm: {
        region: '',
        options: []
      }
    }
  },
  props: {
    cpage: '',
    pagesz: '',
    totals: '',
    styleDatas: ''
  },
  watch: {
    cpage (val) {
    },
    pagesz (val) {
    },
    totals (val) {
    }
  },
  created () {
  },
  methods: {
    handleCurrentChange (val) {
      let that = this
      that.$store.commit('pages_index', val)
    }
  }
}
</script>
<style>
.pages{text-align:right;}
.el-pagination.is-background .btn-next,
.el-pagination.is-background .btn-prev,
.el-pagination.is-background .el-pager li{
  background-color:#fff;border:1px solid #d3d4d9;border-radius:3px;
}
</style>
