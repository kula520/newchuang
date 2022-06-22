<template>
    <div class="capitWarp">
        <div class="seachBox">
            <el-form :label-position="top" :model="ruleForm" ref="ruleForm">
                <div class="w20">
                    <inputText title="资产名称" @inputVals="asetNameFun" :inputTest="ruleForm.asetName"></inputText>
                </div>
                <div class="w20">
                    <inputText title="资产标识码" @inputVals="asetCodeFun" :inputTest="ruleForm.asetCode"></inputText>
                </div>
                <div class="w20">
                  <inputselect title="行政划区"
                    :typeData="ruleForm.adressDatas"
                    @selectVals="adressFun"
                    :disabd="disabdVals"
                    :selectVals="ruleForm.adress"
                    optionVals="name">
                  </inputselect>
                </div>
                <div class="w20">
                    <inputText title="用户名称" @inputVals="userNameFun" :inputTest="ruleForm.userName"></inputText>
                </div>
                <div class="w20">
                  <inputselect title="状态"
                    :typeData="ruleForm.startsData"
                    @selectVals="startsFun"
                    :disabd="disabdVals"
                    :selectVals="ruleForm.starts"
                    optionVals="name">
                  </inputselect>
                </div>
                <div class="w40">
                  <h4 class="seachTile">设施分类</h4>
                  <sortSelectSs
                    :outStyle="outStyle"
                    :selectType="2"
                    @ruleFormVal='ruleForSFun'
                    :ObjDatas='ruleForm.faciliObj'
                    :resetVal='resetValDatas'
                    >
                  </sortSelectSs>
                </div>
                <div class="w7">
                  <span class="bor" v-show="sheshiAll" @click="shesClick('0')"><span class="iconYuan"></span>全部</span>
                  <span class="bor borCheck" v-show="sheshiAllCheck" @click="shesClick('1')"><span class="el-icon-circle-check"></span>全部</span>
                </div>
                <div class="w40">
                  <h4 class="seachTile">设备分类</h4>
                  <sortSelectSB
                    :outStyle="outStyle"
                    :selectType="1"
                    @ruleFormVal='ruleForbFun'
                    :ObjDatas='ruleForm.equipObj'
                    :resetVal='resetValDatas'
                    >
                  </sortSelectSB>
                </div>
                <div class="w7">
                  <span class="bor" v-show="sheBeiAll" @click="sheBClick('0')"><span class="iconYuan"></span>全部</span>
                  <span class="bor borCheck" v-show="sheBeiAllCheck" @click="sheBClick('1')"><span class="el-icon-circle-check"></span>全部</span>
                </div>
                <div class="clear"></div>
            </el-form>
            <button class="buttonAll" @click="seachHandle">搜 索</button>
            <button class="buttonAll ml15" @click="resetHandle">重 置</button>
        </div>
        <div class="pages matb">
            <button class="buttonAll lf" @click="addPrejectClick('','add')">添加</button>
            <pageNum :totals="total" :seachDatas="ruleForm" :adressID="projectIDs">
            </pageNum>
            <div class="clear"></div>
        </div>
        <div>
        <el-table
          class="tableClass"
          :data="tableData"
          ref="multipleTable"
          stripe
          height="600px"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" align="center" width="60">
          </el-table-column>
          <el-table-column width="200" prop="asset_code" label="标识码" align="center">
          </el-table-column>
          <el-table-column
            prop="name"
            width="250"
            label="资产名称"
            align="center">
          </el-table-column>

          <el-table-column width="150" label="资产类型" align="center">
            <template slot-scope="scope">
              <p v-if="scope.row.category == 2">设施资产</p>
              <p v-if="scope.row.category == 1">设备资产</p>
            </template>
          </el-table-column>
          <el-table-column width="250" label="资产分类" align="center">
            <template slot-scope="scope">
              <p v-if="scope.row.f_big_class != null">
                {{ scope.row.f_big_class.name }}
              </p>
              <p v-if="scope.row.f_middle_class != null">
                {{ scope.row.f_middle_class.name }}
              </p>
              <p v-if="scope.row.f_small_class != null">
                {{ scope.row.f_small_class.name }}
              </p>

              <p v-if="scope.row.e_big_class != null">
                {{ scope.row.e_big_class.name }}
              </p>
              <p v-if="scope.row.e_middle_class != null">
                {{ scope.row.e_middle_class.name }}
              </p>
              <p v-if="scope.row.e_small_class != null">
                {{ scope.row.e_small_class.name }}
              </p>
            </template>
          </el-table-column>
          <el-table-column
            prop="updated_at"
            width="250"
            label="最后盘点时间"
            align="center"
          >
          </el-table-column>
          <el-table-column width="150" label="状态" align="center">
            <template slot-scope="scope">
              <p v-if="scope.row.status == '1'">审核通过</p>
              <p v-if="scope.row.status == '2'">待审核</p>
              <p v-if="scope.row.status == '3'">暂存</p>
              <p v-if="scope.row.status == '4'">审核驳回</p>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <span class="tipBtn bj1" >查看</span>
              <span class="tipBtn">修改</span>
              <el-dropdown>
                <span class="tipBtnMove">
                  更多<i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item><span class="dispSpan">设置模板</span></el-dropdown-item>
                  <el-dropdown-item><span class="dispSpan">修改创建人</span></el-dropdown-item>
                  <el-dropdown-item><span class="dispSpan">
                    <span v-if="scope.row.status != '2'"
                      >删除</span>
                    </span>
                  </el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
