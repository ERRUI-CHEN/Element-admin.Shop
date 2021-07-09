import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'

// 创建一个axios实例
const service = axios.create({
  //设置请求的前缀 (环境变量中的信息)
  baseURL: process.env.VUE_APP_BASE_API, 
  //请求携带cookie
  // withCredentials: true, 
  //设置请求超时时间
  timeout: 5000 
})


// 请求的拦截器 (每一次请求发送之前都会先经过这个拦截器)
service.interceptors.request.use(
  config => {
    if (store.getters.token) {
      //在请求头中携带tocken
      config.headers['X-Token'] = getToken()
    }
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// 响应的拦截器 (只要服务器有响应结果就会先经过响应拦截器来处理)
service.interceptors.response.use(
  response => {
    //获取响应数据
    const res = response.data

    //如果自定义的响应状态码不为20000的时候，就认为请求出了问题
    if (res.code !== 20000) {
      //把错误原因通过Message组件显示在页面
      Message({
        message: res.message || 'Error',
        type: 'error',
        duration: 5 * 1000
      })

      // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
      if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
        // to re-login
        MessageBox.confirm('You have been logged out, you can cancel to stay on this page, or log in again', 'Confirm logout', {
          confirmButtonText: 'Re-Login',
          cancelButtonText: 'Cancel',
          type: 'warning'
        }).then(() => {
          store.dispatch('user/resetToken').then(() => {
            location.reload()
          })
        })
      }
      return Promise.reject(new Error(res.message || 'Error'))
    } 
    //如果服务器响应的自定义状态码是20000，则直接将响应结果返回
    else {
      return res
    }
  },
  error => {
    console.log('err' + error) // for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
