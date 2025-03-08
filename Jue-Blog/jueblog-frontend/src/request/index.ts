import axios, { type AxiosInstance } from 'axios'
import { ElMessage } from 'element-plus'

const instance: AxiosInstance = axios.create({
  baseURL: 'https://xxxx',
  timeout: 15000,
  headers: {
    'Content-type': 'application/json',
  },
})
// 请求拦截器
instance.interceptors.request.use(request => {
  request.headers.Authorization = 'Bearer' + (localStorage.token || '')
  return request
})
// 响应拦截器
instance.interceptors.response.use(
  response => response.data,
  error => {
    if (error.response) {
      let response = error.response
      if (response.status === 401) {
        ElMessage.error('登录已过期，请重新登录')
        localStorage.removeItem('token')
      } else {
        ElMessage.error(response.message)
      }
    }
    return Promise.reject(error)
  }
)
export default instance
