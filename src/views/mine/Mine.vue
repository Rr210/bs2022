<!--
 * @Description:
 * @Author: Harry
 * @Date: 2021-12-26 19:59:49
 * @Url: https://u.mr90.top
 * @github: https://github.com/rr210
 * @LastEditTime: 2022-01-05 14:29:54
 * @LastEditors: Harry
-->
<template>
  <button v-if="!isloginstate" @click="signin">登录</button>
  <button v-else @click="layout">退出登录</button>
</template>

<script>
import { computed, getCurrentInstance, onMounted } from 'vue'
import Base64 from '../../utils/serct/base64'
import { INIT_SIGN_URL } from '../../utils/api/urlapi'
export default {
  setup() {
    const { proxy } = getCurrentInstance()
    const signin = function () {
      proxy.$router.replace('/login')
    }
    const initUserInfo = async function (code) {
      const { data: res } = await proxy.$http.post(INIT_SIGN_URL, {
        data: { code }
      })
      if (res.status_code === 1) {
        localStorage.setItem('userinfo', JSON.stringify(res.userinfo))
        location.href = process.env.VUE_APP_URL_AUTH
      }
      console.log(res)
    }
    // 退出登录
    const layout = function () {
      proxy.$store.dispatch('layoutPage')
      console.log('已退出')
    }
    // 判断登录的情况
    const isLogined = function (userinfo) {
      console.log(proxy.$store.state)
      proxy.$store.dispatch('saveLoginState', { userinfo })
    }
    const isloginstate = computed(() => {
      return proxy.$store.state.isLogin
    })
    onMounted(() => {
      const token = localStorage.getItem('ACCESSTOKEN')
      const code = window.location.search.slice(1).split('&')[0].split('=')
      if (code[0] === 'code' && !token && code) {
        const bs = new Base64()
        localStorage.setItem('ACCESSTOKEN', bs.encode(code[1]))
        initUserInfo(code[1])
      }
      const stateUserinfo = localStorage.getItem('userinfo')
      if (stateUserinfo && JSON.parse(stateUserinfo).openid) { isLogined(JSON.parse(stateUserinfo)) }
    })
    return {
      signin, isloginstate, layout
    }
  }
}
</script>

<style lang="less" scoped>
</style>