</template>
<script>
import pageNum from '../compents/pages.vue'
import inputText from '../formtable/inputtext.vue'
import inputselect from '../formtable/inputselect.vue'
import sortSelectSs from '../compents/sortSelectSs.vue'
import sortSelectSB from '../compents/sortSelectSB.vue'
import {
  listAsset, projectList, delAsset, setOften, listAreas, listUser, upCreator
} from '../../api/index'
export default {
  name: 'capitMage',
  components: {pageNum, inputText, inputselect, sortSelectSs, sortSelectSB},
  data () {
    return {
      // 组件样式
      outStyle: {
        width: '28%',
        margin: '0 10px 0 0'
      },
      sheshiAll: true,
      sheshiAllCheck: false,
      sheBeiAll: true,
      sheBeiAllCheck: false,
      ruleForm: {
        asetName: '',
        asetCode: '',
        adress: '',
        adressDatas: '',
        userName: '',
        starts: '',
        class_id: '',
        // 设施分类
        facilities_big_class: '',
        facilities_middle_class: '',
        facilities_small_class: '',
        faciliObj: 1,
        // 设备分类
        equipment_big_class: '',
        equipment_middle_class: '',
        equipment_small_class: '',
        equipObj: '',
        f_all: '',
        e_all: '',
        startsData: [
          {
            id: '1',
            name: '审核通过'
          },
          {
            id: '2',
            name: '待审核'
          },
          {
            id: '3',
            name: '暂存'
          },
          {
            id: '4',
            name: '审核驳回'
          }
        ]
      },
      projectIDs: '',
      // 列表页table
      tableData: [],
      total: 100,
      resetValDatas: 1
    }
  },
  created () {
    let that = this
    let local = localStorage.getItem('cookiesDatas')
    let cookiesDatas = JSON.parse(local)
    let projectID = cookiesDatas.projectID
    that.projectIDs = projectID
    let objArea = {}
    objArea.id = projectID
    objArea.page_num = 100
    objArea.page_size = 1
    that.loadDataAdress(objArea)
    let capitalSeachDatas = that.$store.state.capitalSeachDatas
    if (capitalSeachDatas != '') {
      console.log(capitalSeachDatas)
      that.ruleForm.asetName = capitalSeachDatas.asetName
      that.ruleForm.asetCode = capitalSeachDatas.asetCode
      that.ruleForm.adress = capitalSeachDatas.adress
      that.ruleForm.starts = capitalSeachDatas.starts
      that.ruleForm.userName = capitalSeachDatas.userName
      that.ruleForm.faciliObj = capitalSeachDatas.faciliObj
      that.ruleForm.equipObj = capitalSeachDatas.equipObj
      that.ruleForm.class_id = capitalSeachDatas.class_id
      that.ruleForm.f_all = capitalSeachDatas.f_all
      that.ruleForm.e_all = capitalSeachDatas.e_all
      that.ruleForm.facilities_big_class = capitalSeachDatas.facilities_big_class
      that.ruleForm.facilities_middle_class = capitalSeachDatas.facilities_middle_class
      that.ruleForm.facilities_small_class = capitalSeachDatas.facilities_small_class
      that.ruleForm.equipment_big_class = capitalSeachDatas.equipment_big_class
      that.ruleForm.equipment_middle_class = capitalSeachDatas.equipment_middle_class
      that.ruleForm.equipment_small_class = capitalSeachDatas.equipment_small_class
      let obj = {}
      obj.project_id = projectID
      obj.name = capitalSeachDatas.asetName
      obj.area_id = capitalSeachDatas.adress
      obj.asset_code = capitalSeachDatas.asetCode
      obj.status = capitalSeachDatas.starts
      obj.class_id = capitalSeachDatas.class_id
      obj.f_all = capitalSeachDatas.f_all
      obj.e_all = capitalSeachDatas.e_all
      obj.facilities_big_class = capitalSeachDatas.facilities_big_class
      obj.facilities_middle_class = capitalSeachDatas.facilities_middle_class
      obj.facilities_small_class = capitalSeachDatas.facilities_small_class
      obj.equipment_big_class = capitalSeachDatas.equipment_big_class
      obj.equipment_middle_class = capitalSeachDatas.equipment_middle_class
      obj.equipment_small_class = capitalSeachDatas.equipment_small_class
      obj.username = capitalSeachDatas.userName
      obj.page_num = 10
      obj.page_size = 1
      that.loadData(obj)
    } else {
      let obj = {}
      obj.project_id = projectID
      obj.page_num = 10
      obj.page_size = 1
      that.loadData(obj)
    }
  },
  methods: {
    shesClick (val) {
      let that = this
      that.sheBeiAll = true
      that.sheBeiAllCheck = false
      if (val == '0') {
        that.sheshiAll = false
        that.sheshiAllCheck = true
      } else if (val == '1') {
        that.sheshiAll = true
        that.sheshiAllCheck = false
      }
    },
    sheBClick (val) {
      let that = this
      that.sheshiAll = true
      that.sheshiAllCheck = false
      if (val == '0') {
        that.sheBeiAll = false
        that.sheBeiAllCheck = true
      } else if (val == '1') {
        that.sheBeiAll = true
        that.sheBeiAllCheck = false
      }
    },
    asetNameFun (val) {
      this.ruleForm.asetName = val
      this.$store.state.capitalSeachDatas = this.ruleForm
    },
    asetCodeFun (val) {
      this.ruleForm.asetCode = val
      this.$store.state.capitalSeachDatas = this.ruleForm
    },
    adressFun (val) {
      this.ruleForm.adress = val
      this.$store.state.capitalSeachDatas = this.ruleForm
    },
    userNameFun (val) {
      this.ruleForm.userName = val
      this.$store.state.capitalSeachDatas = this.ruleForm
    },
    startsFun (val) {
      this.ruleForm.starts = val
      this.$store.state.capitalSeachDatas = this.ruleForm
    },
    ruleForSFun (val) {
      let that = this
      that.ruleForm.facilities_big_class = ''
      that.ruleForm.facilities_middle_class = ''
      that.ruleForm.facilities_small_class = ''
      if (val.selectThr == '' && val.selectTwo == '') {
        that.ruleForm.facilities_big_class = val.selectOneId
        that.ruleForm.class_id = val.selectOneId
        that.ruleForm.f_all = '1'
      } else if (val.selectThr == '') {
        that.ruleForm.facilities_big_class = val.selectOneId
        that.ruleForm.facilities_middle_class = val.selectTwoId
        that.ruleForm.class_id = val.selectTwoId
        that.ruleForm.f_all = '2'
      } else {
        that.ruleForm.facilities_big_class = val.selectOneId
        that.ruleForm.facilities_middle_class = val.selectTwoId
        that.ruleForm.facilities_small_class = val.selectThrId
        that.ruleForm.class_id = val.selectThrId
        that.ruleForm.f_all = '3'
      }
      that.ruleForm.faciliObj = val
      that.$store.state.capitalSeachDatas = that.ruleForm
    },
    ruleForbFun (val) {
      let that = this
      that.ruleForm.equipment_big_class = ''
      that.ruleForm.equipment_middle_class = ''
      that.ruleForm.equipment_small_class = ''
      if (val.selectThr == '' && val.selectTwo == '') {
        that.ruleForm.equipment_big_class = val.selectOneId
        that.ruleForm.class_id = val.selectOneId
        that.ruleForm.e_all = '1'
      } else if (val.selectThr == '') {
        that.ruleForm.equipment_big_class = val.selectOneId
        that.ruleForm.equipment_middle_class = val.selectTwoId
        that.ruleForm.class_id = val.selectTwoId
        that.ruleForm.e_all = '2'
      } else {
        that.ruleForm.equipment_big_class = val.selectOneId
        that.ruleForm.equipment_middle_class = val.selectTwoId
        that.ruleForm.equipment_small_class = val.selectThrId
        that.ruleForm.class_id = val.selectThrId
        that.ruleForm.e_all = '3'
      }
      that.ruleForm.equipObj = val
      that.$store.state.capitalSeachDatas = that.ruleForm
    },
    seachHandle () {
      let that = this
      let obj = {}
      obj.project_id = that.projectIDs
      obj.name = that.ruleForm.asetName
      obj.area_id = that.ruleForm.adress
      obj.asset_code = that.ruleForm.asetCode
      obj.status = that.ruleForm.starts
      obj.class_id = that.ruleForm.class_id
      obj.facilities_big_class = that.ruleForm.facilities_big_class
      obj.facilities_middle_class = that.ruleForm.facilities_middle_class
      obj.facilities_small_class = that.ruleForm.facilities_small_class

      obj.equipment_big_class = that.ruleForm.equipment_big_class
      obj.equipment_middle_class = that.ruleForm.equipment_middle_class
      obj.equipment_small_class = that.ruleForm.equipment_small_class
      obj.username = that.ruleForm.userName
      if (that.sheshiAllCheck == true) {
        obj.f_all = that.ruleForm.f_all
      } else {
        obj.f_all = ''
      }
      if (that.sheBeiAllCheck == true) {
        obj.e_all = that.ruleForm.e_all
      } else {
        obj.e_all = ''
      }
      obj.page_num = 10
      obj.page_size = 1
      that.loadData(obj)
    },
    resetHandle () {
      let that = this
      that.resetValDatas = that.resetValDatas + 1
      that.$store.state.capitalSeachDatas = ''
      that.ruleForm.asetName = ''
      that.ruleForm.asetCode = ''
      that.ruleForm.adress = ''
      that.ruleForm.starts = ''
      that.ruleForm.userName = ''
      that.ruleForm.faciliObj = ''
      that.ruleForm.equipObj = ''
      that.ruleForm.class_id = ''
      that.ruleForm.f_all = ''
      that.ruleForm.e_all = ''
      that.ruleForm.facilities_big_class = ''
      that.ruleForm.facilities_middle_class = ''
      that.ruleForm.facilities_small_class = ''
      that.ruleForm.equipment_big_class = ''
      that.ruleForm.equipment_middle_class = ''
      that.ruleForm.equipment_small_class = ''
      that.sheshiAll = true
      that.sheshiAllCheck = false
      that.sheBeiAll = true
      that.sheBeiAllCheck = false
      let obj = {}
      obj.project_id = that.projectIDs
      obj.page_num = 10
      obj.page_size = 1
      that.loadData(obj)
    },
    // 获取列表
    loadData (data) {
      let that = this
      listAsset(data).then(res => {
        if (res.code == 200) {
          that.tableData = res.data.data
          that.total = res.data.count
        } else {
          that.$message({
            message: res.message,
            type: 'warning'
          })
        }
      })
    },
    // 列表
    loadDataAdress (data) {
      let that = this
      listAreas(data).then(res => {
        if (res.code == 200) {
          that.ruleForm.adressDatas = res.data.info
        } else {
          that.$message({
            message: res.message,
            type: 'warning'
          })
        }
      })
    },
    addPrejectClick (items, txt) {
      let that = this
      let options = that.$store.state.options
      that.$store.state.prejackDatas = ''
      if (txt == 'add') {
        that.$store.state.capitalLinks = 'add'
        if (that.$store.state.capitalAdd == false) {
          for (var i = 0; i < options.length; i++) {
            if (options[i].route == '/capitalMage') {
              that.$store.state.capitalAdd = true
              that.$store.commit('set_active_index', options[i])
              that.$router.push({'path': '/capitaladd'})
            }
          }
        } else {
          for (var i = 0; i < options.length; i++) {
            if (options[i].route == '/capitaladd') {
              that.$store.state.capitalAdd = false
              that.$store.commit('set_active_index', options[i])
              that.$router.push({'path': '/capitaladd'})
            }
          }
        }
      }
    }
  }
}
</script>
<style scoped>
@import url('../../css/capital.css');
</style>
