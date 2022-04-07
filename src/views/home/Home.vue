<!--
 * @Description:
 * @Author: Harry
 * @Date: 2021-12-26 16:03:19
 * @Url: https://u.mr90.top
 * @github: https://github.com/rr210
 * @LastEditTime: 2022-04-03 13:10:48
 * @LastEditors: harry
-->
<template>
  <!-- 轮播图位置 -->
  <transition name="van-fade">
    <van-swipe :autoplay="3000" v-if="imagesBanner.length > 0" lazy-render>
      <van-swipe-item class="van-item-pest-swiper" v-for="image in imagesBanner" :key="image.bid">
        <img :src="bannerPic + image.pic" class="banner_img" />
      </van-swipe-item>
    </van-swipe>
  </transition>
  <van-tabs class="van-tabs-custom" v-model:active="activeIndex" @click-tab="leftChangeNav">
    <van-tab v-for="item in items" :key="item.pid" :title="item.text">
      <van-pull-refresh v-model="isLoading" :head-height="80" @refresh="onRefresh">
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
        <div class="item-wrap-pest" @touchstart="onSwiperStart" @touchend="onSwiperEnd">
          <item-pest
            v-for="(i, index) in itemLists"
            :key="i.pid"
            :pic-url="'images/' + i.pest_name + '.jpg'"
            :item-text="i.pest_name"
            :cate-pest="i.base_cate"
            :index="index"
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
  <!-- <van-popup v-model:show="isshowpest" class="vanpopCard">
    <show-pest
      :picurlbg="'images/' + picindex.pest_name + '.jpg'"
      :pestname="picindex.pest_name"
      :catesk="picindex.cate_sk"
      :basecate="picindex.base_cate"
      :harmhost="picindex.harm_host"
      :harmfeat="picindex.harm_feat"
      :controlmeasures="picindex.control_measures"
    ></show-pest>
  </van-popup>-->
</template>

<script>
import { reactive, toRefs } from '@vue/reactivity'
import { PEST_LIST_CATE } from '@/utils/content/cate'
import { onMounted, computed } from '@vue/runtime-core'
import { BANNER_URL, PEST_LIST_URL } from '@/utils/api/urlapi'
import debounceMerge from '@/utils/tool/debounce'
import { provide, defineAsyncComponent } from 'vue' // 引入provide
import { pestList, bannerList } from '@/utils/service/home'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
const ItemPest = defineAsyncComponent(() =>
  import('@/views/home/components/ItemPest.vue')
)

export default {
  components: { ItemPest },
  setup() {
    const router = useRouter()
    const store = useStore()
    const stateTemp = reactive({
      picindex: {}, // 以前展示的showpest组件需要的内容
      activeIndex: 0, // tab索引值
      imagesBanner: [], // banner图
      itemLists: [], // 每一个害虫类别的组件
      isLoading: false, // 下拉刷新
      isshowpest: false, // 是否展示组件
      items: PEST_LIST_CATE // tab栏文字介绍
    })
    const TouchDistance = reactive({
      StartX: 0, // 移动端触碰开始
      EndX: 0 // 移动端触碰结束
    })
    const itemListParams = reactive({
      pagenum: 1, // 表示当前页面
      pagesize: 6, // 表示的一页数量
      total: 0 // 表示总数  用于分页
    })
    // 爷孙组件
    const handleMark = (data) => {
      if (data === 11) {
        stateTemp.isshowpest = false
      }
    }
    provide('awaitSon', handleMark)
    const onSwiperStart = function (e) {
      TouchDistance.StartX = e.changedTouches[0].screenX
    }
    const bannerPic = computed(() => {
      return process.env.VUE_APP_URL + '/banner/'
    })
    const onSwiperEnd = function (e) {
      TouchDistance.EndX = e.changedTouches[0].screenX
      const difference = TouchDistance.StartX - TouchDistance.EndX
      const pageLimit = Math.ceil(
        itemListParams.total / itemListParams.pagesize
      )
      console.log(difference)
      if (difference > 80) {
        itemListParams.pagenum++
      } else if (difference < -80) {
        itemListParams.pagenum--
      } else {
        return
      }
      if (itemListParams.pagenum > pageLimit || itemListParams.pagenum === 0) {
        return
      }
      getInsectsList()
    }
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
        key: PEST_LIST_CATE[stateTemp.activeIndex].path,
        pagenum: itemListParams.pagenum,
        pagesize: itemListParams.pagesize
      }
      const { data: res } = await pestList(PEST_LIST_URL, { params })
      console.log(res)
      if (res.status_code === 1) {
        stateTemp.itemLists = res.data
        stateTemp.isLoading = false
        itemListParams.total = res.total
        saveDetailVuex(res.data)
      }
    }
    const showItemPest = function (index) {
      router.push({
        name: 'detail',
        params: {
          pestname: index
        }
      })
      // stateTemp.isshowpest = !stateTemp.isshowpest
      // stateTemp.picindex = stateTemp.itemLists[index]
    }
    // 将获取的数据保存的vuex状态管理中
    const saveDetailVuex = function (data) {
      if (data.length > 0) {
        store.dispatch('home/changeDetailPest', data)
      }
    }
    const changePage = function () {
      getInsectsList()
    }
    const onClickTab = function () { }
    // 获取banner图
    const getBanner = async function () {
      const { data: res } = await bannerList(BANNER_URL)
      console.log(res)
      if (res.status_code === 1) {
        stateTemp.imagesBanner = res.banner_list.data
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
      leftChangeNav,
      onSwiperStart,
      onClickTab,
      bannerPic,
      onSwiperEnd,
      onRefresh,
      TouchDistance,
      showItemPest,
      changePage,
      itemListParams,
      ...toRefs(itemListParams),
      ...toRefs(stateTemp)
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
