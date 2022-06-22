<template>
  <div id="app">
    <!-- 登陆页面 -->
    <div class="loginMainBox">
      <div class="w66 lf">
        <div class="loginLogoBox">
          <h1 class="h1 lf" title="首创环保集团">首创环保集团</h1>
          <span class="line lf"></span>
          <h2 class="h2 lf" title="weam">weam</h2>
          <div class="clear"></div>
        </div>
        <div class="loginTextBox">
          <div class="text1">生态引领未来产业新升级 . 数字新生态</div>
          <div class="text2">New industrial upgrading, new digital ecology。</div>
        </div>
      </div>
      <div class="loginMain">
        <div class="logoBtm"></div>
        <div class="loginWap">
          <div class="tilLogin">水环境资产管理平台</div>
          <div class="loginIptbox"
              :class="{ current: isUser }">
            <i class="loginIcon luserIcon"></i>
            <input
              type="text"
              class="loginIpt"
              @blur="loginBlur('user')"
              @focus="loginFocus('user')"
              v-model="loginUserInfo"
              placeholder="请输入用户名"
            />
            <div class="loginTip" v-show="loginUserError">{{ loginUserTip }}</div>
          </div>
          <div class="loginIptbox"
              :class="{ current: isPass }">
            <i class="loginIcon lpassIcon"></i>
            <i class="closeIcon" v-show="yanC" @click="closeYPass"></i>
            <i class="closeOpen" v-show="yanO" @click="openYPass"></i>
            <input
              :type="iputText"
              class="loginIpt"
              maxlength="30"
              @blur="loginBlur('pass')"
              @focus="loginFocus('pass')"
              v-model="loginPassInfo"
              placeholder="请输入密码"
            />
            <div class="loginTip" v-show="loginPassError">{{ loginPassTip }}</div>
          </div>
          <div class="loginIptbox">
            <input type="text" class="yzmIpt" v-model="captchaKeyInfo" placeholder="验证码"></input>
            <img class="rf imgyzm" :src="imgUrlData" width="128px" height="48px" @click="loadYzm">
            <div class="loginTip" v-show="loginYzmError">{{ loginYzmTip }}</div>
          </div>
          <el-button class="LoginButton" @click="submitButton">登 录</el-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
