<!--
 * @Description:
 * @Author: Harry
 * @Date: 2021-12-26 16:03:19
 * @Url: https://u.mr90.top
 * @github: https://github.com/rr210
 * @LastEditTime: 2022-03-05 15:03:07
 * @LastEditors: harry
-->
<template>
  <!-- <van-skeleton title avatar :row="3" /> -->
  <!-- 轮播图位置 -->
  <transition name="van-fade">
    <van-swipe :autoplay="3000" v-if="imagesBanner.length > 0" lazy-render>
      <van-swipe-item
        class="van-item-pest-swiper"
        v-for="image in imagesBanner"
        :key="image.bid"
      >
        <img :src="'banner/' + image.pic" class="banner_img" />
      </van-swipe-item>
    </van-swipe>
  </transition>
  <van-tabs class="van-tabs-custom" v-model:active="activeIndex" @click-tab="leftChangeNav">
    <van-tab v-for="item in items" :key="item.pid" :title="item.text">
      <van-pull-refresh
        v-model="isLoading"
        :head-height="80"
        @refresh="onRefresh"
      >
        <!-- 下拉提示，通过 scale 实现一个缩放效果 -->
        <template #pulling="props">
          <img
            class="doge"
            src="https://img.yzcdn.cn/vant/doge.png"
            :style="{ transform: `scale(${props.distance / 80})` }"
          />
        </template>

        <!-- 释放提示 -->
        <template #loosing>
          <img class="doge" src="https://img.yzcdn.cn/vant/doge.png" />
        </template>

        <!-- 加载提示 -->
        <template #loading>
          <img class="doge" src="https://img.yzcdn.cn/vant/doge-fire.jpg" />
        </template>
        <div
          class="item-wrap-pest"
          @touchstart="onSwiperStart"
          @touchend="onSwiperEnd"
        >
          <item-pest
            v-for="(i, index) in itemLists"
            :key="i.pid"
            :pic-url="'images/' + i.pest_name + '.jpg'"
            :item-text="i.pest_name"
            :cate-pest="i.base_cate"
            @click="showItemPest(index)"
          ></item-pest>
        </div>
        <van-pagination
          v-model="pagenum"
          :total-items="total"
          @change="changePage"
          :show-page-size="5"
          :items-per-page="pagesize"
          force-ellipses
        >
          <template #prev-text>
            <van-icon name="arrow-left" />
          </template>
          <template #next-text>
            <van-icon name="arrow" />
          </template>
          <template #page="{ text }">{{ text }}</template>
        </van-pagination>
      </van-pull-refresh>
    </van-tab>
  </van-tabs>
  <van-popup v-model:show="isshowpest" class="vanpopCard">
    <show-pest
      :picurlbg="'images/' + picindex.pest_name + '.jpg'"
      :pestname="picindex.pest_name"
      :catesk="picindex.cate_sk"
      :basecate="picindex.base_cate"
      :harmhost="picindex.harm_host"
      :harmfeat="picindex.harm_feat"
      :controlmeasures="picindex.control_measures"
    ></show-pest>
  </van-popup>
</template>

<script>
import { reactive, ref, toRefs } from '@vue/reactivity'
import { PEST_LIST_CATE } from '@/utils/content/cate'
import { getCurrentInstance, onMounted } from '@vue/runtime-core'
import { BANNER_URL, PEST_LIST_URL } from '@/utils/api/urlapi'
import ItemPest from '@/views/home/components/ItemPest.vue'
import ShowPest from '@/components/ShowPest.vue'
import debounceMerge from '@/utils/tool/debounce'
export default {
  components: { ItemPest, ShowPest },
  setup() {
    const { proxy } = getCurrentInstance()
    const picindex = ref({})
    const activeIndex = ref(0)
    const imagesBanner = ref([])
    const itemLists = ref([])
    const isLoading = ref(false)
    const isshowpest = ref(false)
    const TouchDistance = reactive({
      StartX: 0,
      EndX: 0
    })
    const onSwiperStart = function (e) {
      TouchDistance.StartX = e.changedTouches[0].screenX
    }
    const onSwiperEnd = function (e) {
      TouchDistance.EndX = e.changedTouches[0].screenX
      const difference = TouchDistance.StartX - TouchDistance.EndX
      const pageLimit = itemListParams.total / itemListParams.pagesize
      console.log(difference)
      if (difference > 80) {
        itemListParams.pagenum++
      } else if (difference < -80) {
        itemListParams.pagenum--
      } else {
        return
      }
      if (itemListParams.pagenum > pageLimit || itemListParams.pagenum === 0) { return }
      getInsectsList()
    }
    const itemListParams = reactive({
      pagenum: 1,
      pagesize: 6,
      total: 0
    })
    // 防抖点击
    const leftChangeNav = debounceMerge(
      function () {
        itemListParams.pagenum = 1
        getInsectsList()
      },
      500,
      true
    )
    // 数据的请求
    const getInsectsList = async function () {
      const params = {
        key: PEST_LIST_CATE[activeIndex.value].path,
        pagenum: itemListParams.pagenum,
        pagesize: itemListParams.pagesize
      }
      const { data: res } = await proxy.$http.get(PEST_LIST_URL, { params })
      console.log(res)
      if (res.status_code === 1) {
        itemLists.value = res.data
        isLoading.value = false
        itemListParams.total = res.total
      }
    }
    const showItemPest = function (index) {
      isshowpest.value = !isshowpest.value
      picindex.value = itemLists.value[index]
    }
    const changePage = function () {
      getInsectsList()
    }
    const onClickTab = function () {}
    // 获取banner图
    const getBanner = async function () {
      const { data: res } = await proxy.$http.post(BANNER_URL)
      console.log(res)
      if (res.status_code === 1) {
        imagesBanner.value = res.banner_list.data
      }
    }
    // 当tag刷新的时候调用的事件
    const onRefresh = debounceMerge(
      function () {
        getInsectsList()
      },
      500,
      true
    )
    onMounted(() => {
      getBanner()
      getInsectsList()
    })
    return {
      activeIndex,
      leftChangeNav,
      onSwiperStart,
      items: PEST_LIST_CATE,
      imagesBanner,
      onClickTab,
      itemLists,
      isLoading,
      onSwiperEnd,
      onRefresh,
      TouchDistance,
      showItemPest,
      changePage,
      isshowpest,
      itemListParams,
      picindex,
      ...toRefs(itemListParams)
    }
  }
}
</script>

<style lang="less" scoped>
.doge {
  width: 140px;
  height: 72px;
  margin-top: 8px;
  border-radius: 4px;
}

.van-pagination {
  margin: 5px 0;
}

.banner_img {
  width: 100%;
  height: 170px;
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
  margin-bottom: 20px;
}

.notice-swipe {
  height: 40px;
  line-height: 40px;
}
.van-notice-bar {
  margin: 0 8px;
}

.van-overlay {
  z-index: 2;
}
</style>
