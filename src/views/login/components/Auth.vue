<!--
 * @Description:
 * @Author: Harry
 * @Date: 2022-01-05 22:27:34
 * @Url: https://u.mr90.top
 * @github: https://github.com/rr210
 * @LastEditTime: 2022-03-18 15:18:47
 * @LastEditors: harry
-->
<template>
  <div class="loding_w"></div>
</template>

<script>
import { onMounted } from '@vue/runtime-core'
import Base64 from '@/utils/serct/base64'
import { INIT_SIGN_URL } from '@/utils/api/urlapi'
import { initLogin } from '@/utils/service/login'
export default {
  setup() {
    const initUserInfo = async function (code) {
      const { data: res } = await initLogin(INIT_SIGN_URL, {
        data: { code }
      })
      if (res.status_code === 1) {
        localStorage.setItem('userinfo', JSON.stringify(res.userinfo))
        location.href = process.env.VUE_APP_URL + '/#/mine'
      }
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
  }
}
</script>

<style lang="less" scoped>
</style>
