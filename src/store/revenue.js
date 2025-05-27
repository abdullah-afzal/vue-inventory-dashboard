import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

function generateMockData(days = 30) {
  const data = []
  const today = new Date()
  for (let i = 0; i < days; i++) {
    const date = new Date(today)
    date.setDate(date.getDate() - i)
    const formattedDate = date.toISOString().split('T')[0]
    const category = ['Shirts', 'Jeans', 'Shorts', 'Merch'][Math.floor(Math.random() * 4)]
    const amount = Math.floor(Math.random() * 5000) + 500 // revenue
    const count = Math.floor(Math.random() * 20) + 1 // orders
    data.push({ date: formattedDate, category, amount, count })
  }
  return data.reverse()
}

export const useRevenueStore = defineStore('revenue', () => {
  const revenueData = ref(generateMockData())

  const orders = computed(() =>
    revenueData.value.map(r => ({ date: r.date, category: r.category, count: r.count }))
  )

  const totalOrders = computed(() =>
    revenueData.value.reduce((sum, r) => sum + r.count, 0)
  )

  const totalRevenue = computed(() =>
    revenueData.value.reduce((sum, r) => sum + r.amount, 0)
  )

  return {
    revenueData,
    orders,
    totalOrders,
    totalRevenue,
  }
})
