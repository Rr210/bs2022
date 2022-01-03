<!--
 * @Description:
 * @Author: Harry
 * @Date: 2021-12-26 16:03:19
 * @Url: https://u.mr90.top
 * @github: https://github.com/rr210
 * @LastEditTime: 2022-01-03 20:41:23
 * @LastEditors: Harry
-->
<template>
  <van-nav-bar title="中草药害虫识别">
    <template #right>
      <span class="iconfont icon-biaoqian-yueliang-28" @click="clickTheme"></span>
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
import { getCurrentInstance, ref } from '@vue/runtime-core'
import debounceMerge from '@/utils/tool/debounce'
export default {
  setup() {
    const { proxy } = getCurrentInstance()
    console.log(proxy.$wx)
    const active = ref(0)
    const themeC = ref('light')
    const onChange = function () {
      // console.log(active.value)
    }
    const clickTheme = debounceMerge(function () {
      themeC.value = themeC.value === 'dark' ? 'light' : 'dark'
      document.head.querySelector('#skin').setAttribute('href', `css/skin/theme_${themeC.value}.css`)
    }, 500, true)
    return {
      active,
      onChange,
      clickTheme
    }
  }
}
</script>

<style lang="less" scoped>
.icon-biaoqian-yueliang-28 {
  color: var(--LightThemeColor);
}
</style>
