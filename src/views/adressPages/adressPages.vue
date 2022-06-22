<template>
  <div class="mainWarp">
    <div class="seachBox">
      <el-form :label-position="top" :model="ruleForm">
        <div class="w25">
          <inputText title="行政区划" @inputVals="projectFunVal"></inputText>
        </div>        
        <div class="clear"></div>        
        <button class="buttonAll" @click="seachHandle">搜 索</button>
        <button class="buttonAll ml15" @click="resetHandle('ruleForm')">重 置</button>
      </el-form>
    </div>
    <div class="pages matb">
      <button class="buttonAll lf" @click="addAreasClick">添加</button>
      <pageNum :totals="total" :seachDatas="ruleForm" :adressID="projectIDs">
      </pageNum>
      <div class="clear"></div>
    </div>
    <div>
      <el-table
        class="tableClass"
        :data="tableData"
        stripe height="600px"
        style="width: 100%">
        <el-table-column
          label="序号"
          align="center"
          width="100">
          <template slot-scope="scope">
              {{(currentPage - 1) * 10 + scope.$index + 1}}
          </template>
        </el-table-column>   
        <el-table-column
          prop="name"
          label="行政区划"
          align="center">
        </el-table-column>
        <el-table-column
          prop="referred"
          label="所属项目"
          align="center">
        </el-table-column>        
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <span class="tipBtn" @click="handleClick(scope.row,'modily')"
            >修改</span>
            <span class="tipBtn bj2" @click="handleClick(scope.row,'del')"
            >删除</span>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- 添加 -->
    <el-dialog
      :title="pupTile"
      :visible.sync="addAreas"
      width="50%">
      <el-form ref="addAreaForm" :rules="rules" label-width="100px" :model="addAreaForm">   
        <inputselect title="项目" :selectVals="addAreaForm.preject" optionVals="id"
            :typeData="addAreaForm.prejectData" @selectVals="addAreaVal">
        </inputselect>
        <inputText title="行政区划" @inputVals="firstNameVal" :inputTest="firstName"></inputText>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button class="buttonClose" @click="addAreas = false">取 消</el-button>
        <el-button class="buttonSave" type="primary" @click="addAareHandle" v-if="addBtnShow">确 定</el-button>        
        <el-button class="buttonSave" type="primary" @click="modilyAareHandle" v-else>确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
/* eslint-disable */
import { listAreas,projectList,addArea,updateAreas,delArea} from "../../api/index";
import pageNum from '../compents/pages.vue'
import inputText from '../formtable/inputtext.vue'
import inputselect from '../formtable/inputselect.vue'
export default {
  name: "projectMage",
  components:{pageNum,inputText,inputselect},
  data() {
    return {
      pupTile:'添加区域',
      addAreas:false,
      ruleForm: {
        adress: "",
        preject: '',
        prejectData:[]
      },
      addAreaForm: {
        adress: "",
        preject: '',
        prejectData:[]
      },
      firstName:'',
      tableData: [],
      currentPage:1,
      total:0,
      canAdd: false,
      canEdit: false,
      canDel: false,
      canSee: false,
      rules: {
        name: [{
          required: true,
          message: '区域不能为空！',
          trigger: 'blur'
        }],
        preject: [{
          required: true,
          message: '项目不能为空！',
          trigger: 'blur'
        }]
      },
      infoDatas: '',
      projectIDs: '',
      addBtnShow:true
    };
  },
  created() {    
    let that = this
    let local = localStorage.getItem('cookiesDatas')
    let cookiesDatas = JSON.parse(local)
    let projectID = cookiesDatas.projectID
    that.projectIDs = projectID
    let obj = {};
    obj.page_num = 1000;
    obj.page_size = 1;
    that.loadDataPreject(obj);
    let objArea = {};
    objArea.id = projectID
    objArea.page_num = 10;
    objArea.page_size = 1;
    that.loadData(objArea);
    that.addAreaForm.preject = projectID
  }, 
  watch:{
      firstName(){}
  }, 
  methods: {     
    addAreaVal (val) {
      let that = this
      that.addAreaForm.preject = val
    }, 
    projectFunVal(val){
      let that = this 
      that.ruleForm.adress = val
    },
    firstNameVal(val){
      let that = this 
      that.firstName = val
    },
    addAreasClick(){        
      let that = this;
      that.pupTile = '添加区域'
      that.firstName = ''
      that.addAreaForm.preject = ''
      that.addAreas = true
      that.addBtnShow = true
    },
    handleClick(data, action) {
      let that = this;
      switch (action) {
        case "modily":
            that.infoDatas = data
            that.pupTile = '修改区域'
            console.log(data)
            that.firstName = data.name
            that.addAreaForm.preject = data.project_id
            that.addBtnShow = false
            that.addAreas = true
          break;
        case "del":
          that.$confirm('确定删除该区域', '删除', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            let obj = {}
            obj.id = data.id          
            delArea(obj).then(data => {
              if (data.code == 200) {
                that.$message({
                  type: 'success',
                  message: '删除成功!'
                });                
                let objArea = {};
                objArea.id = that.projectIDs
                objArea.page_num = 10;
                objArea.page_size = 1;
                that.loadData(objArea);           
              } else {
                that.$message({
                  message: data.message,
                  type: 'warning'
                })
              }
            })
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            });          
          });
          break;
        default:
          break;
      }
    }, 
    modilyAareHandle(){
        let that = this
        let id = that.infoDatas.id
        let name = that.firstName
        let projectid = that.addAreaForm.preject      
        updateAreas(  
            id,          
            name,
            projectid
        ).then(data => {
        if (data.code == 200) {
            that.$message({
            message: data.message,
            type: 'success'
            })
            let objArea = {}
            objArea.id = that.projectIDs
            objArea.page_num = 10
            objArea.page_size = that.currentPage
            that.loadData(objArea)
            that.addAreas = false
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
    },
    addAareHandle(){       
        let that = this
        let name = that.firstName
        let id = that.addAreaForm.preject      
        addArea(
            name,
            id
        ).then(data => {
        if (data.code == 200) {
            that.$message({
                message: data.message,
                type: 'success'
            })
            that.addAreaForm.adress = ''  
            that.ruleForm.preject = ''            
            let objArea = {}
            objArea.id = that.projectIDs
            objArea.page_num = 10
            objArea.page_size = that.currentPage
            that.loadData(objArea)
            that.addAreas = false
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
    },
    loadDataPreject(data) {
      let that = this;
      projectList(data).then(res => {
        if (res.code == 200) {
          that.ruleForm.prejectData = res.data.info
          that.addAreaForm.prejectData = res.data.info
        }
      })
      .catch(function (error) {
      });
    },
    prejectChange(val){
      this.ruleForm.preject = val
    }, 
    seachHandle() {
      let that = this;
      that.currentPage = 1
      let obj = {};
      obj.id = that.projectIDs
      obj.name = that.ruleForm.adress;
      obj.page_num = 10;
      obj.page_size = 1;
      that.loadData(obj);
    },
    resetHandle() {
      let that = this;        
      that.ruleForm.adress = ''
      that.ruleForm.preject = ''
      let obj = {};
      obj.id = that.projectIDs
      obj.page_num = 10;
      obj.page_size = 1;
      that.loadData(obj);
    },
    //列表
    loadData(data) {
      let _that = this;
      listAreas(data).then(res => {
        if (res.code == 200) {
          _that.tableData = res.data.info;
          _that.total = res.data.count;
        } else {
          _that.$message({
            message: res.message,
            type: "warning"
          })          
        }
      });
    }    
  }
};
</script>
