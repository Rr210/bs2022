<!--
 * @Description:
 * @Author: Harry
 * @Date: 2021-12-26 19:55:14
 * @Url: https://u.mr90.top
 * @github: https://github.com/rr210
 * @LastEditTime: 2022-04-07 12:59:39
 * @LastEditors: harry
-->
<template>
  <div class="pic-mains">
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
            {{ stateLogin ? "" : "登录后使用" }}
            <em>点击上传</em>
          </div>
        </div>
      </van-uploader>
      <div class="empty_">
        <van-image class="empty_img" src="css/svg/empty.svg" fit="cover"></van-image>
        <span class="span_s">您还未上传图片，暂无记录</span>
      </div>
    </div>
    <div v-else class="pic-mains-2">
      <div class="pre_res" v-if="imgres">
        <!-- <van-image :src="imgpre"></van-image> -->
        <div class="pre_res_1">
          <van-image :src="imgres"></van-image>
        </div>
        <div class="pre_res_2">
          <div class="r_pre">Category</div>
          <div class="r_pre r_pre_1">{{ resPic.res_total }}种</div>
          <div class="r_pre">Speed</div>
          <div class="r_pre r_pre_1">{{ resPic.time_count }}</div>
          <slide-lr v-if="resPic.res_total > 1"></slide-lr>
        </div>
      </div>

      <div v-show="!imgres" class="lo2">
        <img src="css/svg/Pulse-1s-200px.svg" class="gif-loading" alt srcset />
        <h6 style="margin: 0">loading....</h6>
      </div>
      <div class="pic-2" :class="isactive ? 'isactive-detail' : 'active-detail'" v-if="imgres">
        <span class="move-detail" @click="changeContop(0)"></span>
        <swiper class="my-swipe">
          <swiper-slide v-for="(item, index) in resPic.res" :key="index">
            <icon-main
              :itemcate="item['cate-cz']['cate']"
              :itemmc="item['cate-cz']['zh-name']"
              :itemnum="item['nums']"
              :itemrate="item['max_rate']"
            ></icon-main>
          </swiper-slide>
        </swiper>
        <div class="btn-function">
          <div class="condel" @click="cancelMain">取消</div>
          <van-uploader
            :before-read="beforeRead"
            @change="getPicture($event)"
            class="re-upload"
          >重新上传</van-uploader>
        </div>
      </div>
    </div>
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
import 'swiper/swiper.less'
import { defineAsyncComponent } from 'vue'
// swiper 必备组件
import { Swiper, SwiperSlide } from 'swiper/vue'
import { computed, reactive, toRefs } from '@vue/runtime-core'
import { UPLOAD_PIC_URL } from '../../utils/api/urlapi'
import { uploadPic } from '@/utils/service/main.js'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
// 进行图片的压缩 压缩的等级为0.6
import Compressor from 'compressorjs'
import { Toast } from 'vant'
const SlideLr = defineAsyncComponent(() => import('./components/SlideLr.vue'))
const IconMain = defineAsyncComponent(() =>
  import('./components/IconMain.vue')
)
export default {
  components: { IconMain, Swiper, SwiperSlide, SlideLr },
  setup() {
    const stateTemp = reactive({
      isshow: false,
      imgpre: '',
      imgres: '',
      resPic: {},
      isactive: false
    })
    const Store = useStore()
    const router = useRouter()
    const stateLogin = computed(() => {
      return Store.state.login.isLogin
    })
    const beforeRead = (file) => {
      console.log(stateLogin.value)
      if (!stateLogin) {
        // Toast('请上传 jpg 格式图片')
        stateTemp.isshow = true
        return false
      }
      console.log(file)
      uploadpicserve(file)
      return true
    }
    const changeContop = function (nums) {
      if (nums === 0) {
        stateTemp.isactive = !stateTemp.isactive
      } else {
        if (!stateTemp.isactive) {
          console.log('object')
          stateTemp.isactive = true
        }
      }
    }
    // 上传图片文件
    const getPicture = function (e) {
      // 预览图片
      stateTemp.imgres = ''
      const src = window.URL.createObjectURL(e.target.files[0])
      stateTemp.imgpre = stateLogin.value ? src : ''
      console.log(e)
    }
    const uploadpicserve = function (item) {
      const UID = Store.state.login.userinfo.openid
      console.log(UID)
      if (UID) {
        const formData = new FormData()
        console.log(item)
        return new Compressor(item, {
          quality: 0.6, // 压缩质量
          checkOrientation: false, // 图片翻转，默认为false
          success: async (result) => {
            formData.append('inputpic', result)
            formData.append('appid', UID)
            try {
              const { data: res } = await uploadPic(UPLOAD_PIC_URL, formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
              })
              stateTemp.imgres =
                process.env.VUE_APP_STATIC +
                res.result.out_file.split('static/')[1]
              stateTemp.resPic = res.result.s_n_n
              console.log(res)
            } catch (error) {
              stateTemp.imgres = ''
              stateTemp.imgpre = ''
              stateTemp.resPic = []
              Toast.fail(error.message)
            }
          }
        })
      } else {
        stateTemp.isshow = true
      }
      console.log(UID)
    }
    // 登录
    const signin = function () {
      localStorage.clear()
      router.replace('/login')
    }
    const driverStyle = computed(() => {
      return {
        color: 'var(--LightThemeColor)',
        borderColor: 'var(--LightThemeColor)',
        padding: '0 16px'
      }
    })
    const driverStyle2 = computed(() => {
      return {
        borderLeft: '.2px solid var(--LightThemeColor)'
      }
    })
    // 取消按钮
    const cancelMain = function () {
      stateTemp.imgres = ''
      stateTemp.imgpre = ''
      stateTemp.resPic = []
    }
    return {
      cancelMain,
      stateLogin,
      driverStyle,
      driverStyle2,
      signin,
      beforeRead,
      getPicture,
      changeContop,
      ...toRefs(stateTemp)
    }
  }
}
</script>

