<!--
 * @Description:
 * @Author: Harry
 * @Date: 2022-01-07 16:22:18
 * @Url: https://u.mr90.top
 * @github: https://github.com/rr210
 * @LastEditTime: 2022-03-05 12:13:14
 * @LastEditors: harry
-->
<template>
  <div class="block">
    <div class="img_1">
      <div class="item-1">
        <img :src="picurlbg" alt srcset class="bg-img" />
      </div>
      <div class="item_pest">
        <van-icon class="icon_item_pest" name="smile-o">{{
          pestname
        }}</van-icon>
        <van-icon class="icon_item_pest" name="fire-o">{{ basecate }}</van-icon>
        <van-icon class="icon_item_pest" name="label-o">{{ catesk }}</van-icon>
      </div>
    </div>
    <div class="item_pest_w">
      <van-divider :style="driverStyle">危害草药</van-divider>
      <div class="icon_item_pest">{{ harmhost }}</div>
      <van-divider :style="driverStyle">危害特点</van-divider>
      <div class="icon_item_pest">{{ harmfeat }}</div>
      <van-divider :style="driverStyle">控制措施</van-divider>
      <div class="icon_item_pest">{{ controlmeasures }}</div>
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
        padding: '0 16px',
        fontWeight: 550
      }
    })
    return {
      driverStyle
    }
  }
}
</script>

<style lang="less" scoped>
.img_1 {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  .item-1 {
    background-color: rgba(146, 151, 179, 0.13);
    border: 0.1px solid rgba(223, 225, 237, 0.4);
    width: 110px;
    height: 110px;
    padding: 5px;
    border-radius: 10px;
    margin: 0 auto;
  }
}
.bg-img {
  width: 100px;
  height: 100px;
  border-radius: 10px;
  object-fit: cover;
}
.item_pest {
  font-size: 15px;
  display: flex;
  flex-direction: column;
  .icon_item_pest {
    margin: 10px 0;
  }
}
.item_pest_w {
  font-size: 16px;
  padding: 5px;
  overflow-y: auto;
  max-height: 300px;
  line-height: 30px;
  .icon_item_pest {
    text-indent: 32px;
    // padding: 5px 0;
    // height: 200px;
  }
}
</style>
