import axios from 'axios'
import store from '@/store'
const request = axios.create({
  baseURL: 'http://toutiao.itheima.net',
  timeout: 3000
})
// 拦截器
// 请求拦截：每次请求都执行
// 请求拦截：每次响应回来都执行
request.interceptors.request.use(
  // 请求前做点什么
  (config) => {
    const token = store.state.user.token
    console.log(token)
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  // 请求错误时
  (error) => {
    return Promise.reject(error)
  }
)

export default request
