// @ts-nocheck
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import store from './store/index'
import Fragment from 'vue-fragment'
Vue.use(ElementUI)
Vue.use(Fragment.Plugin)
Vue.config.productionTip = false
Vue.config.silent = true
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
