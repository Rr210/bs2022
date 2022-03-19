<!--
 * @Author: Harry
 * @Date: 2022-03-09 14:40:13
 * @LastEditors: harry
 * @Github: https://github.com/rr210
 * @LastEditTime: 2022-03-19 17:21:42
 * @FilePath: \vant-u\src\components\CloseBtn.vue
-->
<template>
  <div class="btn-c-k">
    <svg
      @click="FullScreen"
      t="1647679733142"
      class="icon"
      viewBox="0 0 1024 1024"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      p-id="19035"
    >
      <path
        d="M256 170.666667a128 128 0 0 0-128 128v213.333333a42.666667 42.666667 0 1 0 85.333333 0V298.666667a42.666667 42.666667 0 0 1 42.666667-42.666667h213.333333a42.666667 42.666667 0 1 0 0-85.333333H256z m512 682.666666a128 128 0 0 0 128-128v-170.666666a42.666667 42.666667 0 1 0-85.333333 0v170.666666a42.666667 42.666667 0 0 1-42.666667 42.666667h-192a42.666667 42.666667 0 1 0 0 85.333333H768z"
        p-id="19036"
        fill="var(--topbtnColor)"
      ></path>
    </svg>
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
        fill="var(--topbtnColor)"
      ></path>
      <path
        d="M279.452903 794.095484l523.891613-523.891613c9.249032-9.249032 9.249032-24.443871 0-33.692903-9.249032-9.249032-24.443871-9.249032-33.692903 0l-523.891613 523.891613c-9.249032 9.249032-9.249032 24.443871 0 33.692903 9.249032 9.249032 24.443871 9.249032 33.692903 0"
        p-id="12045"
        fill="var(--topbtnColor)"
      ></path>
    </svg>
  </div>
</template>

<script>
import { inject } from 'vue' // 引入inject
export default {
  name: 'CloseBtn',
  emits: ['screen'],
  setup(props, context) {
    const awaitSon = inject('awaitSon')
    const CloseMark = function () {
      awaitSon(11)
    }
    const FullScreen = function() {
      context.emit('screen')
    }
    return { CloseMark, FullScreen }
  }
}
</script>
<style lang="less" scoped>
.btn-c-k {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  svg {
    margin: 5px 8px 0  0;
    flex: 1;
  }
}
</style>
