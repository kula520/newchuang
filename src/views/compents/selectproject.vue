<template>
    <div>
        <el-select
          @change="headerSelectChange"
          v-model="headerRuleForm.region"
          placeholder="请选择项目"
        >
          <el-option
            v-for="item in headerRuleForm.options"
            :key="item.id"
            :label="item.referred"
            :value="item.id"
          >
          </el-option>
        </el-select>
    </div>
</template>
<script>
import {projectSet, projectList} from '../../api/index'
export default {
  name: 'selectProject',
  data () {
    return {
      // 选择项目顶部
      headerRuleForm: {
        region: '',
        options: []
      }
    }
  },
  props:{
    proID: ''
  },
  created () {
    let that = this
    that.headerRuleForm.region = that.proID
    let obj = {}
    obj.page_num = 1000
    obj.page_size = 1
    that.loadData(obj)
  },
  methods: {
    // 头部选择项目
    headerSelectChange (val) {
      let that = this
      let datas = that.headerRuleForm.options
      var obj = {}
      obj = datas.find(function (item) {
        return item.id == val
      })
      // 获取默认项目id
      let objProjectID = {}
      objProjectID.project_id = obj.id
      let objid = obj.id
      let local = localStorage.getItem('cookiesDatas')
      let cookiesDatas = JSON.parse(local)
      cookiesDatas.projectID = objid
      let cookiesObjString = JSON.stringify(cookiesDatas)
      localStorage.setItem('cookiesDatas', cookiesObjString)
      projectSet(objProjectID)
        .then(res => {
          console.log(res)
          if (res.code == 200) {
            that.$router.go(0)
          } else {
            that.$message({
              message: res.message,
              type: 'warning'
            })
          }
        })
    },
    // 列表
    loadData (data) {
      let that = this
      projectList(data).then(res => {
        if (res.code == 200) {
          that.headerRuleForm.options = res.data.info
        }
      })
    }
  }
}
</script>
<style scoped>
</style>
