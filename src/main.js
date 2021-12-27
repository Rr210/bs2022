import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import wx from 'weixin-js-sdk'
import axios from '@/utils/http.js'
import vant from '@/utils/vantui.js'
import 'amfe-flexible'
import cookierule from './utils/serct/cookierule'
const app = createApp(App)
vant(app)
axios.defaults.baseURL = process.env.VUE_APP_URL
app.config.globalProperties.$cookie = cookierule
app.config.globalProperties.$wx = wx
app.config.globalProperties.$http = axios
app.use(store).use(router).mount('#app')
