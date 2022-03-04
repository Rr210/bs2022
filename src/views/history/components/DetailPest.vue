<!--
 * @Author: Harry
 * @Date: 2022-03-02 16:21:14
 * @LastEditors: harry
 * @Github: https://github.com/rr210
 * @LastEditTime: 2022-03-04 13:08:48
 * @FilePath: \vant-u\src\views\history\components\DetailPest.vue
-->
<template>
  <div class="block">
    <div class="hd-detail-w">
      <img :src="apic" @click="handlePrewAfter(apic)" />
    </div>
    <div class="item-w">
      <div class="item-c">
        <div class="item-c-i">类别</div>
        <div class="item-c-i">名称</div>
        <div class="item-c-i">数量</div>
        <div class="item-c-i">识别率</div>
        <div class="item-c-i">更多</div>
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
          <van-button class="detail-btn" @click="handleDetail(item['cate-cz']['zh-name'])"
            >详情</van-button
          >
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
    },
    apic: {
      type: String,
      required: true,
      default: ''
    }
  },
  emits: ['detailmain', 'prew'],
  setup() {
    const { proxy } = getCurrentInstance()
    const driverStyle2 = computed(() => {
      return {
        // borderLeft: '.2px solid var(--LightThemeColor)'
      }
    })
    const handlePrewAfter = function (item) {
      proxy.$emit('prew', item)
    }
    // 点击详情展示
    const handleDetail = function (u) {
      proxy.$emit('detailmain', u)
    }
    return {
      driverStyle2,
      handleDetail,
      handlePrewAfter
    }
  }
}
</script>

<style lang="less" scoped>
.item-w {
  font-size: 15px;
  display: flex;
  font-weight: 550;
  .item-c {
    width: 33.33%;
    .item-c-i{
      padding: 10px 0;
      display: flex;
      justify-content: center;
      align-items: center;
      line-height: 100%;
    }
  }
}
.hd-detail-w {
  text-align: center;
  img {
    width: 100px;
    height: 100px;
    border-radius: 10px;
  }
}

.detail-btn{
  height: 20px;
  text-align: center;
  // background-color: var(--LightThemeColor);
}
</style>
