<!--
 * @Author: Harry
 * @Date: 2022-02-07 17:20:40
 * @LastEditors: harry
 * @Github: https://github.com/rr210
 * @LastEditTime: 2022-03-04 16:23:32
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
  <div class="item-history-nav">
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
import { computed, getCurrentInstance, onMounted, ref } from 'vue'
import HisItem from './HisItem.vue'
import { HISTORY_GET_URL, SEARCH_PEST_URL } from '@/utils/api/urlapi'
import { PEST_LIST_CATE } from '@/utils/content/cate'
import { ImagePreview, Dialog, Toast } from 'vant'
import DetailPest from './DetailPest.vue'
import ShowPest from '@/components/ShowPest.vue'

export default {
  name: 'HisTabnav',
  components: { HisItem, DetailPest, ShowPest },
  setup() {
    const value1 = ref('all')
    const value2 = ref('b')
    const picindex = ref({})
    const pici = ref({})
    const pestkey = ref(false)
    const isshowpest = ref(false)
    const disAfterpic = ref('')
    const { proxy } = getCurrentInstance()
    const option1 = PEST_LIST_CATE
    const option2 = [
      { text: '时间降序', value: 'b' },
      { text: '时间升序', value: 'a' }
    ]
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
      const { data: res } = await proxy.$http.get(SEARCH_PEST_URL, {
        params: {
          key: e
        }
      })
      console.log(res)
      if (res.status_code === 1 && res.data.length > 0) {
        pici.value = res.data[0]
        pestkey.value = true
      } else {
        Toast({
          message: '未找到害虫数据'
        })
      }
    }
    // 删除某项历史记录
    const deleteHisRecord = function (pid) {
      Dialog.confirm({
        title: '提示',
        message: '确定删除该记录，删除后将无法恢复'
      })
        .then(() => {
          httpDeleteHistory(pid)
          // on confirm
        })
        .catch(() => {
          // on cancel
        })
    }
    // 请求删除的方法
    const httpDeleteHistory = async function (p) {
      const u = JSON.parse(localStorage.getItem('userinfo'))
      const { data: res } = await proxy.$http.delete(HISTORY_GET_URL, {
        data: {
          pid: p,
          openid: u.openid
        }
      })
      if (res.status_code === 1) {
        getHistoryO1()
      }
      console.log(res)
    }
    // 展示详情操作
    // const showItemPest = function (index) {
    //   isshowpest.value = !isshowpest.value
    //   // picindex.value = itemLists.value[index]
    // }
    // 详情查看记录
    const ItemLists = ref([])
    const detailHisRecord = function (index) {
      isshowpest.value = !isshowpest.value
      picindex.value = JSON.parse(ItemLists.value[index].result)
      disAfterpic.value =
        process.env.VUE_APP_URL + '/' + ItemLists.value[index].dis_after
    }
    // 图片的预览问题
    // 处理图片的问题
    const handleItemLists = function (item) {
      return process.env.VUE_APP_URL + '/' + item
    }
    const getHistoryO1 = async function () {
      const data1 = JSON.parse(localStorage.getItem('userinfo'))
      const { data: res } = await proxy.$http.post(HISTORY_GET_URL, {
        data: data1.openid,
        key: value1.value,
        option2: value2.value
      })
      // console.log(res)
      ItemLists.value = res.data
    }
    onMounted(() => {
      getHistoryO1()
    })

    return {
      value1,
      value2,
      option1,
      pestkey,
      option2,
      ItemLists,
      disAfterpic,
      picindex,
      pici,
      isshowpest,
      handleJsonString,
      getResultPest,
      // showItemPest,
      detailHisRecord,
      getHistoryO1,
      prewOne,
      deleteHisRecord,
      handleItemLists
    }
  }
}
</script>

<style lang="less" scoped>
.item-history-nav {
  margin-bottom: 55px;
}

.van-overlay {
  z-index: 2;
}
</style>
