<!--
 * @Description:
 * @Author: Harry
 * @Date: 2021-12-26 19:55:14
 * @Url: https://u.mr90.top
 * @github: https://github.com/rr210
 * @LastEditTime: 2021-12-26 21:16:20
 * @LastEditors: Harry
-->
<template>
  <van-uploader :after-read="afterRead" />
</template>

<script>
import { onMounted, getCurrentInstance } from '@vue/runtime-core'
export default {
  setup() {
    const { proxy } = getCurrentInstance()
    const getSignature = async function () {
      const { data: res } = await proxy.$http.post('/api')
      if (res.status_code === 1) {
        console.log(res)
        initTk()
      }
    }
    const initTk = function () {
      proxy.$wx.config({
        debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        appId: 'wx125fa03aabf95990', // 必填，公众号的唯一标识
        timestamp: '', // 必填，生成签名的时间戳
        nonceStr: '', // 必填，生成签名的随机串
        signature: '', // 必填，签名
        jsApiList: [] // 必填，需要使用的JS接口列表
      })
    }
    onMounted(() => {
      getSignature()
    })
    return {
      // getSignature
    }
  }
}
</script>

<style>
</style>
