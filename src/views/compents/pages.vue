<template>
    <div>
        <div class="pagesNew" :style="styleDatas">
            <el-pagination
                background
                  @current-change="handleCurrentChange"
                  :current-page="this.$store.state.pagesCurrent"
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
    }
  },
  props: {
    cpage: 1,
    totals: '',
    styleDatas: '',
    seachDatas: {
      type: Object,
      default: () => ({})
    },
    adressID: ''
  },
  watch: {
    cpage (val) {
      // console.log(val)
    },
    totals (val) {
      // console.log(val)
    }
  },
  created () {
  },
  methods: {
    handleCurrentChange (val) {
      let that = this
      let seachDatas = that.seachDatas
      console.log(seachDatas)
      let obj = {}
      obj.id = that.adressID
      obj.project_id = that.adressID
      obj.page_num = 10
      obj.page_size = val
      obj.referred = seachDatas.referred
      obj.type = seachDatas.type
      obj.province = seachDatas.province
      obj.mod = seachDatas.mod
      obj.name = seachDatas.asetName
      obj.area_id = seachDatas.adress
      obj.asset_code = seachDatas.asetCode
      obj.status = seachDatas.starts
      obj.class_id = seachDatas.class_id
      obj.facilities_big_class = seachDatas.facilities_big_class
      obj.facilities_middle_class = seachDatas.facilities_middle_class
      obj.facilities_small_class = seachDatas.facilities_small_class
      obj.equipment_big_class = seachDatas.equipment_big_class
      obj.equipment_middle_class = seachDatas.equipment_middle_class
      obj.equipment_small_class = seachDatas.equipment_small_class
      obj.username = seachDatas.userName
      obj.f_all = seachDatas.f_all
      obj.e_all = seachDatas.e_all
      that.$store.state.pagesCurrent = val
      that.$parent.loadData(obj)
    }
  }
}
</script>
<style>
.pagesNew{text-align:right;position:relative;float:right;top:4px;}
.el-pagination.is-background .btn-next,
.el-pagination.is-background .btn-prev,
.el-pagination.is-background .el-pager li{
  background-color:#fff;border:1px solid #d3d4d9;border-radius:3px;
}
.el-pagination{padding:0;}
.el-pagination.is-background .btn-next,
.el-pagination.is-background .btn-prev,
.el-pagination.is-background .el-pager li{margin-left:8px;}
</style>
