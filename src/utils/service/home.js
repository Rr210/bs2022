/*
 * @Author: Harry
 * @Date: 2022-03-18 15:12:35
 * @LastEditors: harry
 * @Github: https://github.com/rr210
 * @LastEditTime: 2022-03-18 15:17:03
 * @FilePath: \vant-u\src\utils\serve\home.js
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
