<!--
 * @Author: Harry
 * @Date: 2022-02-07 17:28:11
 * @LastEditors: harry
 * @Github: https://github.com/rr210
 * @LastEditTime: 2022-02-28 22:14:43
 * @FilePath: \vant-u\src\views\history\components\HisItem.vue
-->
<template>
  <van-swipe-cell>
    <div>
      <div class="history-after">
        <img :src="hisbeforepic" />
        <img :src="hisafterpic"/>
      </div>
      <div>
        <div>{{}}</div>
        <div></div>
        <div></div>
        <div></div>
      </div>
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
    },
    hisafterpic: {
      type: String,
      required: true,
      default: ''
    }
  }
}
</script>
<style lang="less" scoped>
.history-after{
  display: flex;
  justify-content: space-evenly;
  img{
    width: 40%;
    margin: 10px 0;
    border-radius: 10px;
    height: 100px;
  }
}
</style>
