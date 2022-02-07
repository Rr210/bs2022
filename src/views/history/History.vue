<!--
 * @Description:
 * @Author: Harry
 * @Date: 2021-12-26 20:00:32
 * @Url: https://u.mr90.top
 * @github: https://github.com/rr210
 * @LastEditTime: 2022-02-07 18:47:15
 * @LastEditors: harry
-->
<template>
  <his-tabnav></his-tabnav>
  <!-- 弹窗提醒 -->
  <van-popup
    class="re_btn"
    v-model:show="stateLogin"
    round
    position="bottom"
    :style="{ height: '20%' }"
  >
    <van-button type="primary" @click="signin">您还未登录，点击登录</van-button>
  </van-popup>
</template>

<script>
import {
  computed,
  getCurrentInstance,
  onMounted,
  ref
} from '@vue/runtime-core'
import HisTabnav from './components/HisTabnav.vue'
import { HISTORY_GET_URL } from '../../utils/api/urlapi'
export default {
  components: {
    HisTabnav
  },
  setup() {
    const { proxy } = getCurrentInstance()
    const historyList = ref([])
    const stateLogin = computed(() => {
      return !proxy.$store.state.isLogin
    })
    // 获取历史记录
    const getHistoryList = async function () {
      const { openid } = JSON.parse(window.localStorage.getItem('userinfo'))
      if (openid) {
        const { data: res } = await proxy.$http.post(HISTORY_GET_URL, {
          data: openid
        })
        console.log(res)
      }
      console.log(openid)
    }
    // 判断是否登录成功
    const signin = function () {
      proxy.$router.replace('/login')
    }
    onMounted(() => {
      getHistoryList()
    })
    return { signin, stateLogin, historyList }
  }
}
</script>

<style lang="less" scoped>
</style>
