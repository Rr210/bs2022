<!--
 * @Author: Harry
 * @Date: 2022-02-07 17:20:40
 * @LastEditors: harry
 * @Github: https://github.com/rr210
 * @LastEditTime: 2022-03-29 13:25:22
 * @FilePath: \vant-u\src\views\history\components\HisTabnav.vue
-->
<template>
  <van-dropdown-menu>
    <van-dropdown-item
      v-model="value1"
      :options="option1"
      @change="getHistoryO1"
    />
    <van-dropdown-item
      v-model="value2"
      :options="option2"
      @change="getHistoryO1"
    />
  </van-dropdown-menu>
  <div class="item-history-nav" v-if="ItemLists.length > 0">
    <!-- 历史记录列表 -->
    <HisItem
      v-for="(item, index) in ItemLists"
      :key="index"
      :hisbeforepic="handleItemLists(item.dis_before)"
      :hisafterpic="handleItemLists(item.dis_after)"
      :hisitempest="handleJsonString(item.result).res"
      :histime="item.create_time"
      :histotal="handleJsonString(item.result).res_total"
      :hiscount="handleJsonString(item.result).time_count"
      :hisindex="index"
      :hispid="item.pid"
      @prew="prewOne"
      @deletepid="deleteHisRecord"
      @detailpid="detailHisRecord"
    ></HisItem>
  </div>
  <div class="his_empty" v-else>
    <img src="/css/svg/his_empty.svg" alt="" />
    <div class="span_s">您还未识别，暂无记录</div>
  </div>
  <!-- 展示详情数据 -->
  <van-popup v-model:show="isshowpest" class="vanpopCard">
    <detail-pest
      :resPic="picindex"
      @prew="prewOne"
      :apic="disAfterpic"
      @detailmain="getResultPest"
    >
    </detail-pest>
  </van-popup>
  <!-- 展示结果数据 -->
  <van-popup v-model:show="pestkey" class="vanpopCard">
    <show-pest
      :picurlbg="'images/' + pici.pest_name + '.jpg'"
      :pestname="pici.pest_name"
      :catesk="pici.cate_sk"
      :basecate="pici.base_cate"
      :harmhost="pici.harm_host"
      :harmfeat="pici.harm_feat"
      :controlmeasures="pici.control_measures"
    ></show-pest>
  </van-popup>
</template>

<script>
import {
  computed,
  onMounted,
  provide,
  reactive,
  ref,
  toRefs,
  defineAsyncComponent,
  watch
  // watch
} from 'vue'
import { HISTORY_GET_URL, SEARCH_PEST_URL } from '@/utils/api/urlapi'
import { PEST_LIST_CATE } from '@/utils/content/cate'
import { ImagePreview, Dialog, Toast } from 'vant'
import { searchPest, deleteHistory, historyGet } from '@/utils/service/history'
import { useStore } from 'vuex'
const DetailPest = defineAsyncComponent(() => import('./DetailPest.vue'))
const HisItem = defineAsyncComponent(() => import('./HisItem.vue'))
const ShowPest = defineAsyncComponent(() =>
  import('@/components/ShowPest.vue')
)

export default {
  name: 'HisTabnav',
  components: { HisItem, DetailPest, ShowPest },
  setup() {
    const store = useStore()
    const stateTemp = reactive({
      value1: 'all',
      value2: 'b',
      picindex: {},
      pici: {},
      pestkey: false,
      isshowpest: false,
      disAfterpic: '',
      option1: PEST_LIST_CATE,
      option2: [
        { text: '时间降序', value: 'b' },
        { text: '时间升序', value: 'a' }
      ]
    })
    const handleMark = (data) => {
      if (data === 11) {
        stateTemp.pestkey = false
      }
    }
    provide('awaitSon', handleMark)
    // 处理json字符串
    const handleJsonString = computed(() => {
      return function (item) {
        const jsonC = JSON.parse(item)
        // console.log(jsonC)
        return jsonC
      }
    })
    // const picList = ref([])
    // 图片预览问题
    const prewOne = function (e) {
      if (e) {
        ImagePreview({
          images: [e]
        })
      }
    }
    // 处理识别详情的结果
    const getResultPest = async function (e) {
      console.log(e)
      const { data: res } = await searchPest(SEARCH_PEST_URL, {
        params: {
          key: e
        }
      })
      console.log(res)
      if (res.status_code === 1 && res.data.length > 0) {
        stateTemp.pici = res.data[0]
        stateTemp.pestkey = true
      } else {
        Toast({
          message: '未找到害虫数据'
        })
      }
    }
    // 删除某项历史记录
    const deleteHisRecord = function (temp) {
      Dialog.confirm({
        title: '提示',
        message: '确定删除该记录，删除后将无法恢复'
      })
        .then(() => {
          console.log(temp)
          httpDeleteHistory(temp)
          // on confirm
        })
        .catch(() => {
          // on cancel
        })
    }
    // 请求删除的方法
    const httpDeleteHistory = async function (p) {
      const u = JSON.parse(localStorage.getItem('userinfo'))
      if (u) {
        const { data: res } = await deleteHistory(HISTORY_GET_URL, {
          data: {
            temp: p,
            openid: u.openid
          }
        })
        if (res.status_code === 1) {
          getHistoryO1()
        }
        console.log(res)
      }
    }
    // 详情查看记录
    const ItemLists = ref([])
    const detailHisRecord = function (index) {
      stateTemp.isshowpest = !stateTemp.isshowpest
      stateTemp.picindex = JSON.parse(ItemLists.value[index].result)
      stateTemp.disAfterpic =
        process.env.VUE_APP_URL + '/' + ItemLists.value[index].dis_after
    }
    watch(ItemLists, (newValue, old) => {
      store.dispatch('history/DotNumber', newValue.length)
    })
    // 图片的预览问题
    // 处理图片的问题
    const handleItemLists = function (item) {
      return process.env.VUE_APP_URL + '/' + item
    }
    const getHistoryO1 = async function () {
      const data1 = JSON.parse(localStorage.getItem('userinfo'))
      if (data1) {
        const { data: res } = await historyGet(HISTORY_GET_URL, {
          data: data1.openid,
          key: stateTemp.value1,
          option2: stateTemp.value2
        })
        // console.log(res)
        ItemLists.value = res.data
      }
    }
    onMounted(() => {
      getHistoryO1()
    })

    return {
      ItemLists,
      handleJsonString,
      // countDot,
      getResultPest,
      // showItemPest,
      detailHisRecord,
      getHistoryO1,
      prewOne,
      deleteHisRecord,
      handleItemLists,
      ...toRefs(stateTemp)
    }
  }
}
</script>

<style lang="less" scoped>
.item-history-nav {
  margin-bottom: 55px;
}

.his_empty {
  padding-top: 50px;
  text-align: center;
  img {
    width: 70%;
  }
  .span_s {
    color: var(--LightThemeColor);
    font-size: 12px;
  }
}
.van-overlay {
  z-index: 2;
}
</style>
