<!--
 * @Description:
 * @Author: Harry
 * @Date: 2021-12-26 16:03:19
 * @Url: https://u.mr90.top
 * @github: https://github.com/rr210
 * @LastEditTime: 2021-12-26 20:01:58
 * @LastEditors: Harry
-->
<template>
  <van-nav-bar title="标题" />
  <router-view />
  <van-tabbar v-model="active" @change="onChange" route>
    <van-tabbar-item icon="home-o" replace to="/home">首页</van-tabbar-item>
    <van-tabbar-item icon="search"  replace to="/main" dot>标签</van-tabbar-item>
    <van-tabbar-item icon="friends-o" replace to="/history" badge="5">标签</van-tabbar-item>
    <van-tabbar-item icon="setting-o" replace to="/mine" badge="20">标签</van-tabbar-item>
  </van-tabbar>
</template>

<script>
import { getCurrentInstance, ref } from '@vue/runtime-core'
export default {
  setup() {
    const { proxy } = getCurrentInstance()
    console.log(proxy.$wx)
    const active = ref(0)
    const onChange = function () {

    }
    return {
      active,
      onChange
    }
  }
}
</script>

<style lang="less" scoped>
</style>
