<!--
 * @Description:
 * @Author: Harry
 * @Date: 2021-12-26 16:03:19
 * @Url: https://u.mr90.top
 * @github: https://github.com/rr210
 * @LastEditTime: 2022-01-05 20:54:45
 * @LastEditors: Harry
-->
<template>
  <!-- <van-skeleton title avatar :row="3" /> -->
  <!-- 轮播图位置 -->
  <van-swipe :autoplay="3000" v-if="imagesBanner.length > 0" lazy-render>
    <van-swipe-item v-for="image in imagesBanner" :key="image.bid">
      <img :src="'banner/' + image.pic" class="banner_img" />
    </van-swipe-item>
  </van-swipe>
  <van-tabs v-model:active="activeIndex" @click-tab="leftChangeNav">
    <van-tab v-for="item in items" :key="item.pid" :title="item.text">{{item}}</van-tab>
  </van-tabs>
</template>

<script>
import { ref } from '@vue/reactivity'
import { PEST_LIST_CATE } from '../../utils/content/cate'
import { getCurrentInstance, onMounted } from '@vue/runtime-core'
import { BANNER_URL, PEST_LIST_URL } from '../../utils/api/urlapi'
export default {
  setup() {
    const { proxy } = getCurrentInstance()
    const activeIndex = ref(0)
    const imagesBanner = ref([])
    const leftChangeNav = function (e) {
      getInsectsList(e)
    }
    // 数据的请求
    const getInsectsList = async function () {
      const params = {
        key: PEST_LIST_CATE[activeIndex.value].path,
        pagenum: 1,
        pagesize: 10
      }
      const { data: res } = await proxy.$http.get(PEST_LIST_URL, { params })
      console.log(res)
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
    })
    return {
      activeIndex,
      leftChangeNav,
      items: PEST_LIST_CATE,
      imagesBanner,
      onClickTab
    }
  }
}
</script>

<style lang="less" scoped>
.banner_img {
  width: 100%;
}
.van-swipe-item {
  border: 20px solid var(--pageBg);
  border-left-width: 25px;
  border-right-width: 25px;
  box-sizing: border-box;
  .banner_img {
    border-radius: 10px;
  }
}
</style>
