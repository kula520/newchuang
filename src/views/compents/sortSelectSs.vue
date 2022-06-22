<template>
  <div>
    <!-- 分类 s -->
    <el-form-item>
      <el-select :style="{
        width: outStyle.width,
        margin:outStyle.margin}"
        v-model="ruleForm.selectOne" @change="selectLevel" placeholder="请选择大类">
        <el-option v-for="(item,idx) in selectRootOne" :label="item.name" :value="item.id" :key="idx"></el-option>
      </el-select>
      <el-select :style="{
        width: outStyle.width,
        margin:outStyle.margin}" v-model="ruleForm.selectTwo" :disabled="ruleForm.disabledTwo" placeholder="请选择中类" @change="selectTweHandle">
        <el-option v-for="(item,idx) in selectRootTwo" :label="item.name" :value="item.id" :key="idx"></el-option>
      </el-select>
      <el-select  :style="{
        width: outStyle.width,
        margin:outStyle.margin}" v-model="ruleForm.selectThr" :disabled="ruleForm.disabledThr" placeholder="请选择小类" @change="selectThrHandle">
        <el-option v-for="(item,idx) in selectRootThr" :label="item.name" :value="item.id" :key="idx"></el-option>
      </el-select>
    </el-form-item>
  </div>
</template>

