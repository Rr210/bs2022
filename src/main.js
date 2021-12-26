import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import wx from 'weixin-js-sdk'
import axios from '@/utils/http.js'
const app = createApp(App)
app.config.globalProperties.$wx = wx
app.config.globalProperties.$http = axios
app.use(store).use(router).mount('#app')
