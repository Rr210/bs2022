<!--
 * @Description:
 * @Author: Harry
 * @Date: 2021-12-26 16:03:19
 * @Url: https://u.mr90.top
 * @github: https://github.com/rr210
 * @LastEditTime: 2022-01-07 11:11:08
 * @LastEditors: Harry
-->
<template>
  <!-- <van-skeleton title avatar :row="3" /> -->
  <!-- 轮播图位置 -->
  <transition name="van-fade">
    <van-swipe :autoplay="3000" v-if="imagesBanner.length > 0" lazy-render>
      <van-swipe-item class="van-item-pest-swiper" v-for="image in imagesBanner" :key="image.bid">
        <img :src="'banner/' + image.pic" class="banner_img" />
      </van-swipe-item>
    </van-swipe>
  </transition>
  <van-notice-bar left-icon="volume-o" color="var(--LightThemeColor)" background="var(--van-nav-bar-o)" :scrollable="false">
    <van-swipe vertical class="notice-swipe" :autoplay="3000" :show-indicators="false">
      <van-swipe-item>明月直入，无心可猜。</van-swipe-item>
      <van-swipe-item>仙人抚我顶，结发受长生。</van-swipe-item>
      <van-swipe-item>今人不见古时月，今月曾经照古人。</van-swipe-item>
    </van-swipe>
  </van-notice-bar>
  <van-tabs v-model:active="activeIndex" @click-tab="leftChangeNav">
    <van-tab v-for="item in items" :key="item.pid" :title="item.text" class="item-wrap-pest">
      <item-pest
        v-for="i in itemLists"
        :key="i.pid"
        :pic-url="'images/' + i.pest_name + '.jpg'"
        :item-text="i.pest_name"
      ></item-pest>
    </van-tab>
  </van-tabs>
</template>

<script>
import { ref } from '@vue/reactivity'
import { PEST_LIST_CATE } from '@/utils/content/cate'
import { getCurrentInstance, onMounted } from '@vue/runtime-core'
import { BANNER_URL, PEST_LIST_URL } from '@/utils/api/urlapi'
import ItemPest from '@/views/home/components/ItemPest.vue'
import debounceMerge from '@/utils/tool/debounce'
export default {
  components: { ItemPest },
  setup() {
    const { proxy } = getCurrentInstance()
    const activeIndex = ref(0)
    const imagesBanner = ref([])
    const itemLists = ref([])
    // 防抖点击
    const leftChangeNav = debounceMerge(function () { getInsectsList() }, 500, true)
    // 数据的请求
    const getInsectsList = async function () {
      const params = {
        key: PEST_LIST_CATE[activeIndex.value].path,
        pagenum: 1,
        pagesize: 9
      }
      const { data: res } = await proxy.$http.get(PEST_LIST_URL, { params })
      console.log(res)
      itemLists.value = res.data
    }
    const onClickTab = function () { }
    // 获取banner图
    const getBanner = async function () {
      const { data: res } = await proxy.$http.post(BANNER_URL)
      console.log(res)
      if (res.status_code === 1) {
        imagesBanner.value = res.banner_list.data
      }
    }
    onMounted(() => {
      getBanner()
      getInsectsList()
    })
    return {
      activeIndex,
      leftChangeNav,
      items: PEST_LIST_CATE,
      imagesBanner,
      onClickTab,
      itemLists
    }
  }
}
</script>

<style lang="less" scoped>
.banner_img {
  width: 100%;
}
.van-item-pest-swiper {
  border: 20px solid var(--pageBg);
  border-left-width: 25px;
  border-right-width: 25px;
  box-sizing: border-box;
  .banner_img {
    border-radius: 10px;
  }
}
.van-tab__panel {
  box-sizing: border-box;
  padding: 10px;
  margin-bottom: 60px;
}
.item-wrap-pest {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  flex-wrap: wrap;
}

.notice-swipe {
  height: 40px;
  line-height: 40px;
}
.van-notice-bar {
  margin: 0 8px;
}
</style>
