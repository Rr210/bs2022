<!--
 * @Description:
 * @Author: Harry
 * @Date: 2021-12-26 16:03:19
 * @Url: https://u.mr90.top
 * @github: https://github.com/rr210
 * @LastEditTime: 2022-01-07 11:04:39
 * @LastEditors: Harry
-->
<template>
  <van-nav-bar title="Pest identification">
    <template #right>
      <span class="iconfont icon-biaoqian-yueliang-28" @click="clickTheme"></span>
    </template>
    <template #left>
      <!-- 展示登录的状态框 -->
      <van-popover v-model:show="showPopover" placement="right-start" :actions="actions">
        <template #reference>
          <van-image
            v-if="isloginstate"
            class="pic_artar"
            width="1rem"
            height="1rem"
            fit="contain"
            :src="userPic.headimgurl"
          />
        </template>
      </van-popover>
    </template>
  </van-nav-bar>
  <router-view />
  <van-tabbar v-model="active" @change="onChange" route>
    <van-tabbar-item icon="home-o" replace :to="{ name: 'home' }">首页</van-tabbar-item>
    <van-tabbar-item icon="scan" replace :to="{ name: 'main' }" dot>识别</van-tabbar-item>
    <van-tabbar-item icon="clock-o" replace :to="{ name: 'history' }" badge="5">历史</van-tabbar-item>
    <van-tabbar-item icon="setting-o" replace :to="{ name: 'mine' }" badge="20">设置</van-tabbar-item>
  </van-tabbar>
</template>

<script>
import { computed, getCurrentInstance, onMounted, ref } from '@vue/runtime-core'
import debounceMerge from '@/utils/tool/debounce'
export default {
  setup() {
    const { proxy } = getCurrentInstance()
    console.log(proxy.$wx)
    const active = ref(0)
    const themeC = ref('light')
    const showPopover = ref(false)
    const actions = [
      { text: '修改资料', icon: 'edit' },
      { text: '退出', icon: 'exchange' }
    ]
    const onChange = function () {
      // console.log(active.value)
    }
    // 头像图片下拉框
    const clickTheme = debounceMerge(function () {
      themeC.value = themeC.value === 'dark' ? 'light' : 'dark'
      document.head.querySelector('#skin').setAttribute('href', `css/skin/theme_${themeC.value}.css`)
    }, 500, true)
    const isLogined = function (userinfo) {
      console.log(proxy.$store.state)
      proxy.$store.dispatch('saveLoginState', { userinfo })
    }
    const isloginstate = computed(() => {
      return proxy.$store.state.isLogin
    })
    const userPic = computed(() => {
      return proxy.$store.state.userinfo
    })
    onMounted(() => {
      const userinfo = localStorage.getItem('userinfo')
      if (userinfo) {
        isLogined(JSON.parse(userinfo))
        // userPic.value = proxy.$store.state.userinfo
      }
    })
    return {
      active,
      onChange,
      clickTheme,
      userPic,
      isloginstate,
      showPopover,
      actions
    }
  }
}
</script>

<style lang="less" scoped>
.icon-biaoqian-yueliang-28 {
  color: var(--LightThemeColor);
}
.van-nav-bar {
  font-family: "header-font";
  font-weight: 550;
}
</style>
