// @ts-nocheck
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

/**
 * Vuex全局状态管理
 */
const store = new Vuex.Store({
  state: {
    options: [],
    activeIndex: '/home',
    userInfo: {},
    loginShow: true,
    // 上传图片地址
    baseImgUrl: 'http://39.96.41.159:8287/upload/img',
    baseFileUrl: 'http://39.96.41.159:8287/upload/file',
    // 分页
    pagesCurrent: 1,
    // 页面跳转
    // 项目
    projectAdd: false,
    prejackDatas: '',
    prejackDatasMody: '',
    prejackInction: '',
    // 资产列表
    capitalSeachDatas: '',
    capitalAdd: false,
    capitalLinks: '',
    capitalDatas: '',
    // 资产属性
    capitAttrDats: '',
    // numDoudle
    numDoudle: ''
  },
  mutations: {
    // 添加tabs
    add_tabs (state, data) {
      let options = this.state.options
      options.push(data)
    },
    // 删除tabs
    delete_tabs (state, route) {
      let index = 0
      if (route == '/projectadd') {
        this.state.projectAdd = false
      }
      if (route == '/capitaladd') {
        this.state.capitalAdd = false
        this.state.capitalDatas = ''
      }
      for (let option of state.options) {
        if (option.route === route) {
          break
        }
        index++
      }
      this.state.options.splice(index, 1)
    },
    // 设置当前激活的tab
    set_active_index (state, index) {
      // @ts-ignore
      this.state.activeIndex = index
    },
    // 分頁激活
    pages_index (state, index) {
      // @ts-ignore
      this.state.pagesCurrent = index
    }
  }
})

export default store
