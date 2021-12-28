/***
 * @Description:
 * @Author: Harry
 * @Date: 2021-12-26 15:49:21
 * @Url: https://u.mr90.top
 * @github: https://github.com/rr210
 * @LastEditTime: 2021-12-28 13:52:08
 * @LastEditors: Harry
 */
import axios from 'axios'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

const startLoading = () => {
  NProgress.start()
}
const endLoading = () => {
  NProgress.done()
}
// 请求拦截
// axios.defaults.withCredentials = true
axios.interceptors.request.use((config) => {
  // 加载
  startLoading()
  return config
})

// 响应拦截
axios.interceptors.response.use((response) => {
  // 结束loading
  endLoading()
  return response
}, error => {
  // 结束loading
  endLoading()
  // 错误提醒
  return Promise.reject(error)
})

export default axios
