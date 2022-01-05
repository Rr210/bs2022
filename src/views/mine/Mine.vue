<!--
 * @Description:
 * @Author: Harry
 * @Date: 2021-12-26 19:59:49
 * @Url: https://u.mr90.top
 * @github: https://github.com/rr210
 * @LastEditTime: 2022-01-05 22:51:53
 * @LastEditors: Harry
-->
<template>
  <button v-if="!isloginstate" @click="signin">登录</button>
  <button v-else @click="layout">退出登录</button>
  <button @click="layout">清除缓冲</button>
</template>

<script>
import { computed, getCurrentInstance, onMounted } from 'vue'
export default {
  setup() {
    const { proxy } = getCurrentInstance()
    const signin = function () {
      proxy.$router.replace('/login')
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
