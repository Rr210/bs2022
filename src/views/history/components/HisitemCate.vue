<!--
 * @Author: Harry
 * @Date: 2022-04-13 13:29:59
 * @LastEditors: harry
 * @Github: https://github.com/rr210
 * @LastEditTime: 2022-04-13 14:20:01
 * @FilePath: \vant-u\src\views\history\components\HisitemCate.vue
-->
<template>
  <div class="hisitemcate">
    <div class="h-i-cate">{{ pestname }}</div>
    <div class="h-i-cate">{{ pestrate }}</div>
    <div class="h-i-cate" @click="introducePest">查看介绍</div>
  </div>
</template>

<script>
import { useRouter } from 'vue-router'
export default {
  name: 'HisitemCate',
  props: {
    pestname: {
      type: String,
      required: true,
      default: ''
    },
    pestrate: {
      type: String,
      required: true,
      default: ''
    }
  },
  setup(props, context) {
    const router = useRouter()
    const introducePest = function () {
      const { pestname } = props
      router.push({ name: 'hisdetail', params: { pestname } })
    }
    return {
      introducePest
    }
  }
}
</script>
<style lang='less' scoped>
.hisitemcate {
  margin: 10px 0;
  display: flex;

  .h-i-cate {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
  }

}
</style>
