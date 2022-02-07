<!--
 * @Author: Harry
 * @Date: 2022-02-07 17:20:40
 * @LastEditors: harry
 * @Github: https://github.com/rr210
 * @LastEditTime: 2022-02-07 17:24:21
 * @FilePath: \vant-u\src\views\history\components\HisTabnav.vue
-->
<template>
  <van-dropdown-menu>
    <van-dropdown-item v-model="value1" :options="option1" />
    <van-dropdown-item v-model="value2" :options="option2" />
  </van-dropdown-menu>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'HisTabnav',
  setup() {
    const value1 = ref(0)
    const value2 = ref('a')
    const option1 = [
      { text: '全部商品', value: 0 },
      { text: '新款商品', value: 1 },
      { text: '活动商品', value: 2 }
    ]
    const option2 = [
      { text: '默认排序', value: 'a' },
      { text: '好评排序', value: 'b' },
      { text: '销量排序', value: 'c' }
    ]

    return {
      value1,
      value2,
      option1,
      option2
    }
  }
}
</script>

<style lang="less" scoped>
</style>
