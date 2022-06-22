/* eslint-disable import/no-duplicates */
// @ts-nocheck
import Vue from 'vue'
import Router from 'vue-router'
import Login from '../views/login/login.vue'
import MainFrame from '../views/mainframe/mainframenew.vue'
import Home from '../views/home/home.vue'
import Projectmage from '../views/projectmage/projectmage.vue'
import Projectadd from '../views/projectmage/projectadd.vue'
import sortPages from '../views/sortPages/sortPages.vue'
import qrCode from '../views/qrCode/qrCode.vue'
import adminMage from '../views/adminMage/adminMage.vue'
import capitalMage from '../views/capitalMage/capitalMage.vue'
import addCapital from '../views/capitalMage/addCapital.vue'
import auditManage from '../views/auditManage/auditManage.vue'
import role from '../views/role/role.vue'
import menu from '../views/menu/menu.vue'
import power from '../views/power/power.vue'
import messagePages from '../views/messagePages/messagePages.vue'
import adressPages from '../views/adressPages/adressPages.vue'
import templateList from '../views/templateList/templateList.vue'
import attrsPages from '../views/attrsPages/attrsPages.vue'
Vue.use(Router)
// cv以下代码解决路由地址重复的报错问题(一劳永逸)
const originalPush = Router.prototype.push
Router.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}
export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/home',
      name: '首页',
      component: Home
    },
    {
      path: '/mainframe',
      name: 'MainFrame',
      component: MainFrame
    },
    {
      path: '/messagePages',
      name: '消息管理',      
      component: messagePages,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/projectmage',
      name: '项目管理',
      component: Projectmage,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/sortPages',
      name: '设施/设备分类管理',
      component: sortPages,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/qrCode',
      name: '二维码管理',
      component: qrCode,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/adminMage',
      name: '用户列表',
      component: adminMage,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/capitalMage',
      name: '资产列表',
      component: capitalMage,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/capitaladd',
      name: '添加/修改/查看资产',
      component: addCapital,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/auditManage',
      name: '入库审核',
      component: auditManage,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/role',
      name: '角色管理',
      component: role,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/menu',
      name: '菜单管理',
      component: menu,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/power',
      name: '权限配置',
      component: power,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/adressPages',
      name: '区域列表',
      component: adressPages,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/templateList',
      name: '模板列表',
      component: templateList,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/attrsPages',
      name: '属性列表',
      component: attrsPages,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/projectadd',
      name: '添加/修改/查看项目',
      component: Projectadd,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
