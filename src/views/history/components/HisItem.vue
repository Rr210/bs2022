<!--
 * @Author: Harry
 * @Date: 2022-02-07 17:28:11
 * @LastEditors: harry
 * @Github: https://github.com/rr210
 * @LastEditTime: 2022-02-07 17:48:41
 * @FilePath: \vant-u\src\views\history\components\HisItem.vue
-->
<template>
  <van-swipe-cell>
    <div>
      <div>
        <img :src="hisbeforepic" />
      </div>
      <div></div>
    </div>
    <template #right>
      <van-button square type="danger" text="删除" />
    </template>
  </van-swipe-cell>
</template>

<script>
export default {
  props: {
    hisbeforepic: {
      type: String,
      required: true,
      default: ''
    }
  }
}
</script>
<style lang="less" scoped>
</style>
