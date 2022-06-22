<template>
  <div>
    <div class="header">
        <ul class="ulList">
            <li><i class="el-icon-s-custom" @click="openUserClick"></i></li>
            <li @click="gotoLogin"><i class="el-icon-circle-close"></i>退出登录</li>
        </ul>
        <h2>创想立方资产管理平台</h2>
        <div class="selectProject"><selectProjcet :proID="projectIDs"></selectProjcet></div>
    </div>
  <el-dialog
      :visible.sync="userInfoShow"
      width="40%"
      :before-close="handleClose"
    >
      <div class="userInfoMain">

        <div>
          <el-form
            :model="form"
            ref="form"
            label-width="100px"
            :rules="rules"
            style="width:100%;marign:0 auto;"
          >
            <el-form-item label="账号" :maxlength="20">
              <el-input
                v-model="form.name"
                disabled
                autocomplete="off"
              ></el-input>
            </el-form-item>
            <el-form-item label="角色">
              <el-input
                v-model="form.roleName"
                disabled
                autocomplete="off"
              ></el-input>
            </el-form-item>
            <el-form-item label="电话" :maxlength="20">
              <el-input
                v-model="form.tel"
                maxlength="11"
                autocomplete="off"
              ></el-input>
            </el-form-item>
            <el-form-item label="密码">
              <el-input
                type="password"
                v-model="form.pass"
                autocomplete="off"
                placeholder="请输入新密码"
              ></el-input>
            </el-form-item>
            <el-form-item label="确认密码">
              <el-input
                type="password"
                v-model="form.passS"
                autocomplete="off"
                placeholder="请再次输入密码"
              ></el-input>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button
          @click="userInfoShow = false"
          style="color:#0190e3;border:#0190e3 1px solid"
          >取 消</el-button
        >
        <el-button
          type="primary"
          @click="updateInfo"
          style="background:#0190e3;border:#0190e3 1px solid"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>
<script>
import selectProjcet from './selectproject.vue'
import {
  adminInfo, updateAdmin
} from '../../api/index'
export default {
  name: 'headers',
  components: {selectProjcet},
  data () {
    return {
      userInfoShow: false,
      form: {
        id: '',
        name: '',
        pass: '',
        passS: '',
        tel: '',
        role: '',
        roleName: ''
      },
      projectIDs: ''
    }
  },
  created () {
    let that = this
    let local = localStorage.getItem('cookiesDatas')
    let cookiesDatas = JSON.parse(local)
    if (cookiesDatas != null) {
      that.projectIDs = cookiesDatas.projectID
    }
  },
  methods: {
    gotoLogin () {
      setTimeout(() => {
        localStorage.clear()
        location.reload()
      }, 200)
    },
    openUserClick () {
      let that = this
      that.userInfoShow = true
      adminInfo().then(res => {
        if (res.code == 200) {
          that.form.tel = res.data.tel
          that.userInfoName = res.data.name
          that.form.name = res.data.name
          that.imageUrl = res.data.avatar
          that.imgAvatar = res.data.avatar
          that.form.role = res.data.role.id
          that.form.roleName = res.data.role.name
          that.form.id = res.data.id
        } else {
          that.$message({
            message: res.message,
            type: 'warning'
          })
        }
      })
    },
    // 修改账号信息
    updateInfo () {
      let that = this
      if (that.form.pass != that.form.passS) {
        that.$message({
          message: '密码必须输入一致！',
          type: 'warning'
        })
        return false
      } else {
        updateAdmin(
          that.form.id,
          that.form.name,
          that.form.pass,
          that.form.tel,
          that.form.role
        )
          .then(data => {
            if (data.code == 200) {
              that.userInfoShow = false
              that.$message({
                message: data.message,
                type: 'success'
              })
            } else {
              that.$message({
                message: data.message,
                type: 'warning'
              })
            }
          })
      }
    }
  }
}
</script>
<style scoped>
.header{height:60px;border-bottom:1px solid #f2f2f2;padding:10px 20px;background-color:#fff;}
.header h2{height:60px;line-height:60px;font-size:28px;display:inline-block;padding-right:20px;}
.header .ulList{float:right;}
.header .ulList li{float:left;padding-left:10px;height:60px;line-height:60px;cursor:pointer;}
.header .ulList li i{font-size:20px;position:relative;top:4px;padding-right:10px;}
.selectProject{display:inline-block}
</style>
