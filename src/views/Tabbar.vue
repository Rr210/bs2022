<!--
 * @Description:
 * @Author: Harry
 * @Date: 2021-12-26 16:03:19
 * @Url: https://u.mr90.top
 * @github: https://github.com/rr210
 * @LastEditTime: 2022-03-28 13:00:05
 * @LastEditors: harry
-->
<template>
  <van-nav-bar title="Pest identification">
    <template #right>
      <span
        class="iconfont icon-biaoqian-yueliang-28"
        @click="clickTheme"
      ></span>
    </template>
    <template #left>
      <!-- 展示登录的状态框 -->
      <van-popover
        v-model:show="showPopover"
        placement="right-start"
        :actions="actions"
        @select="onSelect"
      >
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
  <van-tabbar v-model="active" route>
    <van-tabbar-item icon="home-o" replace :to="{ name: 'home' }"
      >首页</van-tabbar-item
    >
    <van-tabbar-item icon="scan" replace :to="{ name: 'main' }" dot
      >识别</van-tabbar-item
    >
    <van-tabbar-item icon="clock-o" replace :to="{ name: 'history' }" :badge="dotnum"
      >历史</van-tabbar-item
    >
    <van-tabbar-item icon="setting-o" replace :to="{ name: 'mine' }" dot
      >设置</van-tabbar-item
    >
  </van-tabbar>
</template>

<script>
import { computed, onMounted, reactive, toRefs } from '@vue/runtime-core'
import debounceMerge from '@/utils/tool/debounce'
import { useStore } from 'vuex'
export default {
  setup() {
    const Store = useStore()
    const stateTemp = reactive({
      active: 0,
      themeC: 'light', // 主题色设置
      showPopover: false,
      actions: [
        { text: '切换主题', icon: 'edit', index: 0 },
        { text: '退出', icon: 'exchange', index: 1 }
      ]
    })
    // 头像图片下拉框
    const clickTheme = debounceMerge(
      function () {
        stateTemp.themeC = stateTemp.themeC === 'dark' ? 'light' : 'dark'
        document.head
          .querySelector('#skin')
          .setAttribute('href', `css/skin/theme_${stateTemp.themeC}.css`)
      },
      500,
      true
    )
    // 点击头部的头像详情
    const onSelect = function (action) {
      console.log(action)
      if (action.index === 1) {
        Store.dispatch('login/layoutPage')
      }
    }
    const isLogined = function (userinfo) {
      Store.dispatch('login/saveLoginState', { userinfo })
    }
    const isloginstate = computed(() => {
      return Store.state.login.isLogin
    })
    const dotnum = computed(() => {
      const dot = Store.state.history.historyNum
      return dot === 0 ? '' : dot
    })
    const userPic = computed(() => {
      return Store.state.login.userinfo
    })
    onMounted(() => {
      const userinfo = localStorage.getItem('userinfo')
      if (userinfo) {
        isLogined(JSON.parse(userinfo))
      }
    })
    return {
      clickTheme,
      userPic,
      dotnum,
      isloginstate,
      onSelect,
      ...toRefs(stateTemp)
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
