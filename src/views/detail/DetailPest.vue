<!--
 * @Author: Harry
 * @Date: 2022-03-29 13:29:41
 * @LastEditors: harry
 * @Github: https://github.com/rr210
 * @LastEditTime: 2022-03-29 16:34:21
 * @FilePath: \vant-u\src\views\detail\DetailPest.vue
-->
<template>
  <div class="detail-pest-wrap">
    <div class="detail-img-top">
      <div class="svg-detail" @click="backHomePage">
        <svg
          t="1648540366179"
          class="icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="6524"
        >
          <path
            d="M456.7 256.6V41.1c1.2-10.8-1.7-21.9-10-30.3-14.5-14.4-37.9-14.4-52.4 0L29.2 411.1c-7.7 7.6-11.1 17.9-10.5 27.9-0.5 10 2.8 20.1 10.5 27.9l363.1 398c13.6 11.6 38.4 18.1 54.4 2.1 8.3-8.3 11.9-15.2 10.7-26V621.7c241.2 0 459.4 173.7 502.6 402.3 29.2-67 45.5-140.9 45.5-218.6 0.1-303.1-245.6-548.8-548.8-548.8z"
            p-id="6525"
            fill="#fff"
          ></path>
        </svg>
      </div>
      <img
        :src="`images/${detailList.pest_name}.jpg`"
        @click="prewPic(`images/${detailList.pest_name}.jpg`)"
        alt=""
        srcset=""
      />
    </div>
    <div
      class="detail-con"
      :class="isactive ? 'isactive-detail' : 'active-detail'"
    >
      <span class="move-detail" @click="changeContop(0)"></span>
      <span class="detail-title">{{ detailList.pest_name }}</span>
      <div class="detail-cate-wrap" v-if="detailList.base_cate">
        <div class="d-c-i">
          <div class="d-1">害虫类别</div>
          <div class="d-2">{{ detailList.base_cate }}</div>
        </div>
        <div class="d-c-i">
          <div class="d-1">所属目</div>
          <div class="d-2">{{ detailList.cate_sk.split(",")[0] }}</div>
        </div>
        <div class="d-c-i">
          <div class="d-1">所属科</div>
          <div class="d-2">{{ detailList.cate_sk.split(",")[1] }}</div>
        </div>
      </div>
      <div>
        <van-tabs
          class="van-tabs-custom"
          v-model:active="activeIndex"
          @click-tab="leftChangeNav"
        >
          <van-tab
            v-for="item in tabLists"
            :key="item.pid"
            :name="item.value"
            :title="item.text"
          >
            <p class="detailcon">
              {{ detailCont }}
            </p>
          </van-tab>
        </van-tabs>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, reactive, toRefs } from '@vue/runtime-core'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { ImagePreview, Toast } from 'vant'
import { DETAIL_PEST } from '@/utils/content/cate.js'
export default {
  name: 'DetailPest',
  setup() {
    const router = useRouter()
    const store = useStore()
    const state = reactive({
      detailList: {},
      tabLists: DETAIL_PEST,
      activeIndex: 'harm_feat',
      detailCont: '',
      isactive: false
    })
    // 返回上一页
    const backHomePage = function () {
      router.go(-1)
    }
    // 获取当前界面的数据
    const getCurrentDetail = function () {
      const { pestname } = router.currentRoute.value.params
      console.log(pestname)
      const list = store.state.home.detailPestList
      console.log(list)
      if (list.length > 0) {
        state.detailList = list[pestname]
        getContent()
      } else {
        Toast('无详情数据')
        backHomePage()
      }
    }
    const getContent = function () {
      changeContop(1)
      const name = state.activeIndex
      state.detailCont = state.detailList[name]
    }
    // 预览图片
    const prewPic = function (pic) {
      ImagePreview({
        images: [pic],
        startPosition: 1
      })
    }
    // 改变当前页面的内容位置
    const changeContop = function (nums) {
      if (nums === 0) {
        state.isactive = !state.isactive
      } else {
        if (!state.isactive) {
          console.log('object')
          state.isactive = true
        }
      }
    }
    const leftChangeNav = function (e) {
      getContent()
    }
    onMounted(() => {
      getCurrentDetail()
    })
    return {
      leftChangeNav,
      backHomePage,
      changeContop,
      prewPic,
      ...toRefs(state)
    }
  }
}
</script>

<style lang="less" scoped>
.detail-pest-wrap {
  width: 100%;
  position: relative;
  font-size: 16px;
  animation: fadeIn 0.6s linear;
}
.detail-img-top {
  position: relative;
  .svg-detail {
    position: absolute;
    width: 30px;
    height: 30px;
    top: 20px;
    left: 20px;
  }
  img {
    width: 100%;
    height: 260px;
  }
}
.detail-con {
  position: absolute;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  right: 0;
  width: 100%;
  background-color: #fff;
  // height: 100vh;
  padding: 30px;
  .move-detail {
    position: absolute;
    width: 60px;
    height: 8px;
    background-color: rgb(210, 214, 220);
    border-radius: 5px;
    top: 10px;
    left: calc(50% - 30px);
  }
}
.isactive-detail {
  top: 100px;
  transition: top 1s;
}
.active-detail {
  top: 240px;
  transition: top 1s;
}
.detail-title {
  font-size: 30px;
  font-weight: 600;
}
.detail-cate-wrap {
  display: flex;
  align-items: center;
  margin: 18px 0;
  .d-c-i {
    flex: 1;
    text-align: center;
    &:nth-child(1) {
      text-align: left;
    }
    &:nth-child(2) {
      border-left: 2px solid rgb(234, 236, 242);
      border-right: 2px solid rgb(234, 236, 242);
    }
  }
}
.d-1 {
  font-weight: 550;
  padding: 5px 0;
}
.d-2 {
  padding: 5px 0;
  font-size: 15px;
}

.detailcon {
  margin: 10px 0;
  // text-indent: 32px;
  line-height: 30px;
}
</style>
