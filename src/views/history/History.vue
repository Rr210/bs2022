<!--
 * @Description:
 * @Author: Harry
 * @Date: 2021-12-26 20:00:32
 * @Url: https://u.mr90.top
 * @github: https://github.com/rr210
 * @LastEditTime: 2022-03-27 16:26:40
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
import { computed } from '@vue/runtime-core'
import { defineAsyncComponent } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
const HisTabnav = defineAsyncComponent(() =>
  import('./components/HisTabnav.vue')
)
export default {
  components: {
    HisTabnav
  },
  setup() {
    const Store = useStore()
    const router = useRouter()
    const stateLogin = computed(() => {
      return !Store.state.login.isLogin
    })
    // 判断是否登录成功
    const signin = function () {
      localStorage.clear()
      router.replace('/login')
    }
    return { signin, stateLogin }
  }
}
</script>

<style lang="less" scoped>
</style>
