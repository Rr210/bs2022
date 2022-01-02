<!--
 * @Description:
 * @Author: Harry
 * @Date: 2021-12-26 16:03:19
 * @Url: https://u.mr90.top
 * @github: https://github.com/rr210
 * @LastEditTime: 2022-01-02 11:19:14
 * @LastEditors: Harry
-->
<template>
  <!-- <van-skeleton title avatar :row="3" /> -->
  <van-tree-select
    v-model:main-active-index="activeIndex"
    height="55vw"
    :items="items"
    @click-nav="leftChangeNav"
  >
    <template #content>
      <van-image v-if="activeIndex === 0" src="https://img.yzcdn.cn/vant/apple-1.jpg" />
      <van-image v-if="activeIndex === 1" src="https://img.yzcdn.cn/vant/apple-2.jpg" />
    </template>
  </van-tree-select>
</template>

<script>
import { ref } from '@vue/reactivity'
import { PEST_LIST_CATE } from '../../utils/content/cate'
import { getCurrentInstance } from '@vue/runtime-core'
import { PEST_LIST_URL } from '../../utils/api/urlapi'
export default {
  setup() {
    const { proxy } = getCurrentInstance()
    const activeIndex = ref(0)
    const leftChangeNav = function (e) {
      getInsectsList(e)
    }
    // 数据的请求
    const getInsectsList = async function (index) {
      const params = {
        key: PEST_LIST_CATE[index].path,
        pagenum: 1,
        pagesize: 10
      }
      const { data: res } = await proxy.$http.get(PEST_LIST_URL, { params })
      console.log(res)
    }
    return {
      activeIndex,
      leftChangeNav,
      items: PEST_LIST_CATE
    }
  }
}
</script>

<style lang="less" scoped>
</style>
