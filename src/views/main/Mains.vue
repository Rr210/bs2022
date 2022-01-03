<!--
 * @Description:
 * @Author: Harry
 * @Date: 2021-12-26 19:55:14
 * @Url: https://u.mr90.top
 * @github: https://github.com/rr210
 * @LastEditTime: 2022-01-03 23:04:46
 * @LastEditors: Harry
-->
<template>
  <!-- <van-uploader :after-read="afterRead" /> -->
  <button @click="uploadPic">上传图片</button>
</template>

<script>
import { onMounted, getCurrentInstance } from '@vue/runtime-core'
import { INIT_CONFIG_URL, CONGIG_DETAILS } from '../../utils/api/urlapi'
export default {
  setup() {
    const { proxy } = getCurrentInstance()
    const getSignature = async function () {
      const { data: res } = await proxy.$http.post(INIT_CONFIG_URL)
      if (res.status_code === 1) {
        console.log(res)
        const { noncestr, signature, timestamp } = res.TK
        console.log(noncestr, signature, timestamp)
        initTk(timestamp, noncestr, signature)
      }
    }
    const initTk = function (timestamp, nonceStr, signature) {
      proxy.$wx.config({
        debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        appId: CONGIG_DETAILS.appId, // 必填，公众号的唯一标识
        timestamp, // 必填，生成签名的时间戳
        nonceStr, // 必填，生成签名的随机串
        signature, // 必填，签名
        jsApiList: [
          'onMenuShareQZone',
          'onMenuShareWeibo',
          'chooseImage'
        ] // 必填，需要使用的JS接口列表
      })
      proxy.$wx.ready(function () {
        proxy.$wx.checkJsApi({
          jsApiList: [
            'onMenuShareQZone',
            'onMenuShareWeibo',
            'chooseImage'
          ], // 需要检测的JS接口列表，所有JS接口列表见附录2,
          success: function (res) {
            console.log(res)
            // 以键值对的形式返回，可用的api值true，不可用为false
            // 如：{"checkResult":{"chooseImage":true},"errMsg":"checkJsApi:ok"}
          }
        })
        // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
      })
    }
    const uploadPic = function () {
      proxy.$wx.chooseImage({
        count: 1, // 默认9
        sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
        success: function (res) {
          console.log(res)
          // var localIds = res.localIds // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
        }
      })
    }
    onMounted(() => {
      getSignature()
    })
    return {
      getSignature,
      uploadPic
    }
  }
}
</script>

<style>
</style>
