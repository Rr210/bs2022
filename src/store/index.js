/*
 * @Author: Harry
 * @Date: 2021-12-26 15:16:20
 * @LastEditors: harry
 * @Github: https://github.com/rr210
 * @LastEditTime: 2022-03-27 16:43:31
 * @FilePath: \vant-u\src\store\index.js
 */
import { createStore } from 'vuex'
import login from '@/store/login'
import history from '@/store/history'
export default createStore({
  modules: {
    history,
    login
  }
})
