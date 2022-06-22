<!-- 用户管理组件 -->
<template>
  <div class="mainWarp">
    <div class="seachBox">
      <el-form :model="ruleForm" ref="ruleForm" :label-position="top" class="demo-ruleForm">
        <div class="w25">
          <inputText title="项目名称" @inputVals="projectFunVal"></inputText>
        </div>
        <div class="w25">
          <inputselect title="类型" :typeData="ruleForm.typeDatas" @selectVals="typeFunVal" :disabd="disabdVals" optionVals="value"></inputselect>
        </div>
        <div class="w25">
          <inputselect title="省域" :typeData="ruleForm.provinceData" @selectVals="cityFunVal" :disabd="disabdVals" optionVals="value"></inputselect>
        </div>
        <div class="w25">
          <inputselect title="商业模式" :typeData="ruleForm.modData" @selectVals="modFunVal" :disabd="disabdVals" optionVals="value"></inputselect>
        </div>
        <div class="clear"></div>
      </el-form>
      <button class="buttonAll" @click="seachHandle">搜 索</button>
      <button class="buttonAll ml15" @click="resetHandle">重 置</button>
    </div>
    <div class="pagesMain">
      <button class="buttonAll lf" @click="addPrejectClick('','add')">
        添 加
      </button>
      <pageNum :totals="total" :seachDatas="ruleForm" :styleDatas="styleData">
      </pageNum>
      <div class="clear"></div>      
    </div>
    <div>
      <el-table
        class="tableClass"
        :data="tableData"
        stripe
        height="600px"
        style="width: 100%"
      >
        <el-table-column prop="referred"
        width="200" label="项目简称" align="center">
        </el-table-column>
        <el-table-column prop="code"
        width="200" label="项目代码" align="center">
        </el-table-column>
        <el-table-column
          prop="project_type"
          label=" 类型"
          width="150"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="province"
          label="省域"
          width="150"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="model"
          label="商业模式"
          width="150"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="progress_name"
          label="进展"
          align="center"
          width="150"
        >
        </el-table-column>
        <el-table-column
          prop="signing_time"
          width="150"
          label="中标日期"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="contact_amount"
          label="投资金额(万元)"
          width="150"
          align="center"
        >
        </el-table-column>
        <el-table-column
          label="操作"
          align="center"
        >
          <template slot-scope="scope">
            <span class="tipBtn bj1" @click="addPrejectClick(scope.row,'views')">查看</span>
            <span class="tipBtn" @click="addPrejectClick(scope.row,'mody')">修改</span>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import { projectList } from "../../api/index";