<style lang="less" scoped>
// .pic-mains-2 {
//   width: 100%;
//   height: 220px;
// }
.pre_res {
  width: 100%;
  height: 240px;
  font-size: 16px;
  // padding: 60px 60px 0 0;
  display: flex;
  justify-content: center;
  align-items: center;
  .pre_res_1 {
    flex: 1.5;
    width: 100%;
    padding: 20px;
  }
  .pre_res_2 {
    // text-align: center;
    position: relative;
    flex: 1;
    .r_pre {
      padding: 10px;
      color: rgb(197, 204, 203);
    }
    .r_pre_1 {
      color: var(--LightThemeColor);
      font-weight: 550;
    }
  }
}
.pic-2 {
  background-color: var(--pageBg);
  box-shadow: 0 -2px 10px 0 var(--mainpic2boxshadow);
  border-top-left-radius: 30px;
  border-top-right-radius: 30px;
  padding-bottom: 132px;
  position: absolute;
  padding-top: 5px;
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
.lo2 {
  text-align: center;
  .gif-loading {
    width: 50%;
    margin: 70px 0 0 0;
  }
}

.btn-function {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 15px;
  padding: 20px;
  position: fixed;
  bottom: 50px;
  left: 0;
  width: 100%;
  // background-color: rgba(255,255,255,.9);
  background-color: var(--btnFunctionBg);
  z-index: 9999;
  .condel {
    flex: 1;
    text-align: right;
    color: #6062669a;
  }
  .re-upload {
    text-align: center;
    flex: 2;
    background-color: var(--LightThemeColor);
    color: var(--pageBg);
    border-radius: 10px;
    margin: 0 40px;
    height: 30px;
    line-height: 30px;
  }
}
.isactive-detail {
  top: 150px;
  transition: top 1s;
}
.active-detail {
  top: 280px;
  transition: top 1s;
}
</style>
