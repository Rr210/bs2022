<!--
 * @Author: Harry
 * @Date: 2022-03-09 14:40:13
 * @LastEditors: harry
 * @Github: https://github.com/rr210
 * @LastEditTime: 2022-03-09 15:54:20
 * @FilePath: \vant-u\src\components\CloseBtn.vue
-->
<template>
  <svg
    @click="CloseMark"
    t="1646811227043"
    class="icon"
    viewBox="0 0 1024 1024"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    p-id="12043"
  >
    <path
      d="M796.077419 752.474839L271.525161 227.922581c-9.249032-9.249032-24.443871-9.249032-33.692903 0-9.249032 9.249032-9.249032 24.443871 0 33.692903l524.552258 524.552258c9.249032 9.249032 24.443871 9.249032 33.692903 0 9.249032-9.249032 9.249032-23.783226 0-33.692903"
      p-id="12044"
      fill="#2c2c2c"
    ></path>
    <path
      d="M279.452903 794.095484l523.891613-523.891613c9.249032-9.249032 9.249032-24.443871 0-33.692903-9.249032-9.249032-24.443871-9.249032-33.692903 0l-523.891613 523.891613c-9.249032 9.249032-9.249032 24.443871 0 33.692903 9.249032 9.249032 24.443871 9.249032 33.692903 0"
      p-id="12045"
      fill="#2c2c2c"
    ></path>
  </svg>
</template>

<script>
import { inject } from 'vue' // 引入inject
export default {
  name: 'CloseBtn',
  setup() {
    const awaitSon = inject('awaitSon')
    const CloseMark = function() {
      awaitSon(11)
    }
    return { CloseMark }
  }
}
</script>
<style lang="less" scoped>
svg {
  width: 100%;
}
</style>
