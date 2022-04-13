/*
 * @Author: Harry
 * @Date: 2022-03-28 14:42:37
 * @LastEditors: harry
 * @Github: https://github.com/rr210
 * @LastEditTime: 2022-04-13 10:34:50
 * @FilePath: \vant-u\src\utils\service\mine.js
 */
import axios from '@/utils/http.js'
// 获取随机一条害虫数据
export function getRandom(requestAPI, params) {
  return axios.get(requestAPI, params)
}

export function getCate(requestAPI) {
  return axios.get(requestAPI)
}
