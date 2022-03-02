<!--
 * @Author: Harry
 * @Date: 2022-02-07 17:28:11
 * @LastEditors: harry
 * @Github: https://github.com/rr210
 * @LastEditTime: 2022-03-02 14:09:04
 * @FilePath: \vant-u\src\views\history\components\HisItem.vue
-->
<template>
  <van-swipe-cell :ref="`list${hisindex}Ref`">
    <div class="his-item">
      <div class="his-item-1">
        <img :src="hisbeforepic" />
      </div>
      <div class="his-item-2">
        <div class="his-item-2-1">
          <span class="h-i-2-1-s-1">{{ handletime(histime)[0] }}</span>
          <span class="h-i-2-1-s-2">{{ " / " + handletime(histime)[1] }}</span>
        </div>
        <div class="his-item-2-1">
          识别到<span>"{{ histotal }}"</span>种害虫,耗时<span>{{
            hiscount
          }}</span>
        </div>
      </div>
      <div class="his-item-3" @click="handleClick($event, hisindex)">
        <svg
          t="1646195784463"
          class="icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="2592"
        >
          <path
            d="M288 512m-64 0a64 64 0 1 0 128 0 64 64 0 1 0-128 0Z"
            fill="var(--LightThemeColor)"
            p-id="2593"
          ></path>
          <path
            d="M512 512m-64 0a64 64 0 1 0 128 0 64 64 0 1 0-128 0Z"
            p-id="2594"
            fill="var(--LightThemeColor)"
          ></path>
          <path
            d="M736 512m-64 0a64 64 0 1 0 128 0 64 64 0 1 0-128 0Z"
            p-id="2595"
            fill="var(--LightThemeColor)"
          ></path>
        </svg>
      </div>
    </div>
    <van-divider :style="driverStyle"></van-divider>
    <!-- <div class="his-item">
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
    </div> -->
    <template #right>
      <div class="right-i">
        <van-button square type="primary" text="详情" />
        <van-button square type="danger" text="删除" />
      </div>
    </template>
  </van-swipe-cell>
</template>

<script>
import { computed, ref } from '@vue/reactivity'
import { getCurrentInstance } from '@vue/runtime-core'
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
    hisindex: {
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
    // 处理时间
    const { proxy } = getCurrentInstance()
    const isDisable = ref(false)
    const handletime = computed(() => {
      return function (item) {
        return item.split(' ')
      }
    })
    const driverStyle = computed(() => {
      return {
        color: 'var(--LightThemeColor)',
        borderColor: 'var(--van-gray-3)',
        padding: '0 20px',
        margin: '5px 0'
      }
    })
    // 处理点击展示左滑事件
    const handleClick = function (event, item) {
      event.stopPropagation()
      const ref = `list${item}Ref`
      const proxyRef = proxy.$refs[ref]
      if (isDisable.value) {
        isDisable.value = false
        proxyRef.close()
        return
      }
      isDisable.value = true
      proxyRef.open('right')
    }
    return {
      driverStyle,
      handletime,
      handleClick
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
  display: flex;
  margin: 10px;
  // background-color: #ccc;
  border-radius: 10px;
  padding: 5px;
  .his-item-1 {
    flex: 1.5;
    display: flex;
    justify-content: center;
    align-items: center;
    img {
      width: 60px;
      height: 60px;
      border-radius: 8px;
    }
  }
  .his-item-2 {
    flex: 4;
    font-size: 15px;
    .his-item-2-1 {
      padding: 6px 10px;
      font-size: 12px;
      span {
        color: var(--LightThemeColor);
        font-weight: 600;
      }
      .h-i-2-1-s-1 {
        color: #ccc;
        font-weight: normal;
      }
      .h-i-2-1-s-2 {
        font-size: 13px;
        font-weight: 550;
      }
    }
  }
  .his-item-3 {
    flex: 1;
    text-align: center;
    svg {
      width: 50%;
    }
  }
}

// 左滑展示详情和删除按钮
.right-i {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  justify-content: center;
  align-items: center;
  // margin: 10px 0;
  .van-button {
    height: 30px;
  }
}
// .his-item {
//   // background-color: rgba(228, 228, 226, 0.5);
//   background-color: var(--card-history);
//   border-radius: 10px;
//   margin: 10px;
//   .his-item-i {
//     font-size: 16px;
//     padding: 5px 10px;
//     .hd-his {
//       display: flex;
//       justify-content: space-between;
//       align-items: center;
//       // text-align: center;
//       background-color: var(--van-nav-bar-o);
//       .hd-his-i {
//         // font-size: 15px;
//         // width: 33%;
//         margin: 0 10px;
//       }
//     }
//     .bo-2 {
//       display: flex;
//       justify-content: center;
//       align-items: center;
//       // text-align: center;
//       padding: 10px 0 0 0;
//       .bo-2-i {
//         width: 25%;
//       }
//     }
//   }
// }
</style>
