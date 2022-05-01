/*
 * @Author: Harry
 * @Date: 2022-03-18 15:12:35
 * @LastEditors: harry
 * @Github: https://github.com/rr210
 * @LastEditTime: 2022-05-01 19:38:53
 * @FilePath: \vant-u\src\utils\service\history.js
 */
import axios from '@/utils/http.js'
// 搜索害虫详情结果
export function searchPest(requestAPI, params) {
  return axios.get(requestAPI, params)
}
// 删除历史记录
export function deleteHistory(requestAPI, data) {
  return axios.delete(requestAPI, data)
}
// 历史记录的获取
export function historyGet(requestAPI, params) {
  return axios.post(requestAPI, params)
}

// 获取结果分析记录
export function getanalysis(requestAPI, params) {
  return axios.get(requestAPI, params)
}
