<template>
  <div id="app">
    <login v-if="loginShow" @loginTrue="sonLogin"></login>
    <mainframenew v-else></mainframenew>
  </div>
</template>
<script>
import login from './views/login/login.vue'
import mainframenew from './views/mainframe/mainframenew.vue'
export default {
  name: 'App',
  components: {
    login,
    mainframenew
  },
  data () {
    return {
      loginShow: true
    }
  },
  watch: {
  },
  created () {
    // eslint-disable-next-line no-unused-vars
    let that = this
    let local = localStorage.getItem('cookiesDatas')
    let cookiesDatas = JSON.parse(local)
    if (cookiesDatas != null) {
      if (cookiesDatas.text == 'text') {
        that.loginShow = true
      } else {
        that.loginShow = false
      }
    }
  },
  methods: {
    sonLogin (val) {
      let that = this
      that.loginShow = val
    }
  }
}
</script>
<style>
@import url('./css/css.css');
</style>
