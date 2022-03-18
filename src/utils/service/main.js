/*
 * @Author: Harry
 * @Date: 2022-03-18 14:33:50
 * @LastEditors: harry
 * @Github: https://github.com/rr210
 * @LastEditTime: 2022-03-18 15:00:37
 * @FilePath: \vant-u\src\utils\serve\main.js
 */
import axios from '@/utils/http.js'
// 登录验证
export function loginApi(requestAPI) {
  return axios.post(requestAPI)
}
// 上传图片函数
export function uploadPic(requestAPI, fromdata, header) {
  return axios.post(requestAPI, fromdata, header)
}
// 搜索昆虫结果
export function searchPest(requestAPI) {
  return axios.get(requestAPI)
}
