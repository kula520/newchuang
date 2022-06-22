<!-- 模板组件，用于模拟不同路由下的组件显示 -->
<template>
  <div class="homeWarp">
    <div class="homeMain">
      <div class="infoUlList">
        <ul class="infoUlListUl">
          <li>
            <div class="infoDiv">
              <h3>信息完整程度<el-tooltip class="item" effect="dark" content="审核入库资产中填写的数据项数量/相应资产应该填写的数据项总量（必填+选填）" placement="top-start">
                <i class="el-icon-warning tips"></i>
              </el-tooltip></h3>
              <h4>{{attributeDatas}}%</h4>
              <div class="loadBox">
                <div class="loadIng" :style="styleAttr"></div>
              </div>
            </div>
          </li>
          <li>
            <div class="infoDiv cur02">
              <h3>数据质量等级</h3>
              <p class="pText">自评</p>
              <h4 class="infoTile">
                  <div class="bj"></div>
                  <div class="til" v-if="zpData == 1"><i class="icon01"></i>合格</div>
                  <div class="til" v-if="zpData == 2"><i class="icon02"></i>不合格</div>
              </h4>
            </div>
          </li>
          <li>
            <div class="infoDiv cur01">
              <h3>数据质量等级</h3>
              <p class="pText">第三方</p>
              <h4 class="infoTile">                  
                  <div class="bj"></div>
                  <div class="til" v-if="fzpData == 1"><i class="icon01"></i>合格</div>
                  <div class="til" v-if="fzpData == 2"><i class="icon02"></i>不合格</div>
            </h4>
            </div>
          </li>
        </ul>
        <div class="clear"></div>
      </div>
      <div class="box">
        <div class="w48 lf">
          <div class="w48Div">
          <div class="p30">
            <h4 class="boxTitle">
              <el-select class="boxSelect"
                v-model="timeVal" @change="timeChange" clearable placeholder="请选择">
                <el-option
                  v-for="item in timeData"
                  :key="item.value"
                  :label="item.name"
                  :value="item.value">
                </el-option>
              </el-select>
              <el-select style="margin-right:10px;float:right;width:110px;height:24px;line-height:24px;position:relative;top:-4px;" 
                v-model="typeVal" @change="typeChange" clearable placeholder="请选择">
                <el-option
                  v-for="item in typeData"
                  :key="item.value"
                  :label="item.name"
                  :value="item.value">
                </el-option>
              </el-select>资产采集情况</h4>
              <div class="sortTabsbd">
                <div class="sortTabs"><i></i>
                  <span @click="tabs(1)" :class="{cur:isTabs == 1}">外业采集情况</span>
                  <span @click="tabs(2)" :class="{cur:isTabs == 2}">内业采集情况</span>
                </div>
              </div>
            <div id="histogramID" :style="{width: '100%', height: '320px'}"></div>
          </div>
          </div>
        </div>
        <div class="w48 lf">
          <div class="w48Div">
          <div class="p30">
            <h4 class="boxTitle">提交审核次数</h4>
            <div id="drawLineID" :style="{width: '100%', height: '380px'}"></div>
          </div>
          </div>
        </div>
        <div class="clear"></div>
      </div>
      <div class="workPerCont" style="margin-right:20px;">
        <h4><el-select class="workSelect"
                v-model="pepoVal" @change="pepoChange" clearable placeholder="请选择">
                <el-option
                  v-for="item in pepoData"
                  :key="item.value"
                  :label="item.name"
                  :value="item.value">
                </el-option>
              </el-select>信息采集人员</h4>
        <el-table class="tableClass"
            :data="tableData.slice((this.$store.state.pagesCurrent-1)*pageSize,this.$store.state.pagesCurrent*pageSize)"
            ref="multipleTable"
            stripe
            style="width: 100%">
            <el-table-column
                prop="name"
                label="姓名" align="center">
            </el-table-column>
            <el-table-column
                prop="audit"
                label="提交审核"
                align="center">
            </el-table-column>
            <el-table-column
                prop="to_audit"
                label="待审核"
                align="center">
            </el-table-column>
            <el-table-column
                prop="rejected"
                label="审核驳回"
                align="center">
            </el-table-column>
            <el-table-column
                prop="audit_success"
                label="审核通过"
                align="center">
            </el-table-column>
            <el-table-column
                label="待审核率"
                align="center">
              <template slot-scope="scope">
                <span>{{parseInt(scope.row.toAduitRate * 100)}}%</span>
              </template>
            </el-table-column>            
            <el-table-column
                label="审核驳回率"
                align="center">                
              <template slot-scope="scope">
                <span>{{parseInt(scope.row.rejectedRate * 100)}}%</span>
              </template>
            </el-table-column>
            <el-table-column
                label="审核通过率"
                align="center">                                
              <template slot-scope="scope">
                <span>{{parseInt(scope.row.passRate * 100)}}%</span>
              </template>
            </el-table-column>
            <el-table-column
                label="填写完整率"
                align="center">                               
              <template slot-scope="scope">
                <span>{{parseInt(scope.row.complete * 100)}}%</span>
              </template>
            </el-table-column>            
        </el-table>
        <pageNum 
            :cpage='this.$store.state.pagesCurrent'
            :pagesz='pageSize'
            :totals='total'
            :styleDatas='styleData'
        >
        </pageNum>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
