/*
 * @Author: Harry
 * @Date: 2022-01-05 10:50:25
 * @LastEditors: harry
 * @Github: https://github.com/rr210
 * @LastEditTime: 2022-03-27 16:04:46
 * @FilePath: \vant-u\src\store\login\mutations.js
 */
/***
 * @Description:
 * @Author: Harry
 * @Date: 2022-01-05 10:50:25
 * @Url: https://u.mr90.top
 * @github: https://github.com/rr210
 * @LastEditTime: 2022-01-05 13:41:26
 * @LastEditors: Harry
 */
// 保存登陆的信息
export const moLoginState = function (state, pathName) {
  state.isLogin = pathName.isLogin
  state.userinfo = pathName.userinfo
}

// 退出登录
export const LayoutState = function (state) {
  state.isLogin = false
  state.userinfo = {}
}
