<!--
 * @Description:
 * @Author: Harry
 * @Date: 2022-01-06 14:55:16
 * @Url: https://u.mr90.top
 * @github: https://github.com/rr210
 * @LastEditTime: 2022-03-19 16:38:43
 * @LastEditors: harry
-->
<template>
  <div class="item_wrap">
    <div class="item_pic" :style="`animation: zoomIn .${index + 4}s linear`">
      <img :src="picUrl" :alt="itemText" :title="itemText" srcset />
    </div>
    <div class="item_text">{{ itemText }}</div>
    <van-tag class="tag-mask" mark type="primary">{{
      catePest.substring(0, 2)
    }}</van-tag>
  </div>
</template>

<script>
export default {
  name: 'ItemPest',
  props: {
    picUrl: {
      type: String,
      required: true,
      default: ''
    },
    itemText: {
      type: String,
      required: true,
      default: ''
    },
    catePest: {
      type: String,
      required: true,
      default: ''
    },
    index: {
      type: Number,
      required: true,
      default: 0
    }
  },
  setup(props, context) {}
}
</script>

<style lang="less" scoped>
.item_wrap {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 26%;
  height: 110px;
  // animation: zoomIn 0.5s linear;
  .item_pic {
    width: 100%;
    height: 70%;
    padding: 5px 0;
    img {
      width: 100%;
      height: 100%;
      border-radius: 8px;
      object-fit: fit;
    }
  }
  .item_text {
    font-size: 14px;
    text-overflow: -o-ellipsis-lastline;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    line-clamp: 1;
    -webkit-box-orient: vertical;
  }
}

.tag-mask {
  position: absolute;
  top: 14px;
  right: 0px;
}
</style>
