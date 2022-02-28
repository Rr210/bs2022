<!--
 * @Description:
 * @Author: Harry
 * @Date: 2021-12-27 12:51:06
 * @Url: https://u.mr90.top
 * @github: https://github.com/rr210
 * @LastEditTime: 2022-02-28 12:42:21
 * @LastEditors: harry
-->
<template>
<div class="loding_w"></div>
</template>

<script>
import { CONGIG_DETAILS } from '../../utils/api/urlapi'
export default {
  setup() {
    const wxauth2 = async function () {
      console.log(process.env.VUE_APP_URL_AUTH)
      // eslint-disable-next-line camelcase
      const url_ba = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${CONGIG_DETAILS.appId}&redirect_uri=${encodeURIComponent(process.env.VUE_APP_URL_AUTH)}&response_type=code&scope=snsapi_userinfo&state=123#wechat_redirect`
      // eslint-disable-next-line camelcase
      window.location.replace(url_ba)
    }
    wxauth2()
    return { }
  }
}
</script>

<style>
</style>
