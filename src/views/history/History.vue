<!--
 * @Description:
 * @Author: Harry
 * @Date: 2021-12-26 20:00:32
 * @Url: https://u.mr90.top
 * @github: https://github.com/rr210
 * @LastEditTime: 2022-03-18 15:22:55
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
import {
  computed,
  onMounted
} from '@vue/runtime-core'
import HisTabnav from './components/HisTabnav.vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
export default {
  components: {
    HisTabnav
  },
  setup() {
    const Store = useStore()
    const route = useRoute()
    const stateLogin = computed(() => {
      return !Store.state.isLogin
    })
    // 判断是否登录成功
    const signin = function () {
      localStorage.clear()
      route.replace('/login')
    }
    onMounted(() => {
    })
    return { signin, stateLogin }
  }
}
</script>

<style lang="less" scoped>

</style>
