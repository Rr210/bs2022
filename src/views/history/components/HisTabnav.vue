<!--
 * @Author: Harry
 * @Date: 2022-02-07 17:20:40
 * @LastEditors: harry
 * @Github: https://github.com/rr210
 * @LastEditTime: 2022-03-02 13:33:00
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
    ></HisItem>
  </div>
</template>

<script>
import { computed, getCurrentInstance, onMounted, ref } from 'vue'
import HisItem from './HisItem.vue'
import { HISTORY_GET_URL } from '@/utils/api/urlapi'
import { PEST_LIST_CATE } from '@/utils/content/cate'
export default {
  name: 'HisTabnav',
  components: { HisItem },
  setup() {
    const value1 = ref('all')
    const value2 = ref('b')
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
        console.log(jsonC)
        return jsonC
      }
    })
    const ItemLists = ref([])
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
      console.log(res)
      ItemLists.value = res.data
    }
    onMounted(() => {
      getHistoryO1()
    })

    return {
      value1,
      value2,
      option1,
      option2,
      ItemLists,
      getHistoryO1,
      handleJsonString,
      handleItemLists
    }
  }
}
</script>

<style lang="less" scoped>
.item-history-nav {
  margin-bottom: 55px;
}
</style>
