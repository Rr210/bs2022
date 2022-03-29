/*
 * @Author: Harry
 * @Date: 2022-03-27 15:12:14
 * @LastEditors: harry
 * @Github: https://github.com/rr210
 * @LastEditTime: 2022-03-29 13:56:14
 * @FilePath: \vant-u\src\store\home\actions.js
 */
export function changeDetailPest(context, data) {
  if (data) {
    context.commit('saveDetailPest', data)
  }
}
