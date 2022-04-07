<!--
 * @Author: Harry
 * @Date: 2022-03-28 14:12:46
 * @LastEditors: harry
 * @Github: https://github.com/rr210
 * @LastEditTime: 2022-04-07 12:13:12
 * @FilePath: \vant-u\src\components\Contact.vue
-->
<template>
  <div class="contact-wrap" id="cantact-hb">
    <div v-if="imageUrl" class="result-contact-hb">
      <img :src="imageUrl" alt srcset />
      <div class="gethb candle-concat-hb" @click="imageUrl = ''">取消海报</div>
    </div>
    <div class="zz-wrap">
      <img :src="userpic" alt srcset />
      <span>{{ username }}</span>
    </div>
    <div class="zz-pic">
      <img :src="zzpic" alt srcset />
    </div>
    <div class="gethb" @click="getHb">生成海报</div>
  </div>
</template>

<script>
import { doCut } from '@/utils/tool/html2cancas-c'
import { reactive, toRefs } from '@vue/reactivity'
export default {
  name: 'Contact',
  props: {
    userpic: {
      type: String,
      required: true,
      default: 'css/img/main/gravatar.png'
    },
    username: {
      type: String,
      required: true,
      default: '无'
    },
    zzpic: {
      type: String,
      required: true,
      default: '无'
    }
  },
  setup() {
    const state = reactive({
      imageUrl: ''
    })
    const getHb = function () {
      const dom = document.querySelector('#cantact-hb')
      doCut(dom, state)
    }
    return {
      getHb,
      ...toRefs(state)
    }
  }
}
</script>
<style lang="less" scoped>
.contact-wrap {
  position: relative;
  width: 80vw;
  height: 335px;
  overflow: hidden;
  font-size: 16px;
  .zz-wrap {
    margin: 10px;
    img {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      vertical-align: middle;
      margin-right: 5px;
    }
  }
}
.zz-pic {
  text-align: center;
  margin: 20px 20px 10px 20px;
  img {
    width: 200px;
    height: 200px;
    border-radius: 10px;
  }
}
.gethb {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 50px;
  background-color: rgba(66, 67, 68, 0.41);
  text-align: center;
  line-height: 50px;
  font-weight: 550;
  color: #fff;
}
.result-contact-hb {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 20;
}
.candle-concat-hb {
  position: absolute;
  bottom: 0;
  left: 0;
  z-index: 21;
}
</style>