import pageNum from '../compents/pages.vue'
import inputText from '../formtable/inputtext.vue'
import inputselect from '../formtable/inputselect.vue'
export default {
  name: "projectMage",
  components:{pageNum,inputText,inputselect},
  data() {
    return {    
      disabdVals:false, 
      ruleForm: {
        referred:'',
        type: '',
        typeDatas: [
          {
            name: "海绵城市",
            value: "1"
          },
          {
            name: "村镇污水",
            value: "2"
          },
          {
            name: "黑臭水体",
            value: "3"
          },
          {
            name: "水环境治理",
            value: "4"
          }
        ],
        province: "",
        provinceData: [
          { name: "北京",value: "北京" },
          { name: "天津",value: "天津" },
          { name: "上海",value: "上海" },
          { name: "重庆",value: "重庆" },
          { name: "新疆",value: "新疆" },
          { name: "西藏",value: "西藏" },
          { name: "宁夏",value: "宁夏" },
          { name: "内蒙古",value: "内蒙古" },
          { name: "重庆",value: "重庆" },
          { name: "广西",value: "广西" },
          { name: "黑龙江",value: "黑龙江" },
          { name: "吉林",value: "吉林" },
          { name: "辽宁",value: "辽宁" },
          { name: "河北",value: "河北" },
          { name: "山东",value: "山东" },
          { name: "江苏",value: "江苏" },
          { name: "安徽",value: "安徽" },
          { name: "浙江",value: "浙江" },
          { name: "福建",value: "福建" },
          { name: "广东",value: "广东" },
          { name: "海南",value: "海南" },
          { name: "云南",value: "云南" },
          { name: "贵州",value: "贵州" },
          { name: "湖南",value: "湖南" },
          { name: "四川",value: "四川" },
          { name: "湖北",value: "湖北" },
          { name: "河南",value: "河南" },
          { name: "山西",value: "山西" },
          { name: "陕西",value: "陕西" },
          { name: "甘肃",value: "甘肃" },
          { name: "青海",value: "青海" },
          { name: "江西",value: "江西" },
          { name: "台湾",value: "台湾" },
          { name: "香港",value: "香港" },
          { name: "澳门",value: "澳门" }
        ],
        mod: "",
        modData: [
          {
            name: "PPP",
            value: "1"
          },
          {
            name: "EPCO",
            value: "2"
          }
        ]
      },
      tableData: [],
      total: 100,
      addProjects:false
    };
  },
  created() {    
    let that = this
    let obj = {}
    obj.page_num = 10
    obj.page_size = 1
    that.loadData(obj)
  },
  methods: {
    projectFunVal(val){
      let that = this 
      that.ruleForm.referred = val
    },
    typeFunVal(val){
      let that = this 
      that.ruleForm.type = val
    },
    cityFunVal(val){
      let that = this 
      that.ruleForm.province = val
    },
    modFunVal(val){
      let that = this 
      that.ruleForm.mod = val
    },
    resetHandle(){ 
      let that = this     
      that.ruleForm.referred = ''
      that.ruleForm.type = ''
      that.ruleForm.province = ''
      that.ruleForm.mod = ''
      that.$store.state.pagesCurrent = 1
      let obj = {}
      obj.page_num = 10
      obj.page_size = 1
      that.loadData(obj)
    },
    //列表
    loadData(data) {
      let that = this
      projectList(data).then(res => {
        if (res.code == 200) {
          that.tableData = res.data.info
          that.total = res.data.count
        } else {
          that.$message({
            message: res.message,
            type: "warning"
          })
        }
      });
    },    
    seachHandle() {
      let that = this
      that.$store.state.pagesCurrent = 1
      let obj = {}
      obj.page_num = 10
      obj.page_size = 1
      obj.referred = that.ruleForm.referred
      obj.type = that.ruleForm.type
      obj.province = that.ruleForm.province
      obj.mod = that.ruleForm.mod
      that.loadData(obj)
    },
    addPrejectClick(items,txt){
      let that = this
      let options = that.$store.state.options
      that.$store.state.prejackDatas = ''
      if(txt == 'add'){
        that.$store.state.prejackInction = 'add'
        if(that.$store.state.projectAdd == false){
          for(var i=0;i<options.length;i++){        
            if(options[i].route == '/projectmage'){
              that.$store.state.projectAdd = true       
              that.$store.commit('set_active_index', options[i])
              that.$router.push({'path':'/projectadd'})     
            }
          }
        }else{
          for(var i=0;i<options.length;i++){        
            if(options[i].route == '/projectadd'){
              that.$store.state.projectAdd = false   
              that.$store.commit('set_active_index', options[i])
              that.$router.push({'path':'/projectadd'})
            }
          }
        }
      } else if (txt == 'mody') {
        that.$store.state.prejackDatasMody = items
        that.$store.state.prejackInction = 'mody'
        if(that.$store.state.projectAdd == false){
          for(var i=0;i<options.length;i++){        
            if(options[i].route == '/projectmage'){
              that.$store.state.projectAdd = true   
              that.$store.commit('set_active_index', options[i])
              that.$router.push({'path':'/projectadd'})
            }
          }
        }else{
          for(var i=0;i<options.length;i++){        
            if(options[i].route == '/projectadd'){
              that.$store.state.projectAdd = false   
              that.$store.commit('set_active_index', options[i])
              that.$router.push({'path':'/projectadd'})
            }
          }
        }
      } else if (txt == 'views') {
        that.$store.state.prejackDatasMody = items
        that.$store.state.prejackInction = 'views'
        if(that.$store.state.projectAdd == false){
          for(var i=0;i<options.length;i++){        
            if(options[i].route == '/projectmage'){
              that.$store.state.projectAdd = true   
              that.$store.commit('set_active_index', options[i])
              that.$router.push({'path':'/projectadd'})
            }
          }
        }else{
          for(var i=0;i<options.length;i++){        
            if(options[i].route == '/projectadd'){
              that.$store.state.projectAdd = false   
              that.$store.commit('set_active_index', options[i])
              that.$router.push({'path':'/projectadd'})
            }
          }
        }
      }
    }
  }
};
</script>