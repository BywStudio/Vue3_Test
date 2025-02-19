<script setup>
import * as echarts from 'echarts'
import { onMounted, watch, getCurrentInstance } from 'vue';

// 使用 props 自定义属性实现 父组件 DataCom 向子组件共享数据
const props = defineProps(['xData', 'data'])
// 获取当前组件实例
const instance = getCurrentInstance()

// 监听 父组件中的数据
watch(props, () => {
  refresh()
})

// onMounted(() => {
//   refresh()
// })

function  refresh() {
  let chart = echarts.init(instance.proxy.$refs.chart)
  chart.clear()
  chart.setOption({
    xAxis: {
      data: props.xData
    },
    yAxis: {
      type: 'value'
    },
    series: {
      type: 'line',
      data: props.data
    }
  })
}
</script>

<template>
  <div ref="chart"></div>
</template>

<style scoped>
  
</style>