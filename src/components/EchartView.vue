<template>
  <div id="customerChart" :style="{ width: '90vw', height: '300px' }"></div>
</template>

<script>
import * as echarts from 'echarts'
import { markRaw, onMounted, onUnmounted } from 'vue'
import options from '@/utils/content/options'
import { CATE_URL } from '@/utils/api/urlapi'
import { getCate } from '@/utils/service/mine'
export default {
  setup() {
    const state = markRaw({
      chartInstance: null,
      allData: null,
      titleFontSize: 0,
      timerId: null,
      dom: null
    })
    // 初始化图表
    const initChart = function () {
      state.chartInstance = echarts.init(state.dom)
      const initOption = options
      state.chartInstance.setOption(initOption)
      state.chartInstance.on('mouseover', () => {
        clearInterval(state.timerId)
      })
      state.chartInstance.on('mouseout', () => {
        startInterval()
      })
    }
    const getData = async function () {
      const { data: res } = await getCate(CATE_URL)
      console.log(res)
      const dataset = {
        source: [
          ['score', 'amount', 'product']
        ]
      }
      const a = res.data.map(v => {
        return [Number(v.av_rate) * 100, Number(v.av_rate), v['zh-name']]
      })
      console.log(a)
      dataset.source = [...dataset.source, ...a]
      updateChart({ dataset })
    }
    const updateChart = function (options) {
      const updateOption = options
      state.chartInstance.setOption(updateOption)
    }
    const screenAdapter = function () {
      state.titleFontSize = (state.dom.offsetWidth / 100) * 3.6
      const adapterOption = {}
      state.chartInstance.setOption(adapterOption)
      state.chartInstance.resize()
    }
    const startInterval = function () {
      if (state.timerId) clearInterval(state.timerId)
      state.timerId = setInterval(() => { }, 3000)
    }
    onMounted(() => { // 需要获取到element,所以是onMounted的Hook
      // 绘制图表
      state.dom = document.getElementById('customerChart')
      initChart()
      getData()
      window.addEventListener('resize', screenAdapter)
      screenAdapter()
    })

    onUnmounted(() => {
      window.removeEventListener('resize', state.screenAdapter)
      clearInterval(state.timerId)
    })
    return {
    }
  }
}
</script>
<style lang='less' scoped>
</style>
