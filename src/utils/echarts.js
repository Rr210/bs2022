import * as echarts from 'echarts/core'
import {
  DatasetComponent,
  GridComponent,
  VisualMapComponent,
  TitleComponent
} from 'echarts/components'
import { BarChart } from 'echarts/charts'
import { CanvasRenderer } from 'echarts/renderers'

echarts.use([
  DatasetComponent,
  GridComponent,
  VisualMapComponent,
  BarChart,
  TitleComponent,
  CanvasRenderer
])
export { echarts }
