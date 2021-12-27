<!--
 * @Description:
 * @Author: Harry
 * @Date: 2021-12-26 19:59:49
 * @Url: https://u.mr90.top
 * @github: https://github.com/rr210
 * @LastEditTime: 2021-12-27 18:27:34
 * @LastEditors: Harry
-->
<template>
  <button @click="signin">登录</button>
</template>

<script>
import { getCurrentInstance, onMounted } from 'vue'
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
        data: {
          code
        }
      })
      console.log(res)
    }
    onMounted(() => {
      const token = localStorage.getItem('ACCESSTOKEN')
      const code = window.location.search.slice(1).split('&')[0].split('=')
      if (code[0] === 'code' && !token && code) {
        const bs = new Base64()
        localStorage.setItem('ACCESSTOKEN', bs.encode(code[1]))
        initUserInfo(code[1])
      }
    })
    return {
      signin
    }
  }
}
</script>

<style lang="less" scoped>
</style>
