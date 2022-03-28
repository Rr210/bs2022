/*
 * @Author: Harry
 * @Date: 2021-12-26 21:20:54
 * @LastEditors: harry
 * @Github: https://github.com/rr210
 * @LastEditTime: 2022-03-28 14:39:14
 * @FilePath: \vant-u\src\utils\api\urlapi.js
 */
const INIT_CONFIG_URL = '/v5/api'
const INIT_SIGN_URL = '/v5/wxauth2'
const PEST_LIST_URL = '/v5/insects'
const BANNER_URL = '/v5/banner'
const LOGIN_STATE_URL = '/v5/islogined'
const UPLOAD_PIC_URL = '/v5/upload'
const HISTORY_GET_URL = '/v5/history'
const SEARCH_PEST_URL = '/v5/search'
const RANDOM_PEST = '/v5/random'
const CONGIG_DETAILS = {
  appId: 'wx125fa03aabf95990'
}
export {
  INIT_CONFIG_URL, // 初始化微信公众号验证
  CONGIG_DETAILS,
  INIT_SIGN_URL,
  PEST_LIST_URL, // 昆虫列表
  BANNER_URL,
  LOGIN_STATE_URL,
  UPLOAD_PIC_URL,
  HISTORY_GET_URL,
  SEARCH_PEST_URL,
  RANDOM_PEST
}
