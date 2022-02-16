<!--
 * @Author: Harry
 * @Date: 2022-02-07 17:20:40
 * @LastEditors: harry
 * @Github: https://github.com/rr210
 * @LastEditTime: 2022-02-16 15:47:27
 * @FilePath: \vant-u\src\views\history\components\HisTabnav.vue
-->
<template>
  <van-dropdown-menu>
    <van-dropdown-item v-model="value1" :options="option1" />
    <van-dropdown-item v-model="value2" :options="option2" />
  </van-dropdown-menu>
  <div class="item-history-nav">
    <HisItem
      v-for="(item, index) in ItemLists"
      :key="index"
      :hisbeforepic="handleItemLists(item.dis_before)"
      :hisafterpic="handleItemLists(item.dis_after)"
    ></HisItem>
  </div>
</template>

<script>
import { getCurrentInstance, onMounted, ref } from 'vue'
import HisItem from './HisItem.vue'
import { HISTORY_GET_URL } from '@/utils/api/urlapi'
export default {
  name: 'HisTabnav',
  components: { HisItem },
  setup() {
    const value1 = ref(0)
    const value2 = ref('a')
    const { proxy } = getCurrentInstance()
    const option1 = [
      { text: '全部商品', value: 0 },
      { text: '新款商品', value: 1 },
      { text: '活动商品', value: 2 }
    ]
    const option2 = [
      { text: '默认排序', value: 'a' },
      { text: '好评排序', value: 'b' },
      { text: '销量排序', value: 'c' }
    ]
    const ItemLists = ref([])
    // 处理图片的问题
    const handleItemLists = function (item) {
      return process.env.VUE_APP_URL + '/' + item
    }
    const getHistoryList = async function (openid) {
      const { data: res } = await proxy.$http.post(HISTORY_GET_URL, {
        data: openid
      })
      console.log(res)
      ItemLists.value = res.data
    }
    onMounted(() => {
      const data = JSON.parse(localStorage.getItem('userinfo'))
      if (data) {
        getHistoryList(data.openid)
      }
    })

    return {
      value1,
      value2,
      option1,
      option2,
      ItemLists,
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
