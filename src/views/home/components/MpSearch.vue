<!--
 * @Author: Harry
 * @Date: 2022-05-11 19:20:53
 * @LastEditors: harry
 * @Github: https://github.com/rr210
 * @LastEditTime: 2022-05-11 20:43:13
 * @FilePath: \vant-u\src\views\home\components\MpSearch.vue
-->
<template>
  <div class="search-mp">
    <van-search v-model="searchvalue" @blur="onblur" @click-input="handleClickInput" placeholder="请输入搜索关键词(中草药名或害虫名称)"
      @update:model-value="inputSearchChange" />
    <div class="mask-search">
      <div v-if="searchRes.length > 0">
        <div class="item-sres" v-for="(item, index) in searchRes" :key="item.pid" @click="tzPage(index)">
          {{ item.pest_name }}<span style="font-size: 10px;">({{ item.harm_host }})</span>
        </div>
        <div class="bottom-res">共搜索到<span style="color:red">{{ searchRes.length }}</span>种</div>
      </div>
      <!-- <div class="empty-search" v-else>
        <search-svg />
        <div class="word-s">搜索结果为空！！！</div>
      </div> -->
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import debounceMerge from '@/utils/tool/debounce'
import { searchMp } from '@/utils/service/home'
import { MPSEARCH } from '@/utils/api/urlapi'
// import SearchSvg from '@/views/home/components/SearchSvg.vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
export default {
  name: 'MpSearch',
  // components: { SearchSvg },
  setup() {
    const router = useRouter()
    const store = useStore()
    const searchvalue = ref('')
    const searchRes = ref([])
    const isMask = ref(false)
    // 当搜索框内的内容发生变化时执行
    const inputSearchChange = debounceMerge(async function () {
      if (searchvalue.value.trim().length > 0) {
        const { data: res } = await searchMp(MPSEARCH, { params: { key: searchvalue.value } })
        console.log(res)
        if (res.status_code === 1) {
          searchRes.value = res.data
          isMask.value = true
          saveDetailVuex(res.data)
        } else {
          searchRes.value = []
          isMask.value = false
        }
      } else {
        searchRes.value = []
        console.log('内容为空')
      }
    }, 300, true)
    // 处理点击框时的事件
    // const handleClickInput = function () {
    //   isMask.value = true
    // }
    const saveDetailVuex = function (data) {
      if (data.length > 0) {
        store.dispatch('home/changeDetailPest', data)
      }
    }
    // 跳转详情界面
    const tzPage = function (index) {
      router.push({
        name: 'detail',
        params: {
          pestname: index
        }
      })
    }
    // 当搜索框失去焦点时触发的事件
    // const onblur = function () {
    //   isMask.value = false
    // }
    return {
      searchvalue,
      searchRes,
      saveDetailVuex,
      isMask,
      tzPage,
      // onblur,
      // handleClickInput,
      inputSearchChange
    }
  }
}
</script>
<style lang='less' scoped>
.search-mp {
  position: relative;
  width: 100%;
  height: 100%;

  .mask-search {
    position: absolute;
    left: calc(50% - 45vw);
    background-color: rgba(255, 255, 255, 0.829);
    width: 90vw;
    z-index: 2001;
    overflow: auto;
    max-height: 80vh;
    border-radius: 10px;
    padding-bottom: 10px;
  }
}

.word-s {
  text-align: center;
  font-size: 14px;
  color: #787a7c;
}

.empty-search {
  padding: 20px 40px;
}

.item-sres {
  font-size: 16px;
  color: rgb(3, 3, 3);
  margin: 10px 5px;
  padding: 5px 10px;
  border-bottom: 1px dashed #ccc;
}

.bottom-res {
  text-align: center;
  font-size: 14px;
}
</style>
