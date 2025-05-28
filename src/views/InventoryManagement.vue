<template>
  <div class="inventory-page">
    <h2>Inventory Management</h2>

    <input v-model="searchQuery" type="text" placeholder="🔍 Search by product name..." class="search-input" />
    <div class="sort-controls">
      <label for="sort">Sort by:</label>
      <select v-model="sortKey" id="sort">
        <option value="name">Name</option>
        <option value="stock">Stock</option>
        <option value="price">Price</option>
      </select>

      <button @click="toggleSortOrder">
        Sort: {{ sortOrder === 'asc' ? '⬆ Ascending' : '⬇ Descending' }}
      </button>
    </div>

    <p>* Highlighted products indicate low stock</p>
    <InventoryTable :products="filteredProducts" @update-stock="handleStockUpdate" />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useInventoryStore } from '../store/inventory'
import InventoryTable from '../components/InventoryTable.vue'
const sortKey = ref('name')
const sortOrder = ref('asc')

function toggleSortOrder() {
  sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc'
}

const filteredProducts = computed(() => {
  return [...inventoryStore.products]
    .filter(product =>
      product.name.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
    .sort((a, b) => {
      const aVal = a[sortKey.value]
      const bVal = b[sortKey.value]
      if (typeof aVal === 'string') {
        return sortOrder.value === 'asc'
          ? aVal.localeCompare(bVal)
          : bVal.localeCompare(aVal)
      } else {
        return sortOrder.value === 'asc' ? aVal - bVal : bVal - aVal
      }
    })
})


const inventoryStore = useInventoryStore()
const searchQuery = ref('')

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
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.05);
  border-radius: 16px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.inventory-page h2 {
  font-size: 2rem;
  color: #1e88e5;
  margin-bottom: 2rem;
  text-align: center;
  letter-spacing: 0.5px;
}

.search-input {
  display: block;
  width: 100%;
  max-width: 420px;
  padding: 0.75rem 1rem;
  font-size: 1rem;
  border-radius: 8px;
  border: 1px solid #cfd8dc;
  margin: 0 auto 2rem;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.04);
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
}

.search-input:focus {
  border-color: #42a5f5;
  box-shadow: 0 0 0 4px rgba(66, 165, 245, 0.2);
  outline: none;
}

.sort-controls {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 1.75rem;
  font-size: 1rem;
}

.sort-controls label {
  font-weight: 600;
  color: #555;
}

.sort-controls select,
.sort-controls button {
  padding: 0.5rem 1rem;
  font-size: 0.95rem;
  border: 1px solid #ccc;
  border-radius: 6px;
  cursor: pointer;
  background-color: #f9f9f9;
  transition: all 0.2s ease;
}

.sort-controls select:focus,
.sort-controls button:focus {
  border-color: #42a5f5;
  outline: none;
}

.sort-controls button:hover {
  background-color: #e3f2fd;
  color: #1e88e5;
}

.inventory-page p {
  text-align: center;
  color: #d32f2f;
  font-weight: 500;
  margin-bottom: 1rem;
}
@media (max-width: 600px) {
  .sort-controls {
    flex-direction: column;
    align-items: stretch;
  }

  .sort-controls select,
  .sort-controls button {
    width: 100%;
  }
}
</style>
