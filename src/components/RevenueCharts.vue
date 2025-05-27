<template>
  <div class="charts">
    <h3>Sales Revenue</h3>
    <canvas ref="revenueChart"></canvas>

    <h3 style="margin-top: 2rem">Orders</h3>
    <canvas ref="ordersChart"></canvas>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted, ref, watch } from 'vue'
import { Chart, registerables } from 'chart.js'

Chart.register(...registerables)

const props = defineProps({
  revenue: Array,
  orders: Array,
})

const revenueChart = ref(null)
const ordersChart = ref(null)

let revChartInstance = null
let ordChartInstance = null

function prepareChartData(data, labelKey = 'date', valueKey = 'amount') {
  const grouped = {}
  data.forEach(item => {
    const date = item[labelKey]
    grouped[date] = (grouped[date] || 0) + item[valueKey]
  })
  const labels = Object.keys(grouped).sort()
  const values = labels.map(label => grouped[label])
  return { labels, values }
}

function renderCharts() {
  const revenueData = prepareChartData(props.revenue, 'date', 'amount')
  const ordersData = prepareChartData(props.orders, 'date', 'count')

  if (revChartInstance) revChartInstance.destroy()
  if (ordChartInstance) ordChartInstance.destroy()

  revChartInstance = new Chart(revenueChart.value, {
    type: 'line',
    data: {
      labels: revenueData.labels,
      datasets: [{
        label: 'Revenue',
        data: revenueData.values,
        borderColor: '#42A5F5',
        backgroundColor: 'rgba(66, 165, 245, 0.2)',
        fill: true,
      }]
    },
    options: {
      responsive: true,
      scales: {
        y: { beginAtZero: true }
      }
    }
  })

  ordChartInstance = new Chart(ordersChart.value, {
    type: 'bar',
    data: {
      labels: ordersData.labels,
      datasets: [{
        label: 'Orders',
        data: ordersData.values,
        backgroundColor: '#66BB6A',
      }]
    },
    options: {
      responsive: true,
      scales: {
        y: { beginAtZero: true }
      }
    }
  })
}

onMounted(() => {
  renderCharts()
})

watch(() => [props.revenue, props.orders], () => {
  renderCharts()
}, { deep: true })

onUnmounted(() => {
  if (revChartInstance) revChartInstance.destroy()
  if (ordChartInstance) ordChartInstance.destroy()
})
</script>

<style scoped>
.charts {
  max-width: 1000px;
}
canvas {
  width: 100% !important;
  height: 500px !important;
}
</style>
