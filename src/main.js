/*
 * @Author: Harry
 * @Date: 2021-12-26 15:16:20
 * @LastEditors: harry
 * @Github: https://github.com/rr210
 * @LastEditTime: 2022-03-05 12:29:48
 * @FilePath: \vant-u\src\main.js
 */
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import wx from 'weixin-js-sdk'
import axios from '@/utils/http.js'
import vant from '@/utils/vantui.js'
import '@/assets/css/icon/iconfont.css'
import '@/assets/css/reset.css'
import 'amfe-flexible'
import cookierule from './utils/serct/cookierule'
const app = createApp(App)
vant(app)
axios.defaults.baseURL = process.env.VUE_APP_URL
app.config.globalProperties.$cookie = cookierule
app.config.globalProperties.$wx = wx
app.config.globalProperties.$http = axios
app.use(store).use(router).mount('#app')
