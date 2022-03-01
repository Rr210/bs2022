<!--
 * @Author: Harry
 * @Date: 2022-02-07 17:28:11
 * @LastEditors: harry
 * @Github: https://github.com/rr210
 * @LastEditTime: 2022-03-01 15:30:41
 * @FilePath: \vant-u\src\views\history\components\HisItem.vue
-->
<template>
  <van-swipe-cell>
    <div class="his-item">
      <div class="his-item-i">
        <div class="hd-his">
          <van-tag
            color="var(--van-nav-bar-o)"
            text-color="var(--LightThemeColor)"
            class="hd-his-i"
          >
            {{ histime }}
          </van-tag>
          <van-tag
            color="var(--van-nav-bar-o)"
            text-color="var(--LightThemeColor)"
            class="hd-his-i"
          >
            {{ histotal + "种" }}
          </van-tag>
          <van-tag
            color="var(--van-nav-bar-o)"
            text-color="var(--LightThemeColor)"
            class="hd-his-i"
          >
            {{ hiscount }}
          </van-tag>
        </div>
        <div class="history-after">
          <img :src="hisbeforepic" />
          <img :src="hisafterpic" />
        </div>
        <van-divider dashed :style="driverStyle" content-position="left">识别详情</van-divider>
        <div v-for="(item, index) in hisitempest" :key="index" class="bo-2">
          <van-tag
            color="var(--van-nav-bar-o)"
            text-color="var(--LightThemeColor)"
            class="bo-2-i"
          >
            {{ item["cate-cz"]["zh-name"] }}
          </van-tag>
          <van-tag
            color="var(--van-nav-bar-o)"
            text-color="var(--LightThemeColor)"
            class="bo-2-i"
          >
            {{ item["cate-cz"]["cate"] }}
          </van-tag>
          <van-tag
            color="var(--van-nav-bar-o)"
            text-color="var(--LightThemeColor)"
            class="bo-2-i"
          >
            {{ item["nums"] + "只" }}
          </van-tag>
          <van-tag
            color="var(--van-nav-bar-o)"
            text-color="var(--LightThemeColor)"
            class="bo-2-i"
          >
            {{ item["max_rate"] }}
          </van-tag>
        </div>
      </div>
    </div>
    <template #right>
      <van-button square type="danger" text="删除" />
    </template>
  </van-swipe-cell>
</template>

<script>
import { computed } from '@vue/reactivity'
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
    },
    hisitempest: {
      type: Array,
      required: true,
      default: function () {
        return []
      }
    },
    histime: {
      type: String,
      required: true,
      default: ''
    },
    histotal: {
      type: Number,
      required: true,
      default: 0
    },
    hiscount: {
      type: String,
      required: true,
      default: ''
    }
  },
  setup() {
    const driverStyle = computed(() => {
      return {
        color: 'var(--LightThemeColor)',
        borderColor: 'var(--LightThemeColor)',
        padding: '0 16px',
        margin: '5px 0'
      }
    })
    return {
      driverStyle
    }
  }
}
</script>
<style lang="less" scoped>
.history-after {
  display: flex;
  justify-content: space-evenly;
  img {
    width: 40%;
    margin: 10px 0;
    border-radius: 10px;
    height: 100px;
  }
}

.his-item {
  // background-color: rgba(228, 228, 226, 0.5);
  background-color: var(--card-history);
  border-radius: 10px;
  margin: 10px;
  .his-item-i {
    font-size: 16px;
    padding: 5px 10px;
    .hd-his {
      display: flex;
      justify-content: space-between;
      align-items: center;
      // text-align: center;
      background-color: var(--van-nav-bar-o);
      .hd-his-i {
        // font-size: 15px;
        // width: 33%;
        margin: 0 10px;
      }
    }
    .bo-2 {
      display: flex;
      justify-content: center;
      align-items: center;
      // text-align: center;
      padding: 10px 0 0 0;
      .bo-2-i {
        width: 25%;
      }
    }
  }
}
</style>
