<template>
  <div class="projectWarp">
    <div class="addPorject">
        <h4 class="titleH4"><i @click="caceled" class="el-icon-arrow-left gotoListIcon"></i>
          {{titleProject}}
        </h4>
        <div class="formMain">
            <el-form :model="form" label-width="200px" label-position="right" ref="form" style="width:100%;marign:0 auto;">
              <inputTest title="项目名称" @inputVals="nameVal" :inputTest="form.name" :disabd="disabdVals"></inputTest>
              <inputTest title="项目代码" @inputVals="codeVal" :inputTest="form.code" :maxNum="20" :disabd="disabdVals"></inputTest>
              <inputTest title="项目简称" @inputVals="referVal" :inputTest="form.referred" :maxNum="20" :disabd="disabdVals"></inputTest>
              <inputTest title="公司名称" @inputVals="companyVal" :inputTest="form.company" :disabd="disabdVals"></inputTest>
              <inputselect title="省域（选项：省）" :selectVals="form.province" :disabd="disabdVals" optionVals="value"
                :typeData="form.provinceData" @selectVals="provinceVal">
              </inputselect>
              <inputTest title="地点（省、市）" @inputVals="addressVal" :inputTest="form.address" :disabd="disabdVals"></inputTest>
              <inputselect title="类型" :selectVals="form.type" :disabd="disabdVals" optionVals="value"
                :typeData="form.typeData" @selectVals="typeVal">
              </inputselect>
              <inputselect title="商业模式" :selectVals="form.mod" :disabd="disabdVals" optionVals="value"
                :typeData="form.modData" @selectVals="modVal">
              </inputselect>
              <times title="中标日期" :signing_time="form.signing_time" @timesVals="timesVal" :disabd="disabdVals"></times>
              <inputTest title="投资总额（万元）" @inputVals="conAmountVal" :inputTest="form.contact_amount" :disabd="disabdVals"></inputTest>
              <inputselect title="进展" :selectVals="form.progress" :disabd="disabdVals" optionVals="value"
                :typeData="form.progressData" @selectVals="progressVal">
              </inputselect>
              <inputTest title="资产信息管理专员" @inputVals="headVal" :inputTest="form.head" :disabd="disabdVals"></inputTest>
              <inputTest title="联系方式" @inputVals="telVal" :maxNum="11" :inputTest="form.tel" :disabd="disabdVals"></inputTest>
              <inputselect title="数据质量等级（自评）" :selectVals="form.zp" :disabd="disabdVals" optionVals="value"
                :typeData="form.zpData" @selectVals="zpVal">
              </inputselect>
              <inputselect title="数据质量等级（第三方）" :selectVals="form.fzp" :disabd="disabdVals" optionVals="value"
               :typeData="form.fzpData" @selectVals="fzpVal">
              </inputselect>
              <inputTest title="SRID" @inputVals="sridVal" :inputTest="form.srid" :disabd="disabdVals"></inputTest>
              <inputTest title="备注" inptType="textarea" @inputVals="IntroductionVal" :maxNum="200" :inputTest="form.Introduction" :disabd="disabdVals"></inputTest>
            </el-form>
        </div>
        <div class="footerButn">
            <div class="footer">
              <button class="buttonClose" @click="caceled">返 回</button>
              <button class="buttonSave ml15" v-show="this.$store.state.prejackInction != 'views'" @click="submit">保 存</button>
              <div class="clear"></div>
            </div>
        </div>
      </div>
  </div>
