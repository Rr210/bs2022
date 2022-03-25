<!--
 * @Description:
 * @Author: Harry
 * @Date: 2022-01-07 16:22:18
 * @Url: https://u.mr90.top
 * @github: https://github.com/rr210
 * @LastEditTime: 2022-03-25 09:56:44
 * @LastEditors: harry
-->
<template>
  <div class="block" :style="`width:${WidthContent};height:${HeightContent};`">
    <div class="close-btn">
      <close-btn @screen="fullScreen"></close-btn>
    </div>
    <div class="img_1">
      <div class="item-1" @click="prewOne(picurlbg)">
        <img :src="picurlbg" alt srcset class="bg-img" />
      </div>
      <div class="item_pest">
        <div class="icon_item_pest" name="smile-o">{{ pestname }}</div>
        <div class="icon_item_pest" name="fire-o">{{ basecate }}</div>
        <div class="icon_item_pest" name="label-o">{{ catesk }}</div>
      </div>
    </div>
    <div class="item_pest_w" :style="`max-height:${MaxHeight}`">
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
import { computed, reactive, toRefs } from '@vue/reactivity'
import { ImagePreview } from 'vant'
import CloseBtn from './CloseBtn.vue'
export default {
  components: { CloseBtn },
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
    const prewOne = function (e) {
      if (e) {
        ImagePreview({
          images: [e]
        })
      }
    }
    // 全屏显示
    const StyleCon = reactive({
      WidthContent: '80vw',
      MaxHeight: '8rem',
      HeightContent: '80%',
      flag: false
    })
    const fullScreen = function () {
      StyleCon.flag = !StyleCon.flag
      if (StyleCon.flag) {
        StyleCon.WidthContent = '99vw'
        StyleCon.HeightContent = '99vh'
        StyleCon.MaxHeight = '77vh'
      } else {
        StyleCon.WidthContent = '80vw'
        StyleCon.HeightContent = '80%'
        StyleCon.MaxHeight = '8rem'
      }
    }
    return {
      ...toRefs(StyleCon),
      driverStyle,
      fullScreen,
      prewOne
    }
  }
}
</script>

<style lang="less" scoped>
.img_1 {
  margin-top: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  .item-1 {
    background-color: rgba(146, 151, 179, 0.13);
    border: 0.1px solid rgba(223, 225, 237, 0.4);
    width: 110px;
    height: 110px;
    padding: 5px;
    border-radius: 10px;
    margin: 5px 10px 0 0;
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

.close-btn {
  position: absolute;
  top: 2px;
  right: 2px;
  width: 60px;
  // height: 28px;
  // z-index: 99999;
}
</style>
