/* eslint-disable import/no-duplicates */
<template>
    <div class="capitMain">
        <h4 class="titleH4"><i @click="caceled" class="el-icon-arrow-left gotoListIcon"></i>{{titleProject}}</h4>
        <div class="capiWarp">
          <el-form :model="form" label-width="200px" label-position="right" ref="form">
              <inputselect title="选择模板" :selectVals="form.templateModel" :disabd="disabdVals" optionVals="name"
                  :typeData="form.templateDatas" @selectVals="templateModelVal">
              </inputselect>
              <inputselect title="二维码" :selectVals="form.eqCode" :disabd="disabdVals" optionVals="idVal"
                  :typeData="form.eqCodeDatas" @selectVals="eqCodelVal">
              </inputselect>
              <inputselect title="资产类型" :selectVals="form.assetsType" :disabd="disabdVals" optionVals="name"
                  :typeData="form.assetsTypeDatas" @selectVals="assetsTypeVal">
              </inputselect>
              <inputTest title="资产名称" @inputVals="nameVal" :inputTest="form.name" :disabd="disabdVals"></inputTest>
              <el-form-item label="设备分类" class="mb0" v-show="shebeiShow">
                  <sortSelectSB
                      :outStyle="outStyle"
                      :selectType="1"
                      @ruleFormVal='ruleForbFun'
                      :resetVal='resetValDatas'
                      :ObjDatas='form.equipObj'>
                  </sortSelectSB>
                  <span class="textClass bsmBox" @click="maintenClick('1')">维护设备信息</span>
                  <sortSelectSBSs
                      :outStyle="outStyle"
                      :selectType="2"
                      @ruleFormVal='ruleForsbSbFun'
                      :resetVal='resetValDatas'>
                  </sortSelectSBSs>
              </el-form-item>
              <el-form-item label="设施分类" class="mb0" v-show="sheshiShow">
                  <sortSelectSs
                      :outStyle="outStyle"
                      :selectType="2"
                      @ruleFormVal='ruleForSFun'
                      :resetVal='resetValDatas'
                      :ObjDatas='form.faciliObj'>
                  </sortSelectSs>
                  <span class="textClass bsmBox" @click="maintenClick('2')">维护设施信息</span>
              </el-form-item>
              <inputselect title="所属设施名称" :selectVals="form.facilities" :disabd="disabdVals" optionVals="name"
                  :typeData="form.facilitiesDatas" @selectVals="facilitiesVal">
              </inputselect>
              <div v-show="gwUpDownShow">
                <inputselect title="上游资产" :selectVals="form.startZc" :disabd="disabdVals" optionVals="name"
                    :typeData="form.startZcDatas" @selectVals="startZcVal">
                </inputselect>
                <inputselect title="下游资产" :selectVals="form.endZc" :disabd="disabdVals" optionVals="name"
                    :typeData="form.endZcDatas" @selectVals="endZcVal">
                </inputselect>
              </div>
              <el-form-item label="资产定位" v-show="positionShow" class="mb0">
                  <div v-for="(item,index) in form.positioning" :key="index" class="posiTionClas">
                      <el-input class="ipt30" @input="saveDatas" onkeyup= "value=value.replace(/[^\d.]/g,'')" v-model.trim="item.x" placeholder="X | 请输入经度"></el-input>
                      <el-input class="ipt30" @input="saveDatas" onkeyup= "value=value.replace(/[^\d.]/g,'')" v-model.trim="item.y" placeholder="Y | 请输入纬度"></el-input>
                      <el-input class="ipt30" @input="saveDatas" onkeyup= "value=value.replace(/[^\d.]/g,'')" v-model.trim="item.h" placeholder="H | 请输入高程"></el-input>
                      <i class="el-icon-delete" v-if="form.positioning.length > 1" size="small" plain @click="removeRow(index)"></i>
                      <div class="clear"></div>
                  </div>
                  <div v-show="positionAddShow" @click="addPositionClick" class="buttonAll mb20">新增定位点</div>
                  <div class="clear"></div>
              </el-form-item>
              <inputTest title="资产标识码" :inputTest="form.assetCodeVal" disabd="true"></inputTest>
              <el-form-item class="bsmBox">
                <span class="textClass" @click="obtainCodeHandle">生成标识码</span>
              </el-form-item>
              <uploadimg @uploadImgLists="uploadListsVal" :fileList="form.fileList"></uploadimg>
              <inputTest title="备注" @inputVals="noteVal" inptType="textarea" :inputTest="form.note" :disabd="disabdVals"></inputTest>
              <div v-show="glShow">
                <el-form-item>
                    <h5 class="h5tils">关联资产</h5>
                </el-form-item>
                <el-form-item>
                    <div class="attrClass" v-for="(item,index) in form.powerAttrList" :key="index">
                        <h4 class="labelTile">关联{{index+1}}</h4>
                        <el-input class="w32 lf mr" disabled maxlength="30" v-model="item.startZc" placeholder="上游资产" />
                        <el-input class="w32 lf mr" disabled maxlength="30" v-model="item.endZc" placeholder="下游资产" />
                        <span class="gwxx" @click="maintainGwClick(item,index)">维护管网信息</span>
                        <div class="clear"></div>
                    </div>
                    <div class="buttonAll" @click="maintainGwClick">新增关联资产</div>
                </el-form-item>
              </div>
          </el-form>
          <div class="footerButn">
              <div class="footer">
                  <button class="buttonSave" @click="subimt('2')">提交审核</button>
                  <button class="buttonClose" @click="subimt('3')">暂 存</button>
                  <button class="buttonClose" @click="caceled">返 回</button>
                  <div class="clear"></div>
              </div>
          </div>
        </div>
        <attrDialog ref="attrChild" :tils="attrDialogTils" :attrDialogVisible="attrDialogShow" @dialogShow="closeDialog"></attrDialog>
        <gwdialog ref="gwChild" :tils="gwDialogTils" :gwDialogVisible="gwDialogShow" @gwdialogShow="closeDialog"></gwdialog>
    </div>
