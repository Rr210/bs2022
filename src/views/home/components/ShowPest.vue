<!--
 * @Description:
 * @Author: Harry
 * @Date: 2022-01-07 16:22:18
 * @Url: https://u.mr90.top
 * @github: https://github.com/rr210
 * @LastEditTime: 2022-01-10 17:30:39
 * @LastEditors: Harry
-->
<template>
  <div class="wrapper" @click.stop>
    <div class="block">
      <div class="img_1">
        <img :src="picurlbg" alt srcset class="bg-img" />
        <div class="item_pest_w">
          <van-icon class="icon_item_pest" name="smile-o">{{ pestname }}</van-icon>
          <van-icon class="icon_item_pest" name="fire-o">{{ basecate }}</van-icon>
          <van-icon class="icon_item_pest" name="label-o">{{ catesk }}</van-icon>
        </div>
      </div>
      <div class="item_pest_w">
        <van-divider :style="driverStyle">危害草药</van-divider>
        <van-icon class="icon_item_pest" name="flag-o">{{ harmhost }}</van-icon>
        <van-divider :style="driverStyle">危害特点</van-divider>
        <van-icon class="icon_item_pest" name="warn-o">{{ harmfeat }}</van-icon>
        <van-divider :style="driverStyle">控制措施</van-divider>
        <van-icon class="icon_item_pest" name="notes-o">{{ controlmeasures }}</van-icon>
      </div>
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
      return { color: 'var(--LightThemeColor)', borderColor: 'var(--LightThemeColor)', padding: '0 16px' }
    })
    return {
      driverStyle
    }
  }
}
</script>

<style lang="less" scoped>
.block {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80%;
  // height: 80%;
  border-radius: 5px;
  background-color: var(--pageBg);
  overflow: auto;
  max-height: 80%;
  padding: 10px 5px;
}
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
  // position: absolute;
  // top: 0;
  // left: 0;
  // width: 100%;
  // height: 100%;
  // opacity: 0.85;
  // // filter: blur(8px);
  // border-radius: 5px;
}

.item_pest_w {
  display: flex;
  flex-direction: column;
  font-size: 16px;
  padding: 5px;
  // color:#fff;
  .icon_item_pest {
    // padding: 5px 0;
  }
}
</style>
