<!--
 * @Description:
 * @Author: Harry
 * @Date: 2021-12-26 19:55:14
 * @Url: https://u.mr90.top
 * @github: https://github.com/rr210
 * @LastEditTime: 2022-02-07 16:00:15
 * @LastEditors: Please set LastEditors
-->
<template>
  <!-- <van-uploader :after-read="afterRead" /> -->
  <div v-if="!imgpre">
    <van-uploader :before-read="beforeRead" @change="getPicture($event)">
      <div class="svg_wrap">
        <div class="upload_pic">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" data-v-152cbb9b>
            <path
              fill="currentColor"
              d="M544 864V672h128L512 480 352 672h128v192H320v-1.6c-5.376.32-10.496 1.6-16 1.6A240 240 0 0 1 64 624c0-123.136 93.12-223.488 212.608-237.248A239.808 239.808 0 0 1 512 192a239.872 239.872 0 0 1 235.456 194.752c119.488 13.76 212.48 114.112 212.48 237.248a240 240 0 0 1-240 240c-5.376 0-10.56-1.28-16-1.6v1.6H544z"
            />
          </svg>
        </div>
        <div class="upload__text">
          {{ stateLogin ? '' : '登录后使用' }}
          <em>点击上传</em>
        </div>
      </div>
    </van-uploader>
    <div class="empty_">
      <van-image class="empty_img" src="css/svg/empty.svg" fit="cover"></van-image>
      <span class="span_s">您还未上传图片，暂无记录</span>
    </div>
  </div>
  <div v-else>
    <div class="pre_res" v-if="imgres">
      <van-image :src="imgpre"></van-image>
      <van-image :src="imgres"></van-image>
    </div>
    <van-uploader :before-read="beforeRead" @change="getPicture($event)">
      <van-button>重新上传</van-button>
    </van-uploader>
  </div>
  <!-- 弹窗提醒 -->
  <van-popup
    class="re_btn"
    v-model:show="isshow"
    round
    position="bottom"
    :style="{ height: '20%' }"
  >
    <van-button type="primary" @click="signin">您还未登录，点击登录</van-button>
  </van-popup>
</template>

<script>
import { onMounted, getCurrentInstance, ref, computed } from '@vue/runtime-core'
import axios from 'axios'
import { INIT_CONFIG_URL, UPLOAD_PIC_URL } from '../../utils/api/urlapi'
// CONGIG_DETAILS
// import debounceMerge from '../../utils/tool/debounce'
export default {
  setup() {
    const { proxy } = getCurrentInstance()
    const isshow = ref(false)
    const imgpre = ref('')
    const imgres = ref('')
    const stateLogin = computed(() => {
      return proxy.$store.state.isLogin
    })
    const beforeRead = (file) => {
      console.log(stateLogin.value)
      if (!stateLogin) {
        // Toast('请上传 jpg 格式图片')
        isshow.value = true
        return false
      }
      console.log(file)
      uploadpicserve(file)
      return true
    }
    // 上传图片文件
    const getPicture = function (e) {
      // 预览图片
      imgres.value = ''
      const src = window.URL.createObjectURL(e.target.files[0])
      imgpre.value = stateLogin.value ? src : ''
      console.log(e)
    }
    const uploadpicserve = async function (item) {
      const UID = proxy.$store.state.userinfo.openid
      console.log(UID)
      if (UID) {
        const formData = new FormData()
        console.log(item)
        formData.append('inputpic', item)
        formData.append('appid', UID)
        const { data: res } = await axios.post(UPLOAD_PIC_URL, formData, { headers: { 'Content-Type': 'multipart/form-data' } })
        imgres.value = process.env.VUE_APP_STATIC + res.result.out_file.split('static/')[1]
        console.log(res)
      } else {
        isshow.value = true
      }
      console.log(UID)
    }
    // 登录
    const signin = function () {
      proxy.$router.replace('/login')
    }
    const getSignature = async function () {
      const { data: res } = await proxy.$http.post(INIT_CONFIG_URL)
      if (res.status_code === 1) {
        console.log(res)
        const { noncestr, signature, timestamp } = res.TK
        console.log(noncestr, signature, timestamp)
        // initTk(timestamp, noncestr, signature)
      }
    }
    // const initTk = function (timestamp, nonceStr, signature) {
    //   proxy.$wx.config({
    //     debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
    //     appId: CONGIG_DETAILS.appId, // 必填，公众号的唯一标识
    //     timestamp, // 必填，生成签名的时间戳
    //     nonceStr, // 必填，生成签名的随机串
    //     signature, // 必填，签名
    //     jsApiList: [
    //       'onMenuShareQZone',
    //       'onMenuShareWeibo',
    //       'chooseImage'
    //     ] // 必填，需要使用的JS接口列表
    //   })
    //   proxy.$wx.ready(function () {
    //     proxy.$wx.checkJsApi({
    //       jsApiList: [
    //         'onMenuShareQZone',
    //         'onMenuShareWeibo',
    //         'chooseImage'
    //       ], // 需要检测的JS接口列表，所有JS接口列表见附录2,
    //       success: function (res) {
    //         console.log(res)
    //         // 以键值对的形式返回，可用的api值true，不可用为false
    //         // 如：{"checkResult":{"chooseImage":true},"errMsg":"checkJsApi:ok"}
    //       }
    //     })
    //     // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
    //   })
    // }
    // const uploadPic = debounceMerge(function () {
    //   // console.log(stateLogin.value)
    //   // if (stateLogin.value) {
    //   //   proxy.$wx.chooseImage({
    //   //     count: 1, // 默认9
    //   //     sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
    //   //     sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
    //   //     success: function (res) {
    //   //       console.log(res)
    //   //       imgpre.value = res.localIds[0] // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
    //   //     }
    //   //   })
    //   // } else {
    //   //   isshow.value = true
    //   // }
    // }, 500, true)
    onMounted(() => {
      getSignature()
    })
    return {
      getSignature,
      // uploadPic,
      isshow,
      imgpre,
      imgres,
      stateLogin,
      signin,
      beforeRead,
      getPicture
    }
  }
}
</script>

<style lang="less" scoped>
.pre_res{
  display: flex;
  justify-content: space-evenly;
  .van-image{
    padding: 10px 5px;
  }
}
.svg_wrap {
  border: 1px dashed #d9d9d9;
  margin: 20px;
  text-align: center;
  border-radius: 10px;
  width: 335px;
  .upload_pic {
    display: inline-block;
    color: #c0c4cc;
    width: 120px;
  }
}
.upload__text {
  color: #606266;
  font-size: 14px;
  text-align: center;
  margin: 10px 0;
  em {
    color: var(--LightThemeColor);
    font-style: normal;
  }
}
.empty_ {
  display: flex;
  flex-direction: column;
  align-items: center;
  .empty_img {
    padding: 50px 0;
  }
  .span_s {
    color: var(--LightThemeColor);
    font-size: 10px;
  }
}
</style>