</template>
<script>
import {addProject, updateProject} from '../../api/index'
import inputTest from '../formtable/inputtext.vue'
import inputselect from '../formtable/inputselect.vue'
import times from '../formtable/times.vue'
export default {
  name: 'addOrEditCategory',
  components: {inputTest, inputselect, times},
  data () {
    return {
      titleProject: '',
      form: {
        disabdVals: false,
        id: '',
        name: '',
        code: '',
        srid: '',
        referred: '',
        company: '',
        province: '',
        provinceData: [
          { name: '北京', value: '北京' },
          { name: '天津', value: '天津' },
          { name: '上海', value: '上海' },
          { name: '重庆', value: '重庆' },
          { name: '新疆', value: '新疆' },
          { name: '西藏', value: '西藏' },
          { name: '宁夏', value: '宁夏' },
          { name: '内蒙古', value: '内蒙古' },
          { name: '重庆', value: '重庆' },
          { name: '广西', value: '广西' },
          { name: '黑龙江', value: '黑龙江' },
          { name: '吉林', value: '吉林' },
          { name: '辽宁', value: '辽宁' },
          { name: '河北', value: '河北' },
          { name: '山东', value: '山东' },
          { name: '江苏', value: '江苏' },
          { name: '安徽', value: '安徽' },
          { name: '浙江', value: '浙江' },
          { name: '福建', value: '福建' },
          { name: '广东', value: '广东' },
          { name: '海南', value: '海南' },
          { name: '云南', value: '云南' },
          { name: '贵州', value: '贵州' },
          { name: '湖南', value: '湖南' },
          { name: '四川', value: '四川' },
          { name: '湖北', value: '湖北' },
          { name: '河南', value: '河南' },
          { name: '山西', value: '山西' },
          { name: '陕西', value: '陕西' },
          { name: '甘肃', value: '甘肃' },
          { name: '青海', value: '青海' },
          { name: '江西', value: '江西' },
          { name: '台湾', value: '台湾' },
          { name: '香港', value: '香港' },
          { name: '澳门', value: '澳门' }],
        address: '',
        type: '',
        typeID: '',
        typeData: [
          {
            'name': '海绵城市',
            'value': '1'
          },
          {
            'name': '村镇污水',
            'value': '2'
          },
          {
            'name': '黑臭水体',
            'value': '3'
          },
          {
            'name': '水环境治理',
            'value': '4'
          }
        ],
        mod: '',
        modID: '',
        modData: [
          {
            'name': 'PPP',
            'value': '1'
          },
          {
            'name': 'EPCO',
            'value': '2'
          }
        ],
        zp: '',
        zpID: '',
        zpData: [
          {
            'name': '合格',
            'value': '1'
          },
          {
            'name': '不合格',
            'value': '2'
          }
        ],
        fzp: '',
        fzpID: '',
        fzpData: [
          {
            'name': '合格',
            'value': '1'
          },
          {
            'name': '不合格',
            'value': '2'
          }
        ],
        signing_time: '',
        contact_amount: '',
        progress: '',
        progressData: [
          {
            'name': '筹备期',
            'value': '1'
          },
          {
            'name': '建设期',
            'value': '2'
          },
          {
            'name': '运营期',
            'value': '3'
          }
        ],
        head: '',
        tel: '',
        Introduction: ''
      }
    }
  },
  mounted () {
    let that = this
    let datas = that.$store.state.prejackDatas
    let prejackInction = that.$store.state.prejackInction
    let prejackDatasMody = that.$store.state.prejackDatasMody
    if (prejackInction == 'mody') {
      that.titleProject = '修改项目'
      that.disabdVals = false
      that.projectDatas(prejackDatasMody)
      if (datas != '') {
        that.form.name = datas.name
        that.form.code = datas.code
        that.form.referred = datas.referred
        that.form.company = datas.company
        that.form.province = datas.province
        that.form.address = datas.address
        that.form.type = datas.type
        that.form.mod = datas.mod
        that.form.signing_time = datas.signing_time
        that.form.contact_amount = datas.contact_amount
        that.form.progress = datas.progress
        that.form.head = datas.head
        that.form.tel = datas.tel
        that.form.Introduction = datas.Introduction
        that.form.zp = datas.zp
        that.form.fzp = datas.fzp
        that.form.srid = datas.srid
      }
    } else if (prejackInction == 'views') {
      that.titleProject = '查看项目详情'
      that.disabdVals = true
      that.projectDatas(prejackDatasMody)
    } else if (prejackInction == 'add') {
      that.titleProject = '添加项目'
      that.disabdVals = false
      if (datas != '') {
        that.form.name = datas.name
        that.form.code = datas.code
        that.form.referred = datas.referred
        that.form.company = datas.company
        that.form.province = datas.province
        that.form.address = datas.address
        that.form.type = datas.type
        that.form.mod = datas.mod
        that.form.signing_time = datas.signing_time
        that.form.contact_amount = datas.contact_amount
        that.form.progress = datas.progress
        that.form.head = datas.head
        that.form.tel = datas.tel
        that.form.Introduction = datas.Introduction
        that.form.zp = datas.zp
        that.form.fzp = datas.fzp
        that.form.srid = datas.srid
      } else {
        that.form.name = ''
        that.form.code = ''
        that.form.referred = ''
        that.form.company = ''
        that.form.province = ''
        that.form.address = ''
        that.form.type = ''
        that.form.mod = ''
        that.form.signing_time = ''
        that.form.contact_amount = ''
        that.form.progress = ''
        that.form.head = ''
        that.form.tel = ''
        that.form.Introduction = ''
        that.form.zp = ''
        that.form.fzp = ''
        that.form.srid = ''
      }
    }
  },
  methods: {
    projectDatas (datasObj) {
      let that = this
      let datas = datasObj
      that.form.id = datas.id
      that.form.name = datas.name
      that.form.code = datas.code
      that.form.referred = datas.referred
      that.form.company = datas.company
      that.form.province = datas.province
      that.form.address = datas.address
      if (datas.type != 0) {
        if (datas.type == 1) {
          that.form.type = '海绵城市'
          that.form.typeID = datas.type
        } else if (datas.type == 2) {
          that.form.type = '村镇污水'
          that.form.typeID = datas.type
        } else if (datas.type == 3) {
          that.form.type = '黑臭水体'
          that.form.typeID = datas.type
        } else if (datas.type == 4) {
          that.form.type = '水环境治理'
          that.form.typeID = datas.type
        }
      }
      if (datas.mod != 0) {
        if (datas.mod == 1) {
          that.form.mod = 'PPP'
          that.form.modID = datas.mod
        } else if (datas.mod == 2) {
          that.form.mod = 'EPCO'
          that.form.modID = datas.mod
        }
      }
      if (datas.signing_time != '0000-00-00 00:00:00') {
        that.form.signing_time = datas.signing_time
      }
      that.form.contact_amount = datas.contact_amount
      if (datas.progress != 0) {
        if (datas.progress == 1) {
          that.form.progress = '筹备期'
          that.form.progressID = datas.progress
        } else if (datas.progress == 2) {
          that.form.progress = '建设期'
          that.form.progressID = datas.progress
        } else if (datas.progress == 3) {
          that.form.progress = '运营期'
          that.form.progressID = datas.progress
        }
      }
      that.form.head = datas.head
      that.form.tel = datas.tel
      that.form.Introduction = datas.Introduction
      if (datas.data_quality_my != 0) {
        if (datas.data_quality_my == 1) {
          that.form.zp = '合格'
          that.form.zpID = datas.data_quality_my
        } else {
          that.form.zp = '不合格'
          that.form.zpID = datas.data_quality_my
        }
      }
      if (datas.data_quality_party != 0) {
        if (datas.data_quality_party == 1) {
          that.form.fzp = '合格'
          that.form.fzpID = datas.data_quality_party
        } else {
          that.form.fzp = '不合格'
          that.form.fzpID = datas.data_quality_party
        }
      }
      that.form.srid = datas.srid
    },
    nameVal (val) {
      let that = this
      that.form.name = val
      that.$store.state.prejackDatas = that.form
    },
    codeVal (val) {
      let that = this
      that.form.code = val
      that.$store.state.prejackDatas = that.form
    },
    referVal (val) {
      let that = this
      that.form.referred = val
      that.$store.state.prejackDatas = that.form
    },
    companyVal (val) {
      let that = this
      that.form.company = val
      that.$store.state.prejackDatas = that.form
    },
    provinceVal (val) {
      let that = this
      that.form.province = val
      that.$store.state.prejackDatas = that.form
    },
    addressVal (val) {
      let that = this
      that.form.address = val
      that.$store.state.prejackDatas = that.form
    },
    typeVal (val) {
      let that = this
      that.form.type = val
      that.form.typeID = val
      that.$store.state.prejackDatas = that.form
    },
    modVal (val) {
      let that = this
      that.form.mod = val
      that.form.modID = val
      that.$store.state.prejackDatas = that.form
    },
    conAmountVal (val) {
      let that = this
      that.form.contact_amount = val
      that.$store.state.prejackDatas = that.form
    },
    progressVal (val) {
      let that = this
      that.form.progress = val
      that.form.progressID = val
      that.$store.state.prejackDatas = that.form
    },
    headVal (val) {
      let that = this
      that.form.head = val
      that.$store.state.prejackDatas = that.form
    },
    telVal (val) {
      let that = this
      that.form.tel = val
      that.$store.state.prejackDatas = that.form
    },
    zpVal (val) {
      let that = this
      that.form.zp = val
      that.form.zpID = val
      that.$store.state.prejackDatas = that.form
    },
    fzpVal (val) {
      let that = this
      that.form.fzp = val
      that.form.fzpID = val
      that.$store.state.prejackDatas = that.form
    },
    sridVal (val) {
      let that = this
      that.form.srid = val
      that.$store.state.prejackDatas = that.form
    },
    IntroductionVal (val) {
      let that = this
      that.form.Introduction = val
      that.$store.state.prejackDatas = that.form
    },
    timesVal (val) {
      let that = this
      that.form.signing_time = val
      that.$store.state.prejackDatas = that.form
    },
    submit () {
      // 提交
      let that = this
      let name = that.form.name
      let code = that.form.code
      if (name == '' || name == undefined || name == null) {
        that.$message({
          message: '项目名称不能为空！',
          type: 'warning'
        })
      } else if (code == '' || code == undefined || code == null) {
        that.$message({
          message: '项目编码不能为空！',
          type: 'warning'
        })
      } else {
        let prejackInction = that.$store.state.prejackInction
        if (prejackInction == 'add') {
          addProject(
            that.form.name,
            that.form.code,
            that.form.referred,
            that.form.company,
            that.form.province,
            that.form.address,
            that.form.type,
            that.form.mod,
            that.form.signing_time,
            that.form.contact_amount,
            that.form.progress,
            that.form.head,
            that.form.tel,
            that.form.Introduction,
            that.form.zp,
            that.form.fzp,
            that.form.srid
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
        } else {
          updateProject(
            that.form.id,
            that.form.name,
            that.form.code,
            that.form.referred,
            that.form.company,
            that.form.province,
            that.form.address,
            that.form.typeID,
            that.form.modID,
            that.form.signing_time,
            that.form.contact_amount,
            that.form.progressID,
            that.form.head,
            that.form.tel,
            that.form.Introduction,
            that.form.srid,
            that.form.zpID,
            that.form.fzpID
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
    },
    caceled () {
      let that = this
      let options = that.$store.state.options
      if (that.$store.state.projectAdd == true) {
        for (var i = 0; i < options.length; i++) {
          if (options[i].route == '/projectadd') {
            that.$store.commit('set_active_index', options[i])
            that.$router.push({'path': '/projectmage'})
          }
        }
        that.$store.state.projectAdd = false
        that.$store.commit('delete_tabs', '/projectadd')
      }
      that.$store.state.prejackDatas = ''
      that.$store.state.prejackDatasMody = ''
      that.$store.state.prejackInction = ''
    }
  }
}
</script>
