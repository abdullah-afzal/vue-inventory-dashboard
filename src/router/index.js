import { createRouter, createWebHistory } from 'vue-router'

import RevenueAnalysis from '../views/RevenueAnalysis.vue'
import InventoryManagement from '../views/InventoryManagement.vue'
import ProductRegistration from '../views/ProductRegistration.vue'

const routes = [
  { path: '/', redirect: '/revenue' },
  { path: '/revenue', component: RevenueAnalysis },
  { path: '/inventory', component: InventoryManagement },
  { path: '/product-registration', component: ProductRegistration },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