<script>
// eslint-disable-next-line standard/object-curly-even-spacing
import {classList } from '../../api/index'
export default {
  data () {
    return {
      ruleForm: {
        selectOne: '',
        selectTwo: '',
        selectThr: '',
        selectOneId: '',
        selectTwoId: '',
        selectThrId: '',
        disabledTwo: true,
        disabledThr: true,
        codeOne: '',
        codeTwo: '',
        codeThr: '',
        mClass: '1',
        sortCategory: ''
      },
      selectRootOne: [],
      selectRootTwo: [],
      selectRootThr: []
    }
  },
  props: ['outStyle', 'selectType', 'ObjDatas', 'resetVal'],
  watch: {
    resetVal () {
      let that = this
      that.ruleForm.selectOne = ''
      that.ruleForm.selectTwo = ''
      that.ruleForm.selectThr = ''
      that.ruleForm.selectOneId = ''
      that.ruleForm.selectTwoId = ''
      that.ruleForm.selectThrId = ''
      that.ruleForm.codeOne = ''
      that.ruleForm.codeTwo = ''
      that.ruleForm.codeThr = ''
      that.ruleForm.mClass = '1'
      that.ruleForm.disabledTwo = true
      that.ruleForm.disabledThr = true
    },
    ObjDatas: {
      // @ts-ignore
      handler (newName, oldName) {
        let that = this
        // 搜索頁
        let capitalSeachDatas = that.$store.state.capitalSeachDatas
        let faciliObjSeach = capitalSeachDatas.faciliObj
        if (faciliObjSeach != '' && faciliObjSeach != undefined) {
          that.dataVlas(faciliObjSeach)
        }
        // 添加資產
        let capitalDatas = that.$store.state.capitalDatas
        let faciliObjCaptal = capitalDatas.faciliObj
        if (faciliObjCaptal != '' && faciliObjCaptal != undefined) {
          that.dataVlas(faciliObjCaptal)
        }
      },
      immediate: true,
      deep: true
    }
  },
  created () {
    let that = this
    let obj = {}
    obj.parent_id = 0
    obj.type = that.selectType
    that.loadData(obj)
  },
  methods: {
    dataVlas (faciliObj) {
      let that = this
      that.ruleForm.selectOne = faciliObj.selectOne
      that.ruleForm.selectTwo = faciliObj.selectTwo
      that.ruleForm.selectThr = faciliObj.selectThr
      that.ruleForm.mClass = faciliObj.mClass
      let twe = faciliObj.selectTwo
      let thr = faciliObj.selectThr
      if (twe == '' && thr == '') {
        that.ruleForm.selectOne = faciliObj.selectOne
        that.ruleForm.selectOneId = faciliObj.selectOneId
        let objNew = {}
        objNew.parent_id = faciliObj.selectOneId
        objNew.type = that.selectType
        that.clasaListLoad(objNew)
        that.ruleForm.disabledTwo = false
        that.ruleForm.disabledThr = true
      } else if (thr == '') {
        that.ruleForm.selectOne = faciliObj.selectOne
        that.ruleForm.selectOneId = faciliObj.selectOneId
        that.ruleForm.selectTwo = faciliObj.selectTwo
        that.ruleForm.selectTwoId = faciliObj.selectTwoId
        let objNew = {}
        objNew.parent_id = faciliObj.selectOneId
        objNew.type = that.selectType
        let objNewTwe = {}
        objNewTwe.parent_id = faciliObj.selectTwoId
        objNewTwe.type = that.selectType
        that.clasaListLoad(objNew)
        that.clasaListLoadTwe(objNewTwe)
        that.ruleForm.disabledTwo = false
        that.ruleForm.disabledThr = false
      } else {
        that.ruleForm.selectOne = faciliObj.selectOne
        that.ruleForm.selectOneId = faciliObj.selectOneId
        that.ruleForm.selectTwo = faciliObj.selectTwo
        that.ruleForm.selectTwoId = faciliObj.selectTwoId
        that.ruleForm.selectThr = faciliObj.selectThr
        that.ruleForm.selectThrId = faciliObj.selectThrId
        let objNew = {}
        objNew.parent_id = faciliObj.selectOneId
        objNew.type = that.selectType
        let objNewTwe = {}
        objNewTwe.parent_id = faciliObj.selectTwoId
        objNewTwe.type = that.selectType
        that.clasaListLoad(objNew)
        that.clasaListLoadTwe(objNewTwe)
        that.ruleForm.disabledTwo = false
        that.ruleForm.disabledThr = false
      }
    },
    clasaListLoad (obj) {
      let that = this
      classList(obj).then(res => {
        // @ts-ignore
        if (res.code == 200) {
          that.selectRootTwo = res.data
        }
      })
    },
    clasaListLoadTwe (obj) {
      let that = this
      classList(obj).then(res => {
        // @ts-ignore
        if (res.code == 200) {
          that.selectRootThr = res.data
        }
      })
    },
    // 查询父级下拉
    selectLevel (e) {
      let that = this
      let objNew = {}
      objNew.parent_id = e
      objNew.type = that.selectType
      let datas = that.selectRootOne
      var obj = {}
      obj = datas.find(function (item) {
        return item.id === e
      })
      that.ruleForm.codeOne = obj.code
      that.ruleForm.codeTwo = ''
      that.ruleForm.codeThr = ''
      that.ruleForm.selectOne = obj.name
      that.ruleForm.selectOneId = obj.id
      that.ruleForm.selectTwo = ''
      that.ruleForm.selectTwoId = ''
      that.ruleForm.selectThr = ''
      that.ruleForm.selectThrId = ''
      that.ruleForm.mClass = '1'
      that.ruleForm.sortCategory = obj.category
      classList(objNew).then(res => {
        // @ts-ignore
        if (res.code == 200) {
          that.ruleForm.disabledTwo = false
          that.selectRootTwo = res.data
          that.ruleForm.disabledThr = true
        } else {
          that.ruleForm.disabledTwo = true
          that.ruleForm.disabledThr = true
        }
      })
      that.$emit('ruleFormVal', that.ruleForm)
    },
    // 二级下拉框
    selectTweHandle (e) {
      let that = this
      let objNew = {}
      objNew.parent_id = e
      objNew.type = that.selectType
      let datas = that.selectRootTwo
      var obj = {}
      obj = datas.find(function (item) {
        return item.id === e
      })
      that.ruleForm.codeTwo = obj.code
      that.ruleForm.codeThr = ''
      that.ruleForm.selectTwo = obj.name
      that.ruleForm.selectTwoId = obj.id
      that.ruleForm.selectThr = ''
      that.ruleForm.selectThrId = ''
      that.ruleForm.mClass = '2'
      that.ruleForm.sortCategory = obj.category
      classList(objNew).then(res => {
        // @ts-ignore
        if (res.code == 200) {
          that.ruleForm.disabledThr = false
          that.selectRootThr = res.data
        } else {
          that.ruleForm.disabledThr = true
        }
      })
      this.$emit('ruleFormVal', this.ruleForm)
    },
    // 三级下拉
    selectThrHandle (e) {
      let that = this
      let datas = that.selectRootThr
      var obj = {}
      obj = datas.find(function (item) {
        return item.id === e
      })
      that.ruleForm.codeThr = obj.code
      that.ruleForm.selectThr = obj.name
      that.ruleForm.selectThrId = obj.id
      that.ruleForm.mClass = '3'
      that.ruleForm.sortCategory = obj.category
      that.$emit('ruleFormVal', that.ruleForm)
    },
    // 获取分类
    loadData (data) {
      let that = this
      classList(data).then(res => {
        // @ts-ignore
        if (res.code == 200) {
          that.selectRootOne = res.data
        } else {
          that.$message({
            // @ts-ignore
            message: res.message,
            type: 'warning'
          })
        }
      })
    }
  }
}
</script>
