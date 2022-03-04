<!--
 * @Description:
 * @Author: Harry
 * @Date: 2022-01-07 16:22:18
 * @Url: https://u.mr90.top
 * @github: https://github.com/rr210
 * @LastEditTime: 2022-03-04 16:28:32
 * @LastEditors: harry
-->
<template>
    <div class="block">
      <div class="img_1">
        <img :src="picurlbg" alt srcset class="bg-img" />
        <div class="item_pest">
          <van-icon class="icon_item_pest" name="smile-o">{{
            pestname
          }}</van-icon>
          <van-icon class="icon_item_pest" name="fire-o">{{
            basecate
          }}</van-icon>
          <van-icon class="icon_item_pest" name="label-o">{{
            catesk
          }}</van-icon>
        </div>
      </div>
      <div class="item_pest_w" @click="istouch">
        <van-divider :style="driverStyle">危害草药</van-divider>
        <van-icon class="icon_item_pest" name="flag-o">{{ harmhost }}</van-icon>
        <van-divider :style="driverStyle">危害特点</van-divider>
        <van-icon class="icon_item_pest" name="warn-o">{{ harmfeat }}</van-icon>
        <van-divider :style="driverStyle">控制措施</van-divider>
        <van-icon class="icon_item_pest" name="notes-o">{{
          controlmeasures
        }}</van-icon>
      </div>
    </div>
</template>

<script>
import { computed } from '@vue/reactivity'
export default {
  props: {
    picurlbg: {
      type: String,
      required: true
    },
    pestname: {
      type: String,
      required: true,
      default: ''
    },
    catesk: {
      type: String,
      reqiured: true,
      default: ''
    },
    harmhost: {
      type: String,
      required: true
    },
    harmfeat: {
      type: String,
      required: true
    },
    controlmeasures: {
      type: String,
      required: true
    },
    basecate: {
      type: String,
      required: true
    }
  },
  setup() {
    const driverStyle = computed(() => {
      return {
        color: 'var(--LightThemeColor)',
        borderColor: 'var(--LightThemeColor)',
        padding: '0 16px'
      }
    })
    const istouch = function () {
      console.log(1)
    }
    return {
      driverStyle,
      istouch
    }
  }
}
</script>

<style lang="less" scoped>
.img_1 {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
}
.bg-img {
  width: 100px;
  height: 100px;
  border-radius: 10px;
  object-fit: cover;
}
.item_pest{
  font-size: 15px;
  display: flex;
  flex-direction: column;
  .icon_item_pest{
    margin: 10px 0;
  }
}
.item_pest_w {
  font-size: 16px;
  padding: 5px;
  overflow-y: auto;
  max-height: 300px;
  .icon_item_pest {
    // padding: 5px 0;
    // height: 200px;
  }
}
</style>
