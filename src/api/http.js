/** axios封装
 * 請求拦截、相应拦截、错误统一处理
 */
import axios from 'axios'
import QS from 'qs'
import router from '@/router'
// import store from '../store/index'
import { Message } from 'element-ui'

// 环境的切换
/* if (process.env.NODE_ENV === 'development') {
  axios.defaults.baseURL = '/api'
} else if (process.env.NODE_ENV === 'debug') {
  axios.defaults.baseURL = ''
} else if (process.env.NODE_ENV === 'production') {
  axios.defaults.baseURL = 'http://api.123dailu.com/'
} */
axios.defaults.baseURL = 'http://f5point.twczw.website/api'
if (process.env.NODE_ENV === 'serve') {
  axios.defaults.baseURL = process.env.VUE_APP_BASEURL
} else if (process.env.NODE_ENV === 'build') {
  axios.defaults.baseURL = window.location.protocol + "//" + window.location.host + "/api"
} else {
  axios.defaults.baseURL = window.location.protocol + "//" + window.location.host
}

// 請求超时时间
axios.defaults.timeout = 300000

// post請求头
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'

// 接口错误拦截
// axios.interceptors.response.use(function (response) {

// })

// 請求拦截器
/* axios.interceptors.request.use(
  config => {
    // 每次发送請求之前判断是否存在token，如果存在，则统一在http請求的header都加上token，不用每次請求都手动添加了
    // 即使本地存在token，也有可能token是过期的，所以在响应拦截器中要对返回状态进行判断
    // const token = store.state.token
    // token && (config.headers.Authorization = token)
    if (config.url.includes('/System/upload_picture')) {
      config.headers['Content-Type'] = 'multipart/form-data'
      // console.log('to')
      // console.log(config)
    }
    return config
  },
  error => {
    return Promise.error(error)
  })
 */
//http response 拦截器
axios.interceptors.response.use(
  response => {
    if (response.data.code == "202") {
      router.replace({ name: 'login' })
    }
    return response;
  },
  error => {
    return Promise.reject(error);
  }
);
// 响应拦截器
// axios.interceptors.response.use(
//   response => {
//     // console.log(response, '6')
//     if (response.data.code === '200') {
//       // console.log(response.data.code)
//       return Promise.resolve(response)
//     }
//     // } else {
//     //   console.log(response.data.code)
//     //   return Promise.reject(response)
//     // }
//   },
//   // 服务器状态码不是200的情况
//   error => {
//     // console.log(error, '3')
//     if (error.response.data.code) {
//       switch (error.response.data.code) {
//         // 401: 未登录
//         // 未登录则跳转登录页面，并携带当前页面的路径
//         // 在登录成功后返回当前页面，这一步需要在登录页操作。
//         case '202':
//           this.$router.replace({
//             path: '/login',
//             query: { redirect: this.$router.currentRoute.fullPath }
//           })
//           break
//           // 403 token过期
//           // 登录过期对用户进行提示
//           // 清除本地token和清空vuex中token对象
//           // 跳转登录页面
//         case 403:
//           this.$message.error({
//             message: '登录过期，請重新登录',
//             duration: 1000,
//             forbidClick: true
//           })
//           // 清除token
//           // localStorage.removeItem('token')
//           // store.commit('loginSuccess', null)
//           // 跳转登录页面，并将要浏览的页面fullPath传过去，登录成功后跳转需要访问的页面
//           setTimeout(() => {
//             this.$router.replace({
//               path: '/login',
//               query: {
//                 redirect: this.$router.currentRoute.fullPath
//               }
//             })
//           }, 1000)
//           break
//           // 404請求不存在
//         case 404:
//           this.$message.error({
//             message: '网络請求不存在',
//             duration: 1500,
//             forbidClick: true
//           })
//           break
//           // 其他错误，直接抛出错误提示
//         default:
//           this.$message({
//             message: error.response.data.message,
//             duration: 1500,
//             forbidClick: true
//           })
//       }
//       return Promise.reject(error.response)
//     }
//   }
// )
/**
 * get方法，对应get請求
 * @param {String} url [請求的url地址]
 * @param {Object} params [請求时携带的参数]
 */
export function get (url, params) {
  return new Promise((resolve, reject) => {
    axios.get(url, {
      params: params
    })
      .then(res => {
        resolve(res)
      })
      .catch(err => {
        reject(err)
      })
  })
}
/**
 * post方法，对应post請求
 * @param {String} url [請求的url地址]
 * @param {Object} params [請求时携带的参数]
 */
export function post (url, params, headers) {
  return new Promise((resolve, reject) => {
    axios.post(url, QS.stringify(params), headers)
      .then(res => {
        resolve(res)
      })
      .catch(err => {
        reject(err)
      })
  })
}

export function posts (url, params, headers) {
  return new Promise((resolve, reject) => {
    axios.post(url, params, headers)
      .then(res => {
        resolve(res)
      })
      .catch(err => {
        reject(err)
      })
  })
}

/**
 * put方法，对应put請求
 * @param {String} url [請求的url地址]
 * @param {Object} params [請求时携带的参数]
 */
export function put (url, params) {
  return new Promise((resolve, reject) => {
    axios.put(url, params)
      .then(res => {
        resolve(res)
      })
      .catch(err => {
        reject(err)
      })
  })
}

/**
 * delete方法，对应delete請求
 * @param {String} url [請求的url地址]
 * @param {Object} params [請求时携带的参数]
 */
export function Delete (url, params) {
  return new Promise((resolve, reject) => {
    axios.delete(url, params)
      .then(res => {
        resolve(res)
      })
      .catch(err => {
        reject(err)
      })
  })
}
