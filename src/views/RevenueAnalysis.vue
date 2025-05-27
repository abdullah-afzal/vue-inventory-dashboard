<template>
  <div class="header">
    <h3>Total Revenue </h3>
    <h1>${{ totalRevenue.toFixed(2) }}</h1>
  </div>

  <div class="revenue-analysis">

    <div class="stats">
      <div class="stat-box total-orders">
        <h3>Total Orders</h3>
        <p>{{ totalOrders }}</p>
      </div>
      <div class="stat-box shipped-orders">
        <h3>Shipped Orders</h3>
        <p>{{ totalOrders - 25 }}</p>
      </div>
      <div class="stat-box pending-orders">
        <h3>Pending Orders</h3>
        <p>{{ 25 }}</p>
      </div>

    </div>
    <hr />
    <div class="filter-section">
      <label for="category">Filter by Category:</label>
      <select v-model="selectedCategory" id="category">
        <option value="">All</option>
        <option v-for="category in categories" :key="category">{{ category }}</option>
      </select>

      <label for="date-range" style="margin-left: 1rem;">Filter by Date:</label>
      <select v-model="selectedDateRange" id="date-range">
        <option value="all">All Time</option>
        <option value="today">Today</option>
        <option value="last7">Last 7 Days</option>
        <option value="last15">Last 15 Days</option>
        <option value="last30">Last 30 Days</option>
      </select>
    </div>

    <div class="chart-section">
      <div class="charts">
        <RevenueCharts :orders="filteredOrders" :revenue="filteredRevenue"
          :key="selectedCategory + selectedDateRange" />
      </div>

      <div class="latest-orders">
        <h3>Latest Orders</h3>
        <ul>
          <li v-for="order in latestOrders" :key="order.id">
            <div class="order-item">
              <img :src="order.avatar" alt="avatar" class="avatar" />
              <div>
                <strong>{{ order.name }}</strong><br />
                <small>{{ new Date(order.createdAt).toLocaleString() }}</small><br />
                <small>{{ order.email }}</small><br />
                <span><strong>${{ parseFloat(order.ammount).toFixed(2) }}</strong></span>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>

</template>

<script setup>

import { ref, computed, onMounted } from 'vue'
import { useRevenueStore } from '../store/revenue'
import RevenueCharts from '../components/RevenueCharts.vue'
import axios from 'axios'

const orders = ref([])

onMounted(async () => {
  try {
    const response = await axios.get('https://68338aba464b499636ffc538.mockapi.io/abdullah/orders')
    orders.value = response.data
  } catch (error) {
    console.error('Failed to fetch orders:', error)
  }
})

const latestOrders = computed(() => {
  return [...orders.value]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 10)
})


const revenueStore = useRevenueStore()
const selectedCategory = ref('')

const totalOrders = computed(() => revenueStore.totalOrders)
const totalRevenue = computed(() => revenueStore.totalRevenue)

const categories = computed(() => [...new Set(revenueStore.revenueData.map(r => r.category))])

const selectedDateRange = ref('last30')

function isWithinRange(dateStr, range) {
  const date = new Date(dateStr)
  const today = new Date()
  const diffTime = today - date
  const diffDays = diffTime / (1000 * 60 * 60 * 24)

  switch (range) {
    case 'today':
      return date.toDateString() === today.toDateString()
    case 'last7':
      return diffDays <= 7
    case 'last15':
      return diffDays <= 15
    case 'last30':
      return diffDays <= 30
    case 'all':
    default:
      return true
  }
}

const filteredOrders = computed(() => {
  return revenueStore.orders.filter(order => {
    const categoryMatch = !selectedCategory.value || order.category === selectedCategory.value
    const dateMatch = isWithinRange(order.date, selectedDateRange.value)
    return categoryMatch && dateMatch
  })
})

const filteredRevenue = computed(() => {
  return revenueStore.revenueData.filter(entry => {
    const categoryMatch = !selectedCategory.value || entry.category === selectedCategory.value
    const dateMatch = isWithinRange(entry.date, selectedDateRange.value)
    return categoryMatch && dateMatch
  })
})
</script>

<style scoped>
.header {
  color: #1e88e5;
  line-height: 0.5rem;
  padding-left: 6%;
  padding-top: 3%;
}

.revenue-analysis {
  padding-left: 6%;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.stats {
  display: flex;
  gap: 2rem;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
}

.stat-box {
  /* padding: 3rem; */
  border-radius: 12px;
  min-width: 250px;
  width: 30%;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease;
}

.stat-box:hover {
  transform: scale(1.02);
}

.stat-box h3 {
  padding-top: 1rem;
  padding-left: 1rem;
  font-size: 1rem;
  color: #ffffff;
  margin-bottom: 0.5rem;
  text-transform: uppercase;
  text-align: left;
  letter-spacing: 1px;
}

.stat-box p {
  padding: 2rem;
  font-size: 3rem;
  font-weight: bold;
  color: #ffffff;
  text-align: right;
  margin: 0;
}

.stat-box.total-orders {
  background: linear-gradient(to bottom right, #e8f5e9, #227424);
}

.stat-box.shipped-orders {
  background: linear-gradient(to bottom right, #fff3e0, #4a51b1);
}

.stat-box.pending-orders {
  background: linear-gradient(to bottom right, #fce4ec, #b85128);
}

.filter-section {
  margin-bottom: 1.5rem;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 1rem;
}

.filter-section label {
  font-weight: 500;
}

.filter-section select {
  padding: 0.5rem;
  font-size: 1rem;
  border-radius: 6px;
  border: 1px solid #ccc;
}

.chart-section {
  display: flex;
  gap: 2rem;
  align-items: flex-start;
  flex-wrap: wrap;
}

.charts {
  flex: 2;
  min-width: 60%;
}

.latest-orders {
  flex: 1;
  min-width: 30%;
  background-color: #f9f9f9;
  padding: 1rem;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  max-height: 500px;
  overflow-y: auto;
}

.latest-orders h3 {
  margin-bottom: 1rem;
  font-size: 1.2rem;
  font-weight: 600;
}

.latest-orders ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.latest-orders li {
  padding: 0.75rem 0;
  border-bottom: 1px solid #ddd;
}

.latest-orders li:last-child {
  border-bottom: none;
}

.order-item {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
}

.avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
}
</style>
