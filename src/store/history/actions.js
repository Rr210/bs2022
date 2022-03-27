/*
 * @Author: Harry
 * @Date: 2022-03-27 15:12:14
 * @LastEditors: harry
 * @Github: https://github.com/rr210
 * @LastEditTime: 2022-03-27 16:58:03
 * @FilePath: \vant-u\src\store\history\actions.js
 */
export function DotNumber(context, data) {
  if (data) {
    context.commit('changeDotNumber', data)
  }
}
