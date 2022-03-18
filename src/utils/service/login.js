/*
 * @Author: Harry
 * @Date: 2022-03-18 15:03:15
 * @LastEditors: harry
 * @Github: https://github.com/rr210
 * @LastEditTime: 2022-03-18 15:04:22
 * @FilePath: \vant-u\src\utils\serve\login.js
 */
import axios from '@/utils/http.js'
// 初始化登录验证
export function initLogin(requestAPI, data) {
  return axios.post(requestAPI, data)
}
