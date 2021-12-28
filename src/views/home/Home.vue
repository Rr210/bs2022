<!--
 * @Description:
 * @Author: Harry
 * @Date: 2021-12-26 16:03:19
 * @Url: https://u.mr90.top
 * @github: https://github.com/rr210
 * @LastEditTime: 2021-12-28 13:00:25
 * @LastEditors: Harry
-->
<template>
  <van-skeleton title avatar :row="3" />
  <van-sidebar v-model="active">
    <van-sidebar-item title="标签名 1" />
    <van-sidebar-item title="标签名 2" />
    <van-sidebar-item title="标签名 3" />
  </van-sidebar>
</template>

<script>
import { ref } from '@vue/reactivity'
export default {
  setup() {
    const active = ref(0)
    return {
      active
    }
  }
}
</script>

<style lang="less" scoped>
</style>
