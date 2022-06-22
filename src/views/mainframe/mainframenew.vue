<template>
  <div>
    <NavMenu :list="menu" @radioOpen='radioOp' @radioClose="radioCl"></NavMenu>
    <div class="tabsConents" :class="[isCollapseVal ? 'contCur' : '']">
      <Headers></Headers>
      <div class="template-tabs">
        <el-tabs
          v-model="activeIndex"
          closable
          @tab-click="tabClick"
          v-if="options.length"
          @tab-remove="tabRemove"
        >
          <el-tab-pane
            :key="item.name"
            v-for="(item, index) in options"
            :label="item.name"
            :name="item.route"
          >
          </el-tab-pane>
        </el-tabs>
      </div>
      <!-- tab的内容页面 -->
      <div class="content-wrap"><router-view /></div>
    </div>
  </div>
</template>
<script>
import NavMenu from '../compents/menusNav.vue'
import Headers from '../compents/header.vue'
export default {
  name: 'mainfaramesnew',
  components: {NavMenu, Headers},
  data () {
    return {
      isCollapseVal: false,
      menu: []
    }
  },
  created () {
    // eslint-disable-next-line no-unused-vars
    let that = this
    let local = localStorage.getItem('cookiesDatas')
    let cookiesDatas = JSON.parse(local)
    if (cookiesDatas != null) {
      let menusArray = JSON.parse(cookiesDatas.menu)
      that.projectIDs = cookiesDatas.projectID
      menusArray[0].route = '/home'
      that.menu = menusArray
    }
  },
  methods: {
    radioOp (val) {
      this.isCollapseVal = false
    },
    radioCl (val) {
      this.isCollapseVal = true
    },
    // tab切换时，动态的切换路由
    tabClick (tab) {
      let that = this
      let path = that.activeIndex
      that.$router.push({ path: path })
    },
    // tab删除功能
    tabRemove (targetName) {
      // 首页不可删除
      let that = this
      if (targetName == '/home') {
        return
      }
      that.$store.commit('delete_tabs', targetName)
      if (that.activeIndex === targetName) {
        // 设置当前激活的路由
        if (that.options && that.options.length >= 1) {
          that.$store.commit(
            'set_active_index',
            that.options[that.options.length - 1].route
          )
          that.$router.push({ path: that.activeIndex })
        } else {
          that.$router.push({ path: '/home' })
        }
      }
    }
  },
  computed: {
    options () {
      return this.$store.state.options
    },
    activeIndex: {
      get () {
        return this.$store.state.activeIndex
      },
      set (val) {
        this.$store.commit('set_active_index', val)
      }
    }
  },
  watch: {
    $route (to) {
      let that = this
      let flag = false
      for (let option of that.options) {
        if (option.name === to.name) {
          flag = true
          that.$store.commit('set_active_index', '/' + to.path.split('/')[1])
          break
        }
      }
      if (!flag) {
        that.$store.commit('add_tabs', {
          route: '/' + to.path.split('/')[1],
          name: to.name
        })
        that.$store.commit('set_active_index', '/' + to.path.split('/')[1])
      }
    }
  }
}
</script>
<style>
@import url('../../css/mainframevuex.css');
</style>
