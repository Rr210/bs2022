<!--
 * @Author: Harry
 * @Date: 2022-03-02 16:21:14
 * @LastEditors: harry
 * @Github: https://github.com/rr210
 * @LastEditTime: 2022-03-03 13:13:29
 * @FilePath: \vant-u\src\views\history\components\DetailPest.vue
-->
<template>
  <div class="block">
    <div class="item-w">
      <div class="item-c">
        <div>类别</div>
        <div>名称</div>
        <div>数量</div>
        <div>识别率</div>
        <div>更多</div>
      </div>
      <!-- <div></div> -->
      <div
        v-for="(item, index) in resPic.res"
        :key="index"
        class="item-c"
        :style="driverStyle2"
      >
        <div class="item-c-i">{{ item["cate-cz"]["cate"] }}</div>
        <div class="item-c-i">{{ item["cate-cz"]["zh-name"] }}</div>
        <div class="item-c-i">{{ item["nums"] }}</div>
        <div class="item-c-i">{{ item["max_rate"] }}</div>
        <div class="item-c-i">
          <van-button @click="handleDetail(item['cate-cz']['zh-name'])">详情</van-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from '@vue/reactivity'
import { getCurrentInstance } from '@vue/runtime-core'
export default {
  name: 'DetailPest',
  props: {
    resPic: {
      type: Object,
      required: true,
      default: function () {
        return {}
      }
    }
  },
  emits: ['detailmain'],
  setup() {
    const { proxy } = getCurrentInstance()
    const driverStyle2 = computed(() => {
      return {
        borderLeft: '.2px solid var(--LightThemeColor)'
      }
    })
    // 点击详情展示
    const handleDetail = function (u) {
      proxy.$emit('detailmain', u)
    }
    return {
      driverStyle2,
      handleDetail
    }
  }
}
</script>

<style lang="less" scoped>
// .item-w {
//   font-size: 18px;
//   display: flex;
//   flex-wrap: wrap;
//   justify-content: center;
//   align-items: center;
//   .item-c {
//     flex: 1;
//     padding: 7px;
//     justify-content: center;
//     align-items: center;
//     .item-c-i {
//       padding: 10px 0;
//     }
//   }
// }
.item-w {
  font-size: 15px;
  display: flex;
  .item-c {
    width: 33.33%;
  }
}
</style>
