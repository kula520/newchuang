<template>
    <div class="gwDialog">
        <el-dialog fullscreen="true" :before-close="handleClose" :visible.sync="gwDialogVisible">
            <h4 class="tiles"><i @click="handleClose" class="el-icon-arrow-left gotoListIcon"></i>{{tils}}</h4>
            <div class="capiWarp">
              <el-form :model="form" label-width="200px" label-position="right" ref="form">
                <inputTest title="资产名称" @inputVals="nameVal" :inputTest="form.name" :disabd="disabdVals"></inputTest>
                <inputselect title="上游资产" :selectVals="form.startZc" :disabd="upZc" optionVals="name"
                    :typeData="form.startZcDatas" @selectVals="startZcVal">
                </inputselect>
                <inputselect title="下游资产" :selectVals="form.endZc" :disabd="downZc" optionVals="name"
                    :typeData="form.endZcDatas" @selectVals="endZcVal">
                </inputselect>
                <el-form-item>
                  <span class="buttonClose" @click="unDownClick">切换上下游资产</span>
                </el-form-item>
                <inputselect title="请选择暂存管网" :selectVals="form.zcSaveName" :disabd="downZc" optionVals="name"
                    :typeData="form.zcSaveNameDatas" @selectVals="zcSaveNameVal">
                </inputselect>
                <el-form-item label="设施分类" class="mb0">
                  <sortSelectGw
                      :outStyle="outStyle"
                      :selectType="2"
                      @ruleFormVal='ruleForGwfun'
                      :resetVal='resetGwDatas'
                      :ObjDatas='form.gwfaciliObj'>
                  </sortSelectGw>
                  <span class="textClass bsmBox" @click="maintenClick('2')">维护设施信息</span>
                </el-form-item>
                <inputselect title="所属设施名称" :selectVals="form.facilities" :disabd="disabdVals" optionVals="name"
                  :typeData="form.facilitiesDatas" @selectVals="facilitiesVal">
                </inputselect>
                <inputTest title="资产标识码" :inputTest="form.assetCodeVal" disabd="true"></inputTest>
                <el-form-item class="bsmBox">
                  <span class="textClass" @click="obtainCodeHandle">生成标识码</span>
                </el-form-item>
                <uploadimg @uploadImgLists="uploadListsVal" :fileList="form.fileList"></uploadimg>
              </el-form>
            </div>
        </el-dialog>
    </div>
