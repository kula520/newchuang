// @ts-nocheck
import axios from 'axios'
import config from '../../config/config.base'
let instance = axios.create()

// instance.defaults.baseURL = 'http://101.200.40.167' // 正是环境
// instance.defaults.baseURL = 'http://39.96.41.159:8287' // 线上8287
instance.defaults.baseURL = config.baseURL // 测试环境
instance.defaults.withCredentials = true

// 添加请求拦截器
let cookiesDatas = JSON.parse(localStorage.getItem('cookiesDatas'))
let token
if (cookiesDatas != null) {
  if (cookiesDatas.UserToken != undefined) {
    token = cookiesDatas.UserToken
  }
} else {
  let cookiesObj = {}
  cookiesObj.text = 'text'
  let cookiesObjString = JSON.stringify(cookiesObj)
  localStorage.setItem('cookiesDatas', cookiesObjString)
  history.go(0)
}

instance.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  config.headers.Authorization = token
  return config
}, function (error) {
  // 对请求错误做些什么
  console.log(error)
  return Promise.reject(error)
})

// 添加响应拦截器
instance.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  if (response.status == '200') {
    if (response.data.code == '1001') {
      history.go(0)
      localStorage.clear()
    }
  }
  return response.data
}, function (error) {
  // 对响应错误做点什么
  if (error && error.response && error.response.status == '401') {
    history.go(0)
    localStorage.clear()
  }
  return Promise.reject(error)
})

export default instance
