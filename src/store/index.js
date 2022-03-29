/*
 * @Author: Harry
 * @Date: 2021-12-26 15:16:20
 * @LastEditors: harry
 * @Github: https://github.com/rr210
 * @LastEditTime: 2022-03-29 13:58:56
 * @FilePath: \vant-u\src\store\index.js
 */
import { createStore } from 'vuex'
import login from '@/store/login'
import history from '@/store/history'
import home from '@/store/home'
export default createStore({
  modules: {
    history,
    login,
    home
  }
})
