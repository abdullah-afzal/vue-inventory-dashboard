<template>
  <div class="inventory-page">
    <h2>Inventory Management</h2>

    <input
      v-model="searchQuery"
      type="text"
      placeholder="🔍 Search by product name..."
      class="search-input"
    />
<p>* Highlighted products indicate low stock</p>
    <InventoryTable
      :products="filteredProducts"
      @update-stock="handleStockUpdate"
    />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useInventoryStore } from '../store/inventory'
import InventoryTable from '../components/InventoryTable.vue'

const inventoryStore = useInventoryStore()
const searchQuery = ref('')

const filteredProducts = computed(() => {
  return inventoryStore.products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
})

function handleStockUpdate(id, newStock) {
  inventoryStore.updateStock(id, newStock)
}
</script>

<style scoped>
.inventory-page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2.5rem;
  background-color: #ffffff;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.04);
  border-radius: 12px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.inventory-page h2 {
  font-size: 1.75rem;
  color: #1e88e5;
  margin-bottom: 1.5rem;
  text-align: center;
}

.search-input {
  display: block;
  width: 100%;
  max-width: 400px;
  padding: 0.75rem 1rem;
  font-size: 1rem;
  border-radius: 6px;
  border: 1px solid #ccc;
  margin: 0 auto 2rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
}

.search-input:focus {
  border-color: #42a5f5;
  box-shadow: 0 0 0 3px rgba(66, 165, 245, 0.2);
  outline: none;
}
</style>

