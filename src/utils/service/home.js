/*
 * @Author: Harry
 * @Date: 2022-03-18 15:12:35
 * @LastEditors: harry
 * @Github: https://github.com/rr210
 * @LastEditTime: 2022-05-11 19:06:25
 * @FilePath: \vant-u\src\utils\service\home.js
 */
import axios from '@/utils/http.js'
// 主页害虫列表获取
export function pestList(requestAPI, params) {
  return axios.get(requestAPI, params)
}
// banner图列表
export function bannerList(requestAPI) {
  return axios.get(requestAPI)
}

export function searchMp(requestAPI, params) {
  return axios.get(requestAPI, params)
}
