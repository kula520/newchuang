<template>
  <div class="appNavMain app-nav-wrap" :class="[isCollapse ? 'isContent' : '']">
    <div v-if="isCollapse" class="logoM" title="创想立方"></div>
    <div v-else class="logo" title="创想立方">i-<span style="color:#ff4400">d</span>eark</div>    
    
    <div class="raidoBtnBox" :class="[isCollapse ? 'current' : '']">
      <i @click="radioOpen" v-if="isCollapse" class="el-icon-arrow-right raidoBtn"></i>
      <i @click="radioClose" v-else class="el-icon-arrow-left raidoBtn"></i>
    </div>
    <el-menu
        :show-timeout="0"
        :hide-timeout="0"
        :unique-opened="true"
        :default-active="$route.path"
        class="el-menu-vertical-demo"
        router
      @open="handleOpen" @close="handleClose" :collapse="isCollapse">
      <template v-for="(item, idx) in list">
          <el-menu-item
            v-if="!item.childNav"
            :index="item.route"
            :key="item.route"
          >
            <div class="navName">
              <i class="icon" :class="item.icon"></i>
              <span class="menuName">{{ item.name }}</span>
            </div>
          </el-menu-item>
          <el-submenu
            v-if="item.childNav && item.childNav.length > 0"
            :index="idx">
            <template slot="title">
              <i class="icon" :class="item.icon"></i>
              <span class="menuName">{{ item.name }}</span>
            </template>
            <el-menu-item-group>
              <el-menu-item
                class="posit"
                :unique-opened="true"
                v-for="(child, cidx) in item.childNav"
                :key="cidx"
                :index="child.route"
              >
                <span class="p36">{{ child.name }}</span>
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </template>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: 'NavMenu',
  data () {
    return {
      isCollapse: false,
      menus: []
    }
  },
  props: {
    list: {
      type: Array,
      // eslint-disable-next-line vue/require-valid-default-prop
      default: []
    }
  }, 
  updated () {
    let that = this
    that.menus = that.list
  },
  mounted () {
    // 刷新时以当前路由做为tab加入tabs
    let that = this    
    that.$store.commit('add_tabs', { route: '/home', name: '首页' })
    that.$router.push('/home')
  },
  methods: {
    radioOpen () {
      this.isCollapse = false
      this.$emit('radioOpen','250')
    },
    radioClose () {
      this.isCollapse = true
      this.$emit('radioClose','90')
    }
  },
  computed: {
    options () {
      return this.$store.state.options
    }
  }
}
</script>
