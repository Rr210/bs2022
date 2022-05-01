<!--
 * @Author: Harry
 * @Date: 2022-04-13 13:29:59
 * @LastEditors: harry
 * @Github: https://github.com/rr210
 * @LastEditTime: 2022-05-01 21:55:40
 * @FilePath: \vant-u\src\views\history\components\HisitemCate.vue
-->
<template>
  <div class="hisitemcate">
    <div class="h-i-cate">{{ pestname }}</div>
    <div class="h-i-cate">{{ pestrate }}</div>
    <div class="h-i-cate" @click="introducePest">详情查看</div>
    <div class="h-i-cate hrate" @click="handleRate">
      <van-circle v-model:current-rate="crate" :rate="endrate" :speed="100" :text="ctext" :layer-color="'#dfdfdf'"
        :color="endrate > 50 ? endrate < 70 ? 'green' : 'var(--van-primary-color)' : 'red'" />
    </div>
  </div>

</template>

<script>
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { getanalysis } from '@/utils/service/history'
import { ANALYSIS } from '@/utils/api/urlapi'
export default {
  name: 'HisitemCate',
  emits: ['handleClick'],
  props: {
    pestname: {
      type: String,
      required: true,
      default: ''
    },
    pestrate: {
      type: String,
      required: true,
      default: ''
    }
  },
  setup(props, context) {
    const crate = ref(0)
    const endrate = ref(0)
    const router = useRouter()
    // 获取百分比
    const cirSizeChange = async function () {
      const { pestname } = props
      const { data: res } = await getanalysis(ANALYSIS, { params: { pestname } })
      if (res.status_code === 1) {
        endrate.value = Number(res.data[0] * 100)
      }
    }
    // onMounted(() => {
    const ctext = computed(() => {
      cirSizeChange()
      return crate.value.toFixed(2) + '%'
    })
    const handleRate = function () {
      context.emit('HisitemCate')
    }
    const introducePest = function () {
      const { pestname } = props
      router.push({ name: 'hisdetail', params: { pestname } })
    }
    return {
      introducePest,
      cirSizeChange,
      ctext,
      handleRate,
      endrate,
      crate
    }
  }
}
</script>
<style lang='less' scoped>
.hisitemcate {
  margin: 10px 0;
  display: flex;

  .h-i-cate {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .hrate {
    .van-circle {
      width: 40px;
      height: 40px;
      font-size: 12px;
    }
  }

}
</style>
