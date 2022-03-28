/*
 * @Author: Harry
 * @Date: 2021-12-26 15:16:20
 * @LastEditors: harry
 * @Github: https://github.com/rr210
 * @LastEditTime: 2022-03-28 19:56:44
 * @FilePath: \vant-u\src\main.js
 */
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/assets/css/animate.css'
import vant from '@/utils/vantui.js'
import '@/assets/css/icon/iconfont.css'
import '@/assets/css/reset.css'
import 'amfe-flexible'
import cookierule from './utils/serct/cookierule'
const app = createApp(App)
vant(app)
app.config.globalProperties.$cookie = cookierule
app.use(store).use(router).mount('#app')