var echarts = require('echarts')
import {projectAssetsCount,projectAssetsNumber,userCollect,
    attributeComplete,attributeAccurate,projectInfo
} from '../../api/index'
import pageNum from '../compents/pageshome.vue'
  export default {
    name:'home',
    components:{pageNum},
    data () {
      return {
        styleData:{
          'margin-top':'10px'  
        },
        tableData: [],
        pageSize:10,
        name:'',
        newListData:[],
        rlist:[],
        shenData:[],
        starte:'',
        starteData:[
          {
            name:'全部',
            value:'1'
          },
          {
            name:'设施中类',
            value:'2'
          },
          {
            name:'设施小类',
            value:'3'
          },
          {
            name:'设备',
            value:'4'
          }
        ],
        timeDataVal:'',
        timeVal:'',
        timeData:[{
            name:'今日',
            value:'1'
          },
          {
            name:'本月',
            value:'2'
          },
          {
            name:'季度',
            value:'3'
          },
          {
            name:'本年',
            value:'4'
          },
          {
            name:'全部',
            value:''
          }],
        pepoVal:'',
        pepoData:[{
            name:'今日',
            value:'1'
          },
          {
            name:'本月',
            value:'2'
          },
          {
            name:'季度',
            value:'3'
          },
          {
            name:'本年',
            value:'4'
          },
          {
            name:'全部',
            value:'5'
          }],
        isTabs:'1',
        typeVal:'',
        typeData:[{
          name:'设备分类',
            value:'1'
        },{
          name:'设施分类',
            value:'2'
        }],
        typeDataVal:'',
        attributeDatas:'',
        styleAttr:'',
        styleAccurate:'',
        zpData:'',
        fzpData:'',
        tpye:'5',
        projectIDs: ''
      }
    },
    created(){   
      let that = this
      let local = localStorage.getItem('cookiesDatas')
      let cookiesDatas = JSON.parse(local)
      let projectID = cookiesDatas.projectID
      that.projectIDs = cookiesDatas.projectID
      if(projectID != ''){
        let objData = {}
        objData.project_id = projectID
        objData.type = '5'
        objData.page_num = 100
        objData.page_size = 1
        that.loadDataWord(objData)        
        let zpObj = {}
        zpObj.id = projectID
        projectInfo(zpObj).then(res => {
          if(res.code == 200){
              if(res.data.data_quality_my == null){
                that.zpData = ''
              }else{
                if(res.data.data_quality_my == '1'){
                  that.zpData = '1'
                }else{
                  that.zpData = '2'
                }
              }
              if(res.data.data_quality_party == null){
                that.zpData = ''
              }else{
                if(res.data.data_quality_party == '1'){
                  that.fzpData = '1'
                }else{
                  that.fzpData = '2'
                }
              }
            }else{
              that.$message({
                  message:res.message,
                  type: 'warning'
              })              
              localStorage.clear()
              location.reload()
            }
        })

        let objAttr = {}
        objAttr.project_id = projectID
        attributeComplete(objAttr).then(res => {
          if(res.code == 200){
              that.attributeDatas = parseInt(res.data.complete * 100)
              that.styleAttr = {width:res.data.complete * 100 + '%'}
          }else{
            that.$message({
              message:res.message,
              type: 'warning'
            })
          }
        })
        .catch(function (error) {
          that.$message({
            message:'请求超时！',
            type: 'warning'
          });
        });
        attributeAccurate(objAttr).then(res => {
          if(res.code == 200){
            that.styleAccurate = {width:res.data.accurate * 100 + '%'}
          }else{
            that.$message({
              message:res.message,
              type: 'warning'
            })
          }
        })
        .catch(function (error) {
          that.$message({
            message:'请求超时！',
            type: 'warning'
          });
        });
        //资产采集情况图表
        let homeObj = {}
        homeObj.project_id = projectID
        homeObj.ac_methods = that.isTabs
        homeObj.time_type = that.timeDataVal
        homeObj.category = that.typeDataVal
        that.projectAssetsCountList(homeObj)               
        let objRank = {}
        objRank.project_id = projectID
        projectAssetsNumber(objRank).then(res => {
          if(res.code == 200){       
            let numbers = res.data.number  
            let times = res.data.time        
            that.drawLine(numbers,times)
          }else{
            that.$message({
              message:res.message,
              type: 'warning'
            });               
          }
        })
        .catch(function (error) {
          that.$message({
            message:'请求超时！',
            type: 'warning'
          });
        });
      }
    },
    methods:{   
      //列表
      loadDataWord(data) {
        let that = this
        userCollect(data).then(res => {
          if(res.code == 200){
            that.tableData = res.data.data 
            that.total = res.data.count
          }else{
            that.$message({
                message:res.message,
                type: 'warning'
            })
          }
        }).catch(function (error) {
          that.$message({
            message:'请求超时！',
            type: 'warning'
          })
        });
      },      
      //资产采集情况
      projectAssetsCountList(data) {
        let _that = this
        projectAssetsCount(data).then(res => {
          if(res.code == 200){
            let datas = res.data
            var arr=[]
            if(datas.length == 0){
              arr = []
            }
            if(datas.length == 1){
              arr.push(0)
              arr.push(0)
              arr.push(datas[0].assetCount)
              arr.push(0)
              arr.push(datas[0].assetCount)
            }
            if(datas.length == 2){
              arr.push(0)
              arr.push(datas[1].assetCount)
              arr.push(datas[0].assetCount)
              arr.push(0)
              arr.push(datas[0].assetCount)
            }
            if(datas.length == 3){
              arr.push(datas[2].assetCount)
              arr.push(datas[1].assetCount)
              arr.push(datas[0].assetCount)
              arr.push(0)
              arr.push(datas[0].assetCount)
            }
            if(datas.length == 4){
              arr.push(datas[2].assetCount)
              arr.push(datas[1].assetCount)
              arr.push(datas[0].assetCount)
              arr.push(datas[3].assetCount)
              arr.push(datas[0].assetCount + datas[3].assetCount)
            }
            // 基于准备好的dom，初始化echarts实例
            var myChart = echarts.init(document.getElementById('histogramID'));
            // 绘制图表
            myChart.setOption({
                title: {
                    text: ''
                },
                tooltip: {},
                xAxis: {
                    data: ['待审核', '审核驳回', '审核通过', '修改通过', '入库数量']
                },
                yAxis: {
                  minInterval:1
                },
                series: [{
                    data: arr,
                    type: 'bar',                          
                    barWidth:'16px',
                    itemStyle: {
                        color: function(params) {//柱状体颜色
                            // build a color map as your need.
                            var colorList = [
                                '#40A1E7','#F26C57','#3CC273','#EBB930','#6564D6'];
                            return colorList[params.dataIndex]
                        },
                    }
                }]
            });
          }else{
              _that.$message({
                  message:res.message,
                  type: 'warning'
              })  
          }
        }).catch(function (error) {
            _that.$message({
                message:'请求超时！',
                type: 'warning'
            });
        });
      },   
      drawLine(n,t){
        var myChart = echarts.init(document.getElementById('drawLineID'));
        var option;
        option = {
            title: {
                text: ''
            },
            tooltip: {
              trigger: 'axis'
            },
            xAxis: {
                type: 'category',
                data: t
            },
            yAxis: {
                type: 'value',
                minInterval:1
            },
            series: [{
                data: n,
                type: 'line',
                smooth: true
            }],
            legend: {
              data: ['line']
            }
        };

        option && myChart.setOption(option);
      },
      strateChange(val){
      },
      timeChange(val){
        let that = this
        let projectID = that.projectIDs
        let num = that.isTabs.toString()
        that.timeDataVal = val
        let homeObj = {}
        homeObj.project_id = projectID
        homeObj.ac_methods = num
        homeObj.time_type = that.timeDataVal
        homeObj.category = that.typeDataVal
        that.projectAssetsCountList(homeObj)
      },
      typeChange(val){
        let that = this
        let projectID = that.projectIDs
        let num = that.isTabs.toString()
        that.typeDataVal = val
        let homeObj = {}
        homeObj.project_id = projectID
        homeObj.ac_methods = num
        homeObj.time_type = that.timeDataVal
        homeObj.category = that.typeDataVal
        that.projectAssetsCountList(homeObj)
      },
      tabs(num) {
        let that = this
        that.isTabs = num
        //资产采集情况图表
        let projectID = that.projectIDs
        let homeObj = {}
        homeObj.project_id = projectID
        homeObj.ac_methods = num.toString()
        homeObj.time_type = that.timeDataVal
        homeObj.category = that.typeDataVal
        that.projectAssetsCountList(homeObj)
      },
      shenClick(val){
        let that = this
        that.$store.state.auditManListData = val
        that.$emit('viewFun', true)
      },
      pepoChange(val){
        let that = this
        let projectID = that.projectIDs
        that.tpye = val
        let obj = {}
        obj.project_id = projectID
        obj.type = val
        obj.page_num = 100
        obj.page_size = 1
        that.loadDataWord(obj)
      }
    }
  }
</script>
<style scoped>
@import url('../../css/home.css');
</style>
