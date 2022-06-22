<template>
    <div class="attrDialog">
      <el-dialog :title="tils" fullscreen="true" :before-close="handleClose" :visible.sync="attrDialogVisible">
        <div>
          <div class="sortTabsbd">
            <div class="sortTabsClas">
                <ul class="sortmobilyTabs">
                    <li v-for="(item,i) in attrForm"
                        :key="i" @click="sortArrtClick(i)"
                        :class="{cur:i==tabNum,bor:i==7}">{{item.name}}</li>
                </ul>
            </div>
            <div class="clear"></div>
          </div>

          <div class="sortAttrCont" v-for="(item,i) in attrFormData" :key="i">
            <div class="sortAttrContSign" :class="{disBlock:i==tabNum}" >
                <el-form id="form" name="myForm" label-width="200px">
                    <template v-for="(item ,i) in item.data">
                        <el-form-item
                            :label="item.attribute_name.name"
                            v-if="item.attribute_name.type == 1">
                            <el-input v-model="item.attribute_name.va" style="width:90%" :maxlength="item.attribute_name.field_length"
                            :disabled="item.attribute_name.slug == 'up_asset' || item.attribute_name.slug == 'down_asset' || item.attribute_name.slug == 'up_section' || item.attribute_name.slug == 'down_section' ? true :false"
                            @input="changeIput(item.attribute_name)"
                            :placeholder="(item.attribute_name.pleasehold != null && item.attribute_name.pleasehold != '') ? item.attribute_name.pleasehold : '请输入'"></el-input>
                            <el-tooltip class="item" effect="dark"
                                v-if="(item.attribute_name.describe != null && item.attribute_name.describe != '') ? true:false"
                                :content="item.attribute_name.describe" placement="top-end">
                                <i class="el-icon-info blue"></i>
                            </el-tooltip>
                        </el-form-item>
                        <el-form-item
                            :label="item.attribute_name.name"
                            v-if="item.attribute_name.type == 2">
                            <el-radio v-for="(itemInfo,i) in item.attribute_value"
                                :key="i" v-model="item.attribute_name.va" :id="itemInfo.id" :label="itemInfo.id">{{itemInfo.value}}
                            </el-radio>
                            <el-tooltip class="item" effect="dark"
                                v-if="(item.attribute_name.describe != null && item.attribute_name.describe != '') ? true:false"
                                :content="item.attribute_name.describe" placement="top-end">
                                <i class="el-icon-info blue"></i>
                            </el-tooltip>
                        </el-form-item>
                        <el-form-item
                            :label="item.attribute_name.name"
                            v-if="item.attribute_name.type == 3">
                            <el-checkbox-group v-model="item.attribute_name.va">
                                <el-checkbox v-for="(itemInfo, i) in item.attribute_value"
                                @change="function (res,name) { return checkBoxChange(res,itemInfo.value,item) }"
                                :key="i" :id="itemInfo.id"
                                :value="itemInfo.id"
                                :label="itemInfo.id">{{itemInfo.value}}</el-checkbox>
                            </el-checkbox-group>
                            <el-tooltip class="item" effect="dark"
                                v-if="(item.attribute_name.describe != null && item.attribute_name.describe != '') ? true:false"
                                :content="item.attribute_name.describe" placement="top-end">
                                <i class="el-icon-info blue"></i>
                            </el-tooltip>
                            <input class="iputClass" style="width:90%"  v-model="item.attribute_name.attached"
                            v-show="item.attribute_name.slug == 'other' && item.attribute_name.valueName == '其他，并注明'"
                            placeholder="请输入">
                        </el-form-item>
                        <el-form-item
                            :label="item.attribute_name.name"
                            v-if="item.attribute_name.type == 4">
                            <el-select style="width:90%" clearable
                            @change="function (res) { return selectChange(res,item) }"
                            :placeholder="(item.attribute_name.pleasehold != null && item.attribute_name.pleasehold != '') ? item.attribute_name.pleasehold : '请选择'" v-model="item.attribute_name.va">
                                <el-option
                                v-for="(itemInfo,i) in item.attribute_value"
                                :key="itemInfo.id"
                                :label="itemInfo.value"
                                :value="itemInfo.id">
                                </el-option>
                            </el-select>
                            <el-tooltip class="item" effect="dark"
                                v-if="(item.attribute_name.describe != null && item.attribute_name.describe != '') ? true:false"
                                :content="item.attribute_name.describe" placement="top-end">
                                <i class="el-icon-info blue"></i>
                            </el-tooltip>
                            <input class="iputClass" style="width:90%"  v-model="item.attribute_name.attached"
                            v-show="item.attribute_name.slug == 'other' && item.attribute_name.valueName == '其他，并注明'"
                            placeholder="请输入">
                        </el-form-item>
                        <el-form-item
                            :label="item.attribute_name.name"
                            v-if="item.attribute_name.type == 5">
                                <el-date-picker v-model="item.attribute_name.va" v-if="item.attribute_name.slug == 'dates'"
                                    type="datetime" style="width:90%"
                                    @change="function (res) { return timerChange(res, item)}"
                                    format="yyyy-MM-dd HH:mm:ss"
                                    value-format="yyyy-MM-dd HH:mm:ss"
                                    :placeholder="(item.attribute_name.pleasehold != null && item.attribute_name.pleasehold != '') ? item.attribute_name.pleasehold : '选择日期'">
                                </el-date-picker>
                                <el-date-picker v-model="item.attribute_name.va" v-else
                                    type="date" style="width:90%"
                                    @change="function (res) { return timerChange(res, item)}"
                                    format="yyyy-MM-dd"
                                    value-format="yyyy-MM-dd"
                                    :placeholder="(item.attribute_name.pleasehold != null && item.attribute_name.pleasehold != '') ? item.attribute_name.pleasehold : '选择日期'">
                                </el-date-picker>
                                <el-tooltip class="item" effect="dark"
                                    v-if="(item.attribute_name.describe != null && item.attribute_name.describe != '') ? true:false"
                                    :content="item.attribute_name.describe" placement="top-end">
                                    <i class="el-icon-info blue"></i>
                                </el-tooltip>
                        </el-form-item>
                        <el-form-item
                            :label="item.attribute_name.name"
                            v-if="item.attribute_name.type == 6">
                            <el-input type="textarea" style="width:90%"  v-model="item.attribute_name.va" placeholder="请输入"></el-input>
                            <el-tooltip class="item" effect="dark"
                                v-if="(item.attribute_name.describe != null && item.attribute_name.describe != '') ? true:false"
                                :content="item.attribute_name.describe" placement="top-end">
                                <i class="el-icon-info blue"></i>
                            </el-tooltip>
                        </el-form-item>
                        <el-form-item
                            :label="item.attribute_name.name"
                            v-if="item.attribute_name.type == 7">
                                <el-input type="number" v-model="item.attribute_name.va" placeholder="请输入"></el-input>
                        </el-form-item>
                        <!-- 本地 action="http://39.96.41.159:8287/oss/img" -->
                        <!-- 线上 action="http://101.200.40.167/oss/img" -->
                        <el-form-item
                            :label="item.attribute_name.name"
                            v-if="item.attribute_name.type == 9">
                            <el-upload
                                name="file"
                                class="upload-demo"
                                action=""
                                :show-file-list="false"
                                :http-request="function (res, file) { return fnUploadRequest(res, file, item)}"
                                multiple="20"
                                :before-upload="beforeAvatarUpload">
                                <el-button size="small" type="primary">点击上传</el-button>
                                <el-tooltip class="item" effect="dark"
                                    v-if="(item.attribute_name.describe != null && item.attribute_name.describe != '') ? true:false"
                                    :content="item.attribute_name.describe" placement="top-end">
                                    <i class="el-icon-info blue"></i>
                                </el-tooltip>
                            </el-upload>
                            <el-progress :percentage="progress"
                                            :stroke-width="15"
                                            :text-inside="true"
                                            v-show="item.attribute_name.showProgress">
                            </el-progress>
                            <ul class="uploadListAttr">
                                <li v-for="(list,i) in item.attribute_name.files" :key="i">
                                    <span class="deleteIcon rf" @click="handleRemove(i,item)"><i class="el-icon-close"></i></span>
                                    <span><i class="el-icon-document mr8"></i>{{list.name}}</span>
                                </li>
                            </ul>
                        </el-form-item>
                    </template>
                </el-form>
            </div>
          </div>
        </div>
        <div class="footerButn">
          <div class="buttonClose" @click="saveAttrBtn">返回</div>
        </div>
      </el-dialog>
    </div>
