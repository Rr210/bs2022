/*
 * @Author: Harry
 * @Date: 2022-01-05 10:50:41
 * @LastEditors: harry
 * @Github: https://github.com/rr210
 * @LastEditTime: 2022-03-27 16:50:24
 * @FilePath: \vant-u\src\store\login\actions.js
 */
import axios from '@/utils/http'
import { LOGIN_STATE_URL } from '@/utils/api/urlapi'

export const saveLoginState = function (context, data) {
  return new Promise(() => {
    const openid = data.userinfo.openid
    if (openid) {
      axios.post(LOGIN_STATE_URL, { data: openid }).then((res) => {
        console.log(res)
        if (res.data.status_code === 1) {
          data.isLogin = true
        } else {
          data.isLogin = false
          localStorage.clear()
        }
        context.commit('moLoginState', data)
        console.log(data)
      })
    }
  })
}

// 退出登录
export const layoutPage = function (context) {
  return new Promise(() => {
    localStorage.clear()
    context.commit('LayoutState')
  })
}