/* eslint-disable */
import {
  loginAxios,
  imgCode
} from "../../api/index";
export default {
  name: "app",
  data() {    
    return {
      iputText:'password',
      yanC:true,
      yanO:false,
      loginUserTip: "用户不能为空！",
      loginPassTip: "密码不能为空！",
      loginYzmTip: '验证码不正确！',
      loginUserError: false,
      loginPassError: false,
      loginYzmError: false,
      loginUserInfo: "admin",
      loginPassInfo: "admin123",
      captchaKeyInfo: "",
      imgUrlData: '',
      codeData: '',
      isUser: false,
      isPass: false,
      loginIf: true,
      menu: []
    };
  },
  created() {    
    let that = this  
    let local = localStorage.getItem('cookiesDatas')
    if(local != null){
      let cookiesDatas = JSON.parse(local)
      if (cookiesDatas.UserToken != undefined) {
        let token = cookiesDatas.UserToken
        if(token != '' || token != null){
          that.$router.push({name:'/'})
        }
      }      
    }
    var imgObj = {}
    imgCode(imgObj).then(data => {
      if (data.code == 200) {
        that.imgUrlData = data.data.imgStr
        that.codeData = data.data.captchaKey
      } else {
        that.$message({
          message: data.message,
          type: "warning"
        })
      }
    })
    .catch(function (error) {
    });
  },
  methods: { 
    closeYPass(){
      let that = this
      that.yanC = false
      that.yanO = true
      that.iputText = 'text'
    },
    openYPass(){
      let that = this
      that.yanC = true
      that.yanO = false
      that.iputText = 'password'
    },
    loadYzm(){
      let that = this
      let imgObj = {}
      imgCode(imgObj).then(data => {
        if (data.code == 200) {
          that.imgUrlData = data.data.imgStr
          that.codeData = data.data.captchaKey
        } else {
          that.$message({
            message: data.message,
            type: "warning"
          });
        }
      })
      .catch(function (error) {
      });
    }, 
    //登陆按钮
    submitButton() {
      let that = this;
      let loginUser = that.loginUserInfo;
      let loginPass = that.loginPassInfo;
      let captchaKey = that.captchaKeyInfo;
      let code = that.codeData
      if (loginUser == "" || loginUser == null || loginUser == undefined) {
        that.isUser = true;
        that.loginUserError = true;
        return false;
      } else if (loginPass == "" || loginPass == null || loginPass == undefined) {
        that.isPass = true;
        that.loginPassError = true;
        return false;
      } else {
        loginAxios(loginUser, loginPass, code ,captchaKey).then(data => {
          that.loginUserError = false;
          that.loginPassError = false;
          that.loginYzmError = false;
          if (data.code == 200) {
            let userToken = data.data.token
            let projectID = data.data.project
            let user_id = data.data.user_id
            let slugName = data.data.slug
            let cookiesObj = {}
            cookiesObj.menus = JSON.stringify(data.data.menus)
            cookiesObj.menu = JSON.stringify(data.data.menu)
            cookiesObj.power = JSON.stringify(data.data.permissions)
            cookiesObj.UserToken = userToken
            cookiesObj.slugName = slugName
            cookiesObj.userName = loginUser
            cookiesObj.projectID = projectID
            cookiesObj.user_id = user_id
            let cookiesObjString = JSON.stringify(cookiesObj)
            localStorage.setItem('cookiesDatas',cookiesObjString)
            that.$emit('loginTrue',false)               
            that.$message({
              message: data.message,
              type: "success"
            })  
            that.$router.go(0)
            that.$router.push({name:'MainFrame'})
          } else if(data.code == 405){
            that.$message({
              message: data.message,
              type: "warning"
            }); 
            let imgObj = {}
            imgCode(imgObj).then(data => {
              if (data.code == 200) {
                that.imgUrlData = data.data.imgStr
                that.codeData = data.data.captchaKey
              } else {
                that.$message({
                  message: data.message,
                  type: "warning"
                });
              }
            })
          } else {
            that.$message({
              message: data.message,
              type: "warning"
            });            
          }
        })
      }
    },
    loginFocus(obj) {
      let that = this;
      if (obj == "user") {
        that.isUser = true;
      } else if (obj == "pass") {
        that.isPass = true;
      }
    },
    loginBlur(obj) {
      let that = this;
      let loginUser = that.loginUserInfo;
      let loginPass = that.loginPassInfo;
      if (obj == "user") {
        if (loginUser == "" || loginUser == null || loginUser == undefined) {
          that.isUser = true;
          that.loginUserError = true;
        } else {
          that.isUser = false;
          that.loginUserError = false;
        }
      } else if (obj == "pass") {
        if (loginPass == "" || loginPass == null || loginPass == undefined) {
          that.isPass = true;
          that.loginPassError = true;
        } else {
          that.isPass = false;
          that.loginPassError = false;
        }
      }
    },
  }
};
</script>
<style>
.loginMainBox{width:100%;height:100vh;overflow:hidden;}
.w66{width:69%;background:url('../../assets/bj-x.png') no-repeat 0 0/110%;height:100vh;}
.loginMain {
  width: 30%;
  height:100vh;
  float:right;
  background-size:100% 100%;
  position: relative;  
}
.loginMain .logoBtm{position:absolute;bottom:0;left:0;
  width:100%;height:80px;line-height:80px;text-align:center;
  color:#b1b4bd;font-size:12px;z-index:999;
}
.loginWap{height:580px;top:50%;margin-top:-290px;position:absolute;left:60px;}
.loginMain h1 {
  text-align: center;
  height: 45px;
  margin-bottom: 20px;
}
.loginMain .tilLogin {
  height: 43px;
  line-height: 43px;
  overflow: hidden;
  font-size: 28px;
  color: #0190E3;
  margin-top:30%;
  margin-bottom:60px;
}
.loginMain .loginIptbox {
  width:100%;
  margin-bottom:25px;
  border: 1px solid #e0e0e0;
  background:#fff;
  height: 50px;
  border-radius: 4px;
  -webkit-border-radius: 4px;
  -moz-border-radius: 4px;
  position: relative;
}
.loginIptbox .loginIcon {
  position: absolute;
  top: 14px;
  left: 19px;
  width: 20px;
  height: 20px;
}
.loginIptbox .loginIcon.luserIcon {
  background: url("../../assets/luserIcon.png") no-repeat;
}
.loginIptbox .loginIcon.lpassIcon {
  background: url("../../assets/lpassIcon.png") no-repeat;
}
.loginIptbox .loginTip {
  color: #f50a0a;
  line-height: 16px;
  font-size: 12px;
  position: absolute;
  top: 52px;
  left: 1px;
}
.loginIptbox .loginIpt {
  height: 50px;
  border:0;
  width:70%;
  outline: none;
  font-size: 14px;
  line-height: 50px;
  padding-left: 54px;
}
.loginIptbox .yzmIpt {
  border:0;
  height: 50px;
  width: 50%;
  outline: none;
  font-size: 14px;
  line-height: 50px;
  padding-left: 10px;
}
.loginIptbox.current {
  border: 1px solid #f50a0a;
}

.loginLogoBox{margin:50px;}
.loginLogoBox .h1{background:url('../../assets/logo1.png') no-repeat 0 0/100%; 
  width:200px;height:43px;
  text-indent:-9999px;
}
.loginLogoBox .line{width:1px;height:20px;background-color:#4792c8;overflow:hidden;
  display:block;margin:0 24px;position:relative;top:14px;
}
.loginLogoBox .h2{background:url('../../assets/logo2.png') no-repeat 0 0/100%; 
  width:129px;height:43px;
  text-indent:-9999px;
}
.loginTextBox{margin:220px 0 0 140px;}
.loginTextBox .text1{background:url('../../assets/Slice.png') no-repeat 0 0/100%;
  width:500px;height:116px;
  text-indent:-9999px;margin-bottom:50px;
}
.loginTextBox .text2{background:url('../../assets/Slice1.png') no-repeat 0 0/100%;
  width:300px;height:48px;
  text-indent:-9999px;
}
.LoginButton{width:100%;background-color:#0190E3;color:#fff;}
</style>