</template>
<script>
import {detailClassification, aliSts, uploadFile, projectInfo, gisCla} from '../../api/index'
export default {
  name: 'attrDialogs',
  data () {
    return {
      upLoadUrl: '',
      cookieVal: '',
      projectID: '',
      title: '',
      sortTabsShow: false,
      attrForm: '',
      tabNum: 0,
      input: '',
      attrFormData: '',
      imageUrl: '',
      dialogImageUrl: '',
      dialogVisible: false,
      paramsImgData: {
        dir: 'attachment'
      },
      uploadArray: [],
      setOss: {
        accessId: '',
        accessKey: '',
        stsToken: ''
      },
      srid: '',
      gqcdVal: '',
      progress: 0 // 进度条数据
    }
  },
  props: {
    tils: '',
    attrDialogVisible: false
  },
  created () {
    let that = this
    let local = localStorage.getItem('cookiesDatas')
    let cookiesDatas = JSON.parse(local)
    that.upLoadUrl = that.$store.state.baseFileUrl
    that.cookieVal = cookiesDatas.UserToken
  },
  methods: {
    init (data) {
      let that = this
      for (let i = 0; i < data.length; i++) {
        let item = data[i]
        let o = 0
        for (; o < item.data.length;) {
          let obj = item.data[o]
          switch (obj.attribute_name.type) {
            case 3:
              obj.attribute_name.va = []
              break
            case 8:
              obj.attribute_name.va = []
              break
            case 9:
              obj.attribute_name.va = []
              obj.attribute_name.files = []
              break
            case 2:
              obj.attribute_name.va = ''
              break
          }
          o++
        }
      }
      that.attrFormData = data
      let capitalLinks = that.$store.state.capitalLinks // 链接
      let capitalDatas = that.$store.state.capitalDatas // 资产数据
      let capitAttrDats = that.$store.state.capitAttrDats // 属性
      if (capitalLinks == 'add') {
        if (capitAttrDats.length > 0) {
          for (var i = 0; i < capitAttrDats.length; i++) {
            var attrDat = capitAttrDats[i].data
            var hattrDat = that.attrFormData[i].data
            if (attrDat.length > 0) {
              for (var j = 0; j < attrDat.length; j++) {
                hattrDat[j].attribute_name.attached = attrDat[j].attribute_name.attached
                hattrDat[j].attribute_name.valueName = attrDat[j].attribute_name.valueName
                hattrDat[j].attribute_name.slug = attrDat[j].attribute_name.slug
                if (hattrDat[j].attribute_name.type == 4 || hattrDat[j].attribute_name.type == 3 || hattrDat[j].attribute_name.type == 5) {
                  hattrDat[j].attribute_name.va = attrDat[j].attribute_name.va
                } else if (hattrDat[j].attribute_name.type == 1) {
                  if (attrDat[j].attribute_name.slug == 'up_asset') {
                    hattrDat[j].attribute_name.va = capitalDatas.startZc
                  } else if (attrDat[j].attribute_name.slug == 'down_asset') {
                    hattrDat[j].attribute_name.va = capitalDatas.endZc
                  } else if (attrDat[j].attribute_name.slug == 'down_section') {
                    hattrDat[j].attribute_name.va = capitalDatas.downYou.toString()
                  } else if (attrDat[j].attribute_name.slug == 'up_section') {
                    hattrDat[j].attribute_name.va = capitalDatas.upYou.toString()
                  } else {
                    hattrDat[j].attribute_name.va = attrDat[j].attribute_name.va
                  }
                } else if (hattrDat[j].attribute_name.type == 9) {
                  hattrDat[j].attribute_name.va = attrDat[j].attribute_name.va
                  hattrDat[j].attribute_name.files = attrDat[j].attribute_name.files
                }
              }
            }
          }
        }
      }
    },
    // 属性tab
    sortArrtClick (num) {
      let that = this
      that.tabNum = num
    },
    changeIput (val) {
      let that = this
      // 判断字段长度和类别
      // let field_type = val.field_type
      // if (field_type == 2) {
      //   val.va = val.va.replace(/[^1-9]/g, '')
      // }
    },
    checkBoxChange (val, name, itms) {
      if (name == '其他，并注明') {
        if (val == true) {
          itms.attribute_name.valueName = '其他，并注明'
        } else {
          itms.attribute_name.valueName = ''
          itms.attribute_name.attached = ''
        }
      }
    },
    selectChange (val, itms) {
      let that = this
      let datas = itms.attribute_name.attr_values
      let attrFormData = that.attrFormData
      let PI = 3.1415926
      var obj = {}
      obj = datas.find(function (item) {
        return item.id == val
      })
      if (obj.value == '其他，并注明') {
        itms.attribute_name.valueName = '其他，并注明'
      } else {
        itms.attribute_name.valueName = ''
      }
      let slup = itms.attribute_name.attribute_code

      let fcsx2 = parseFloat(that.$store.state.fcsx112 / 1000)
      let fcsx3 = parseFloat(that.$store.state.fcsx113 / 1000)
      let fcsx4 = parseFloat(that.$store.state.fcsx114 / 1000)
      let fcsx5 = parseFloat(that.$store.state.fcsx115 / 1000)
      let fcsx6 = parseFloat(that.$store.state.fcsx116 / 1000)
      if (slup == 'fcsx111') {
        that.$store.state.shape = obj.value
        for (var i = 0; i < attrFormData.length; i++) {
          let datas = attrFormData[i].data
          for (var j = 0; j < datas.length; j++) {
            let attribute_name = datas[j].attribute_name
            let code = attribute_name.attribute_code
            if (obj.value == '圆形') {
              if (code == 'fcsx118') {
                let vaZh = PI * Math.pow((fcsx2 / 2), 2)
                attribute_name.va = vaZh.toFixed(2)
              }
            }
            if (obj.value == '梯形') {
              if (code == 'fcsx118') {
                let fcsx56 = fcsx5 + fcsx6
                let fcsx3X2 = Math.pow(fcsx3, 2)
                let vaZh = fcsx4 - (fcsx56 * fcsx3X2) / 2
                if (!isNaN(vaZh)) {
                  attribute_name.va = vaZh.toFixed(2)
                } else {
                  attribute_name.va = ''
                }
              }
            }
            if (obj.value == '三角形') {
              if (code == 'fcsx118') {
                let vaZh = (fcsx3 * fcsx4) / 2
                if (!isNaN(vaZh)) {
                  attribute_name.va = vaZh.toFixed(2)
                } else {
                  attribute_name.va = ''
                }
              }
            }
            if (obj.value == '椭圆形') {
              if (code == 'fcsx118') {
                let vaZh = PI * (fcsx3 * fcsx4) / 4
                if (!isNaN(vaZh)) {
                  attribute_name.va = vaZh.toFixed(2)
                } else {
                  attribute_name.va = ''
                }
              }
            }
            if (obj.value == '矩形') {
              if (code == 'fcsx118') {
                let vaZh = fcsx3 * fcsx4
                if (!isNaN(vaZh)) {
                  attribute_name.va = vaZh.toFixed(2)
                } else {
                  attribute_name.va = ''
                }
              }
            }
          }
        }
      }
    },
    timerChange (val, item) {
      item.attribute_name.va = val
    },
    // 图片回调
    beforeAvatarUpload (res) {
      let that = this
      let obj = {}
      aliSts(obj).then(res => {
        that.setOss.accessId = res.data.accessKeyId
        that.setOss.accessKey = res.data.accessKeySecret
        that.setOss.stsToken = res.data.token
      })
    },
    fnUploadRequest (options, file, item) {
      let that = this
      let sizeVal = options.file.size
      const isLt2M = sizeVal / 1024 / 1024 < 500
      if (!isLt2M) {
        that.$message.error('上传文件不能超过 500MB!')
        return false
      }
      setTimeout(function () {
        const OSS = require('ali-oss')
        const client = new OSS({
          accessKeyId: that.setOss.accessId,
          accessKeySecret: that.setOss.accessKey,
          bucket: 'shouchuangzichan',
          region: 'oss-cn-beijing',
          stsToken: that.setOss.stsToken
        })
        try {
          let file = options.file // 拿到 file
          let fileName = file.name
          let date = new Date().getTime()
          let fileNames = `${date}_${fileName}` // 拼接文件名，保证唯一，这里使用时间戳+原文件名
          // 上传文件,这里是上传到OSS的 uploads文件夹下
          client.multipartUpload(fileNames, file, {
            progress: function (p) {
              // p进度条的值
              item.attribute_name.showProgress = true
              that.progress = Math.floor(p * 100)
            }
          }).then(res => {
            if (res.res.status == 200) {
              let name = res.name
              let url = 'https://shouchuangzichan.oss-cn-beijing.aliyuncs.com/' + name
              uploadFile(
                name,
                url
              ).then(data => {
                if (data.code == 200) {
                  that.$message({
                    message: data.message,
                    type: 'success'
                  })
                  let obj = {}
                  obj.name = name
                  obj.url = url
                  obj.id = data.data.id
                  item.attribute_name.files.push(obj)
                  that.$forceUpdate()
                  item.attribute_name.showProgress = false
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
            } else {
              that.$message({
                message: '上传失败!',
                type: 'warning'
              })
            }
          })
        } catch (e) {
          options.onError('上传失败')
        }
      }, 500)
    },
    handleRemove (i, items) {
      let fileList = items.attribute_name.files
      fileList.splice(i, 1)
      this.$forceUpdate()
    },
    handleClose () {
      let that = this
      that.$emit('dialogShow', 'false')
    },
    saveAttrBtn () {
      let that = this
      that.$store.state.capitAttrDats = that.attrFormData
      that.$emit('dialogShow', 'false')
    },
    // 获取分类属性列表
    // @ts-ignore
    loadsortData (data, num, typeVal) {
      let that = this
      detailClassification(data).then(res => {
        // @ts-ignore
        if (res.code == 200) {
          that.attrForm = res.data
          that.init(that.attrForm)
        } else {
          if (typeVal !== 0) {
            that.$message({
              // @ts-ignore
              message: res.message,
              type: 'warning'
            })
          }
        }
      })
    }
  }
}
</script>
<style>
@import url('../../css/attrdialog.css');
</style>