</template>
<script>
import inputTest from '../formtable/inputtext.vue'
import inputselect from '../formtable/inputselect.vue'
import uploadimg from '../formtable/uploadimg.vue'
// eslint-disable-next-line import/no-duplicates
import sortSelectSs from '../compents/sortSelectSs.vue'
// eslint-disable-next-line import/no-duplicates
import sortSelectSBSs from '../compents/sortSelectSs.vue'
import sortSelectSB from '../compents/sortSelectSB.vue'
import attrDialog from '../dailog/attrdialog.vue'
import gwdialog from '../dailog/gwdialog.vue'
import {
  // @ts-ignore
  codeList, addAssetOne, listAsset, oftenLList, assetCode
} from '../../api/index'
// eslint-disable-next-line no-unused-vars
export default {
  name: 'capitalMain',
  components: {inputTest, inputselect, uploadimg, sortSelectSs, sortSelectSB, sortSelectSBSs, attrDialog, gwdialog},
  data () {
    return {
      attrDialogTils: '',
      attrDialogShow: false,
      gwDialogTils: '',
      gwDialogShow: false,
      resetValDatas: 1,
      shebeiShow: false,
      sheshiShow: true,
      gwUpDownShow: false,
      glShow: false,
      positionAddShow: false,
      positionShow: true,
      // 组件样式
      outStyle: {
        width: '100%',
        margin: '0 0 20px 0'
      },
      disabdVals: false,
      titleProject: '',
      form: {
        name: '',
        templateModel: '',
        templateDatas: [],
        eqCode: '',
        eqCodeDatas: [],
        assetsType: '2',
        assetsTypeDatas: [{
          name: '设施资产',
          id: '2'
        }, {
          name: '设备资产',
          id: '1'
        }],
        faciliObj: '',
        equipObj: '',
        equipFaciliObj: '',
        facilities: '',
        facilitiesDatas: [],
        startZc: '',
        startZcDatas: [],
        endZc: '',
        endZcDatas: [],
        positioning: [{
          x: '',
          y: '',
          h: ''
        }],
        positioningVal: '',
        assetCodeVal: '',
        class_id: '',
        note: '',
        fileList: [],
        powerAttrList: [],
        attrTypeID: '',
        jsonCode: {
          beginX: '',
          beginY: '',
          beginH: '',
          endX: '',
          endY: '',
          endH: ''
        },
        class_type: '',
        assetCodeType: '2',
        // 设施分类三级联动值
        fcilityOne: '',
        fcilityTwo: '',
        fcilityThr: '',
        // 设备分类三级联动值
        equipmentOne: '',
        equipmentTwo: '',
        equipmentThr: '',
        type: '1',
        // 回显上下游编码
        upYou: [],
        downYou: [],
        attrForm: '',
        user_id: ''
      },
      projectIDs: ''
    }
  },
  created () {
    let that = this
    let local = localStorage.getItem('cookiesDatas')
    let cookiesDatas = JSON.parse(local)
    let projectID = cookiesDatas.projectID
    that.form.user_id = cookiesDatas.user_id
    that.projectIDs = projectID
    // 获取模板列表
    let objTemple = {}
    objTemple.project_id = projectID
    objTemple.page_num = 1000
    objTemple.page_size = 1
    that.templeloadData(objTemple)
    // 获取二维码
    let obj = {}
    obj.project_id = projectID
    obj.page_num = 1000
    obj.status = '2'
    obj.page_size = 1
    that.eqCodeLoadData(obj)
    let capitalLinks = that.$store.state.capitalLinks
    if (capitalLinks == 'add') {
      that.titleProject = '添加资产'
      let capitalDatas = that.$store.state.capitalDatas
      if (typeof capitalDatas === 'object') {
        that.form.name = capitalDatas.name
        that.form.templateModel = capitalDatas.templateModel
        that.form.eqCode = capitalDatas.eqCode
        that.form.assetsType = capitalDatas.assetsType
        that.form.class_id = capitalDatas.class_id
        that.form.class_type = capitalDatas.class_type
        that.form.type = capitalDatas.type
        that.form.note = capitalDatas.note
        that.form.upYou = capitalDatas.upYou
        that.form.downYou = capitalDatas.downYou
        that.form.jsonCode = capitalDatas.jsonCode
        that.form.assetCodeVal = capitalDatas.assetCodeVal
        that.form.facilities = capitalDatas.facilities
        that.form.facilitiesDatas = capitalDatas.facilitiesDatas
        that.form.fileList = capitalDatas.fileList
        that.form.equipFaciliObj = ''
        if (capitalDatas.assetsType == '2') {
          // 设施
          console.log('设施', capitalDatas)
          that.shebeiShow = false
          that.sheshiShow = true
          that.form.faciliObj = capitalDatas.faciliObj
          that.form.equipObj = ''
          that.form.positioning = capitalDatas.positioning
          that.form.fcilityOne = capitalDatas.fcilityOne
          that.form.fcilityTwo = capitalDatas.fcilityTwo
          that.form.fcilityThr = capitalDatas.fcilityThr
          let faciliObj = capitalDatas.faciliObj
          if (faciliObj.mClass == '2') {
            that.gwUpDownShow = false
            that.glShow = false
            that.positionAddShow = true
            that.positionShow = true
          } else if (faciliObj.mClass == '3') {
            let sortCategory = faciliObj.sortCategory
            if (sortCategory == '1') {
              that.positionAddShow = false
              that.positionShow = true
              that.gwUpDownShow = false
              that.glShow = true
            } else if (sortCategory == '2' || sortCategory == '3') {
              that.positionAddShow = true
              that.positionShow = true
              that.glShow = true
            }
            if (sortCategory == '4') {
              that.positionAddShow = false
              that.positionShow = false
              that.gwUpDownShow = true
              that.glShow = false
              that.form.startZc = capitalDatas.startZc
              that.form.startZcDatas = capitalDatas.startZcDatas
              that.form.endZc = capitalDatas.endZc
              that.form.endZcDatas = capitalDatas.endZcDatas
            }
          }
        } else if (capitalDatas.assetsType == '1') {
          // 设备
          console.log('设备')
          that.shebeiShow = true
          that.sheshiShow = false
          that.positionAddShow = false
          that.positionShow = false
          that.glShow = false
          that.form.faciliObj = ''
          that.form.equipObj = capitalDatas.equipObj
          that.form.equipmentOne = capitalDatas.equipmentOne
          that.form.equipmentTwo = capitalDatas.equipmentTwo
          that.form.equipmentThr = capitalDatas.equipmentThr
        }
      }
    }
  },
  methods: {
    // 上传图片
    uploadListsVal (val) {
      let that = this
      that.form.fileList = val
      that.$store.state.capitalDatas = that.form
    },
    // 选择模板
    nameVal (val) {
      let that = this
      that.form.name = val
      that.$store.state.capitalDatas = that.form
    },
    // 选择模板
    templateModelVal (val) {
      let that = this
      that.form.templateModel = val
      that.$store.state.capitalDatas = that.form
    },
    // 获取模板列表
    templeloadData (data) {
      let that = this
      oftenLList(data).then(res => {
        // @ts-ignore
        if (res.code == 200) {
          that.form.templateDatas = res.data.data
        } else {
          that.$message({
            // @ts-ignore
            message: res.message,
            type: 'warning'
          })
        }
      })
    },
    // 选择二维码
    eqCodelVal (val) {
      let that = this
      that.form.eqCode = val
      that.$store.state.capitalDatas = that.form
    },
    // 获取二维码列表
    eqCodeLoadData (data) {
      let that = this
      codeList(data).then(res => {
        // @ts-ignore
        if (res.code == 200) {
          that.form.eqCodeDatas = res.data.info
        } else {
          that.$message({
            // @ts-ignore
            message: res.message,
            type: 'warning'
          })
        }
      })
    },
    // 资产类型
    assetsTypeVal (val) {
      let that = this
      that.form.assetsType = val
      that.resetValDatas = that.resetValDatas + 1
      let local = localStorage.getItem('cookiesDatas')
      let cookiesDatas = JSON.parse(local)
      var sortObj = {}
      sortObj.project_id = cookiesDatas.projectID
      that.$refs.attrChild.loadsortData(sortObj, 0, 0)
      that.$store.state.capitAttrDats = ''
      that.form.startZc = ''
      that.form.endZc = ''
      that.form.positioning = [{
        x: '',
        y: '',
        h: ''
      }]
      that.form.faciliObj = ''
      that.form.fcilityOne = ''
      that.form.fcilityTwo = ''
      that.form.fcilityThr = ''
      that.form.equipObj = ''
      that.form.equipFaciliObj = ''
      that.form.equipmentOne = ''
      that.form.equipmentTwo = ''
      that.form.equipmentThr = ''
      that.form.facilities = ''
      that.form.facilitiesDatas = ''
      that.form.assetCodeVal = ''
      that.form.class_id = ''
      that.form.class_type = ''
      that.form.type = ''
      if (val == '1') {
        // 设备
        that.form.type = '2'
        that.shebeiShow = true
        that.sheshiShow = false
        that.glShow = false
        that.gwUpDownShow = false
        that.positionShow = false
        that.positionAddShow = false
      } else {
        // 设施
        that.form.type = '1'
        that.sheshiShow = true
        that.shebeiShow = false
      }
      that.$store.state.capitalDatas = that.form
    },
    // 设施分类
    ruleForSFun (val) {
      let that = this
      that.form.faciliObj = val
      that.form.assetCodeVal = ''
      that.form.facilities = ''
      // 获取资产列表
      console.log(val)
      var objList = {}
      objList.project_id = that.projectIDs
      objList.status = '1'
      objList.page_num = 1000
      objList.page_size = 1
      // 获取模板列表
      let objTemple = {}
      objTemple.project_id = that.projectIDs
      objTemple.page_num = 1000
      objTemple.page_size = 1
      that.positionShow = true
      if (val.codeThr == '' && val.codeTwo == '') {
        that.form.class_id = val.selectOneId
        that.form.class_type = '1'
        that.form.type = '1'
        that.form.assetCodeType = ''
        that.form.fcilityOne = val.selectOneId
        that.positionAddShow = false
        that.glShow = false
        that.gwUpDownShow = false
        that.form.positioning = [
          {
            x: '',
            y: '',
            h: ''
          }
        ]
        that.form.fcilityTwo = ''
        that.form.fcilityThr = ''
      } else if (val.codeThr == '') {
        that.form.class_id = val.selectTwoId
        that.form.class_type = '2'
        that.form.assetCodeType = '1'
        that.form.type = '1'
        that.form.fcilityOne = val.selectOneId
        that.form.fcilityTwo = val.selectTwoId
        that.form.fcilityThr = ''
        objList.class_id = val.selectOneId
        that.zcLoadData(objList)
        objTemple.class_id = val.selectTwoId
        that.templeloadData(objTemple)
        that.positionAddShow = true
        that.glShow = false
        that.gwUpDownShow = false
        that.form.positioning = [
          {
            x: '',
            y: '',
            h: ''
          }
        ]
        console.log('zhong')
      } else {
        that.form.class_id = val.selectThrId
        that.form.class_type = '3'
        that.form.assetCodeType = '2'
        that.form.fcilityOne = val.selectOneId
        that.form.fcilityTwo = val.selectTwoId
        that.form.fcilityThr = val.selectThrId
        objList.class_id = val.selectTwoId
        that.zcLoadData(objList)
        objTemple.class_id = val.selectThrId
        that.templeloadData(objTemple)
        var sortCategory = val.sortCategory
        that.glShow = true
        if (sortCategory == '1') {
          that.form.positioning = [
            {
              x: '',
              y: '',
              h: ''
            }
          ]
          that.positionAddShow = false
          that.gwUpDownShow = false
        } else if (sortCategory == '2' || sortCategory == '3') {
          that.form.positioning = [
            {
              x: '',
              y: '',
              h: ''
            }
          ]
          that.positionAddShow = true
          that.gwUpDownShow = false
        } else if (sortCategory == '4') {
          that.positionAddShow = false
          that.positionShow = false
          that.glShow = false
          that.gwUpDownShow = true
          that.form.type = '3'
        }
      }
      that.$store.state.capitalDatas = that.form
    },
    // 设备分类
    ruleForbFun (val) {
      let that = this
      that.form.equipObj = val
      that.form.type = '2'
      that.form.assetCodeVal = ''
      that.form.facilities = ''
      that.form.fcilityOne = ''
      that.form.fcilityTwo = ''
      that.form.fcilityThr = ''
      // 获取模板列表
      let objTemple = {}
      objTemple.project_id = that.projectIDs
      objTemple.page_num = 1000
      objTemple.page_size = 1
      if (val.codeThr == '' && val.codeTwo == '') {
        that.form.class_id = val.selectOneId
        that.form.class_type = '1'
        that.form.assetCodeType = ''
        that.form.equipmentOne = val.selectOneId
        that.form.equipmentTwo = ''
        that.form.equipmentThr = ''
      } else if (val.codeThr == '') {
        that.form.class_id = val.selectTwoId
        that.form.class_type = '2'
        that.form.assetCodeType = '1'
        that.form.equipmentOne = val.selectOneId
        that.form.equipmentTwo = val.selectTwoId
        that.form.equipmentThr = ''
        objTemple.class_id = val.selectTwoId
        that.templeloadData(objTemple)
      } else {
        that.form.class_id = val.selectThrId
        that.form.class_type = '3'
        that.form.assetCodeType = '2'
        that.form.equipmentOne = val.selectOneId
        that.form.equipmentTwo = val.selectTwoId
        that.form.equipmentThr = val.selectThrId
        objTemple.class_id = val.selectThrId
        that.templeloadData(objTemple)
      }
      that.$store.state.capitalDatas = that.form
    },
    // 设备下的设施分类
    ruleForsbSbFun (val) {
      let that = this
      console.log(val)
      that.form.equipFaciliObj = val
      // 获取资产列表
      var objList = {}
      objList.project_id = that.projectIDs
      objList.status = '1'
      objList.page_num = 1000
      objList.page_size = 1
      if (val.codeThr == '' && val.codeTwo == '') {
      } else if (val.codeThr == '') {
        objList.class_id = val.selectOneId
        that.zcLoadData(objList)
      } else {
        objList.class_id = val.selectTwoId
        that.zcLoadData(objList)
      }
      that.$store.state.capitalDatas = that.form
    },
    // 所属设施名称
    facilitiesVal (val) {
      let that = this
      that.form.facilities = val
      that.$store.state.capitalDatas = that.form
    },
    // 上游资产
    startZcVal (val) {
      let that = this
      that.form.startZc = val
      that.$store.state.capitalDatas = that.form
    },
    // 下游资产
    endZcVal (val) {
      let that = this
      that.form.endZc = val
      that.$store.state.capitalDatas = that.form
    },
    noteVal (val) {
      let that = this
      that.form.note = val
      that.$store.state.capitalDatas = that.form
    },
    // 维护设施设备信息
    maintenClick (val) {
      let that = this
      let capitalDatas = that.$store.state.capitalDatas
      let local = localStorage.getItem('cookiesDatas')
      let cookiesDatas = JSON.parse(local)
      var sortObj = {}
      sortObj.project_id = cookiesDatas.projectID
      if (capitalDatas.class_id == '' || capitalDatas.class_id == undefined) {
        that.$message({
          message: '请选择分类',
          type: 'warning'
        })
      } else {
        if (val == '1') {
          that.attrDialogTils = '维护设备属性'
          that.attrDialogShow = true
          if (capitalDatas.equipmentThr == '' && capitalDatas.equipmentTwo == '') {
            sortObj.class_id = capitalDatas.equipmentOne
            that.$refs.attrChild.loadsortData(sortObj, 0)
          } else if (capitalDatas.equipmentThr == '') {
            sortObj.class_id = capitalDatas.equipmentTwo
            that.$refs.attrChild.loadsortData(sortObj, 0)
          } else {
            sortObj.class_id = capitalDatas.equipmentThr
            that.$refs.attrChild.loadsortData(sortObj, 0)
          }
        } else if (val == '2') {
          that.attrDialogTils = '维护设施属性'
          that.attrDialogShow = true
          if (capitalDatas.fcilityThr == '' && capitalDatas.fcilityTwo == '') {
            sortObj.class_id = capitalDatas.fcilityOne
            that.$refs.attrChild.loadsortData(sortObj, 0)
          } else if (capitalDatas.fcilityThr == '') {
            sortObj.class_id = capitalDatas.fcilityTwo
            that.$refs.attrChild.loadsortData(sortObj, 0)
          } else {
            sortObj.class_id = capitalDatas.fcilityThr
            that.$refs.attrChild.loadsortData(sortObj, 0)
          }
        }
      }
    },
    // 关闭属性弹框
    closeDialog () {
      let that = this
      that.attrDialogTils = ''
      that.attrDialogShow = false
      that.gwDialogTils = ''
      that.gwDialogShow = false
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
    // 新增位置
    addPositionClick () {
      let that = this
      that.form.positioning.push({
        x: '',
        y: '',
        h: ''
      })
    },
    // 删除位置
    removeRow (index) {
      let that = this
      that.form.positioning.splice(index, 1)
    },
    saveDatas () {
      let that = this
      that.$store.state.capitalDatas = that.form
    },
    // 生成资产标识码
    obtainCodeHandle () {
      let that = this
      let projectID = that.projectIDs
      let type = that.form.assetCodeType
      let classId = that.form.class_id
      let belongsAsset = that.form.facilities
      let mClass = that.form.faciliObj.mClass
      let categoryVal
      if (that.form.assetsType == '1') {
        categoryVal = 2
      }
      if (that.form.assetsType == '2') {
        categoryVal = 1
      }
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
    // 维护管网信息
    // @ts-ignore
    maintainGwClick (obj, i) {
      let that = this
      let capitalData = that.$store.state.capitalDatas
      if (capitalData.assetCodeVal != '') {
        that.gwDialogTils = '添加管网'
        that.gwDialogShow = true
      } else {
        that.$message({
          type: 'warning',
          message: '资产标识码不能为空！'
        })
      }
    },
    // 返回
    caceled () {
      let that = this
      let options = that.$store.state.options
      if (that.$store.state.capitalAdd == true) {
        for (var i = 0; i < options.length; i++) {
          if (options[i].route == '/capitaladd') {
            that.$store.commit('set_active_index', options[i])
            that.$router.push({'path': '/capitalMage'})
          }
        }
        that.$store.state.capitalAdd = false
        that.$store.commit('delete_tabs', '/capitaladd')
      }
      that.$store.state.capitalLinks = ''
      that.$store.state.capitalDatas = ''
      that.$store.state.capitAttrDats = ''
    },
    // 保持提交
    // @ts-ignore
    subimt (num) {
      let that = this
      let capitalLinks = that.$store.state.capitalLinks
      let capitAttrDats = that.$store.state.capitAttrDats
      let datasObjArray = []
      if (typeof capitAttrDats === 'object') {
        for (var i = 0; i < capitAttrDats.length; i++) {
          let item = capitAttrDats[i]
          let o = 0
          for (; o < item.data.length;) {
            let obj = item.data[o]
            let va = obj.attribute_name.va
            var objArray = {}
            objArray.attribute_name_id = obj.attribute_name_id
            objArray.attribute_name = obj.attribute_name.name
            objArray.type = obj.attribute_name.type
            if (obj.attribute_name.attached != undefined) {
              objArray.attached = obj.attribute_name.attached
            } else {
              objArray.attached = ''
            }
            if (obj.attribute_name.type == 3) {
              objArray.attribute_value = ''
              objArray.attribute_value_id = va.toString()
              objArray.attribute_value = obj.attribute_name.valueName
              datasObjArray.push(objArray)
            } if (obj.attribute_name.type == 4) {
              objArray.attribute_value = obj.attribute_name.valueName
              if (va == null) {
                objArray.attribute_value_id = ''
              } else {
                objArray.attribute_value_id = va
              }
              datasObjArray.push(objArray)
            } else if (obj.attribute_name.type == 9) {
              let va = obj.attribute_name.files
              let filesArray = []
              for (var s = 0; s < va.length; s++) {
                var id = va[s].id
                filesArray.push(id.toString())
              }
              objArray.attribute_value = ''
              objArray.attribute_value_id = filesArray.toString()
              datasObjArray.push(objArray)
            } else if (obj.attribute_name.type == 1 || obj.attribute_name.type == 5) {
              if (obj.attribute_name.va == null) {
                objArray.attribute_value = ''
              } else {
                objArray.attribute_value = obj.attribute_name.va
              }
              objArray.attribute_value_id = ''
              datasObjArray.push(objArray)
            }
            o++
          }
        }
      }
      if (capitalLinks == 'add') {
        let positiontype = '3'
        let filsLists = []
        let userID = that.form.user_id
        for (var i = 0; i < that.form.fileList.length; i++) {
          var lval = that.form.fileList[i].id
          filsLists.push(lval)
        }
        if (userID == '' || userID == null) {
          that.$message({
            message: '请需要先绑定工作人员！',
            type: 'error'
          })
          return false
        }
        addAssetOne(
          that.projectIDs,
          that.form.eqCode,
          that.form.assetsType,
          that.form.name,
          // 设施分类大中小
          that.form.fcilityOne,
          that.form.fcilityTwo,
          that.form.fcilityThr,
          // 设备分类大中小
          that.form.equipmentOne,
          that.form.equipmentTwo,
          that.form.equipmentThr,
          // 所属设施名称id
          that.form.facilities,
          that.form.positioning[0].x,
          that.form.positioning[0].y,
          that.form.positioning[0].h,
          // 资产标识码
          that.form.assetCodeVal,
          // 关联开始结束
          that.form.startZc,
          that.form.endZc,
          num,
          filsLists.toString(),
          positiontype,
          that.form.class_id,
          datasObjArray,
          userID,
          that.form.type,
          that.form.class_type,
          that.form.positioning,
          JSON.stringify(that.form.jsonCode),
          that.form.note
        ).then(data => {
          if (data.code == 200) {
            that.$message({
              message: data.message,
              type: 'success'
            })
            that.caceled()
          } else {
            that.$message({
              message: data.message,
              type: 'warning'
            })
          }
        }).catch(error => {
          that.$message({
            message: error.message,
            type: 'warning'
          })
        })
      }
    }
  }
}
</script>
<style scoped>
@import url('../../css/capital.css');
</style>