</template>
<script>
import inputTest from '../formtable/inputtext.vue'
import inputselect from '../formtable/inputselect.vue'
import sortSelectGw from '../compents/sortSelectGw.vue'
import uploadimg from '../formtable/uploadimg.vue'
import {
  // @ts-ignore
  addAssetOne, listAsset, assetCode, sectionAssets
} from '../../api/index'
export default {
  name: 'gwDialogs',
  components: {inputTest, inputselect, sortSelectGw, uploadimg},
  data () {
    return {
      upZc: true,
      downZc: false,
      disabdVals: false,
      resetGwDatas: 1,
      form: {
        name: '',
        facilities: '',
        facilitiesDatas: [],
        startZc: '',
        startZcDatas: [],
        endZc: '',
        endZcDatas: [],
        assetCodeVal: '',
        class_id: '',
        note: '',
        fileList: [],
        attrTypeID: '',
        class_type: '',
        assetCodeType: '2',
        gwfaciliObj: '',
        // 设施分类三级联动值
        gwfcilityOne: '',
        gwfcilityTwo: '',
        gwfcilityThr: '',
        type: '1',
        // 回显上下游编码
        attrForm: '',
        user_id: '',
        // 管网查询数据
        zcSaveName: '',
        zcSaveNameDatas: []
      },
      projectIDs: '',
      // 组件样式
      outStyle: {
        width: '100%',
        margin: '0 0 20px 0'
      }
    }
  },
  props: {
    tils: '',
    gwDialogVisible: false
  },
  created () {
    let that = this
    let local = localStorage.getItem('cookiesDatas')
    let cookiesDatas = JSON.parse(local)
    that.projectIDs = cookiesDatas.projectID
    console.log(cookiesDatas)
    // 获取资产列表
    var objList = {}
    objList.project_id = that.projectIDs
    objList.type = '1'
    objList.status = '1'
    objList.page_num = 1000
    objList.page_size = 1
    that.zcLoadData(objList)    
    let gwobj = {} 
    gwobj.project_id = that.projectIDs
    gwobj.page_num = 1000
    gwobj.page_size = 1
    that.zcGwLoadData(gwobj)
  },
  methods: {
    // 上传图片
    uploadListsVal (val) {
      let that = this
      that.form.fileList = val
    },
    // 上游资产
    startZcVal (val) {
      let that = this
      that.form.startZc = val
    },
    // 下游资产
    endZcVal (val) {
      let that = this
      that.form.endZc = val
    },
    // 切换上下游资产
    unDownClick () {
      let that = this
      let startZc = that.form.startZc
      let startZcData = that.form.startZcDatas
      let endZc = that.form.endZc
      let endZcDatas = that.form.endZcDatas
      that.form.startZc = endZc
      that.form.startZcDatas = endZcDatas
      that.form.endZc = startZc
      that.form.endZcDatas = startZcData
    },
    // 获取资产列表
    zcLoadData (data) {
      let that = this
      listAsset(data).then(res => {
        // @ts-ignore
        if (res.code == 200) {
          that.form.startZcDatas = res.data.data
          that.form.endZcDatas = res.data.data
          that.form.facilitiesDatas = res.data.data
        } else {
          that.$message({
            // @ts-ignore
            message: res.message,
            type: 'warning'
          })
        }
      })
    },
    zcSaveNameVal (val) {
      let that = this
      that.form.zcSaveName = val
    },
    // 获取暂存管网列表
    zcGwLoadData (data) {
      let that = this
      sectionAssets(data).then(res => {
        // @ts-ignore
        if (res.code == 200) {
          that.form.zcSaveNameDatas = res.data
        } else {
          that.$message({
            // @ts-ignore
            message: res.message,
            type: 'warning'
          })
        }
      })
    },
    // 设施分类
    ruleForGwfun (val) {
      let that = this
      that.form.gwfaciliObj = val
      that.form.assetCodeVal = ''
      that.form.facilities = ''
      // 获取资产列表
      console.log(val)
      var objList = {}
      objList.project_id = that.projectIDs
      objList.status = '1'
      objList.page_num = 1000
      objList.page_size = 1
      if (val.codeThr == '' && val.codeTwo == '') {
        that.form.class_id = val.selectOneId
        that.form.class_type = '1'
        that.form.type = '1'
        that.form.assetCodeType = ''
        that.form.gwfcilityOne = val.selectOneId        
        that.form.gwfcilityTwo = ''
        that.form.gwfcilityThr = ''
      } else if (val.codeThr == '') {
        that.form.class_id = val.selectTwoId
        that.form.class_type = '2'
        that.form.assetCodeType = '1'
        that.form.type = '1'
        that.form.gwfcilityOne = val.selectOneId
        that.form.gwfcilityTwo = val.selectTwoId
        that.form.gwfcilityThr = ''
        objList.class_id = val.selectOneId
        that.zcLoadData(objList)
      } else {
        that.form.class_id = val.selectThrId
        that.form.class_type = '3'
        that.form.assetCodeType = '2'
        that.form.gwfcilityOne = val.selectOneId
        that.form.gwfcilityTwo = val.selectTwoId
        that.form.gwfcilityThr = val.selectThrId
        objList.class_id = val.selectTwoId
        that.zcLoadData(objList)
      }
    },
    // 所属设施名称
    facilitiesVal (val) {
      let that = this
      that.form.facilities = val
      that.$store.state.capitalDatas = that.form
    },
    // 生成资产标识码
    obtainCodeHandle () {
      let that = this
      let projectID = that.projectIDs
      let type = that.form.assetCodeType
      let classId = that.form.class_id
      let belongsAsset = that.form.facilities
      let mClass = that.form.gwfaciliObj.mClass
      let categoryVal = '1'
      assetCode(
        projectID,
        categoryVal,
        type,
        classId,
        belongsAsset
      ).then(res => {
        // @ts-ignore
        if (res.code == 200) {
          let datas = res.data
          if (categoryVal == 1) {
            if (mClass == '2') {
              that.form.assetCodeVal = datas.m1 + datas.m2
            }
            if (mClass == '3') {
              that.form.assetCodeVal = datas.s1 + datas.s2 + datas.s3 + datas.s4
            }
          }
          if (categoryVal == 2) {
            that.form.assetCodeVal = datas.e1 + datas.e2
          }
        } else {
          that.$message({
            // @ts-ignore
            message: res.message,
            type: 'warning'
          })
        }
      })
    },
    handleClose () {
      let that = this
      that.$emit('gwdialogShow', 'false')
    }
  }
}
</script>
<style>
@import url('../../css/gwdialog.css');
</style>
