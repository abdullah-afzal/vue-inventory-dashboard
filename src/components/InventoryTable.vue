<template>
  <table class="inventory-table">
    <thead>
      <tr>
        <th>Name</th>
        <th>Category</th>
        <th>Stock</th>
        <th>Price</th>
        <th>Update Stock</th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="product in products"
        :key="product.id"
        :class="{ low: product.stock < 10 }"
      >
        <td>{{ product.name }}</td>
        <td>{{ product.category }}</td>
        <td>{{ product.stock }}</td>
        <td>${{ product.price.toFixed(2) }}</td>
        <td>
          <input
            type="number"
            v-model.number="editableStock[product.id]"
            @change="update(product.id)"
            min="0"
            class="stock-input"
          />
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup>
import { watchEffect, reactive } from 'vue'

const props = defineProps({
  products: Array,
})
const emit = defineEmits(['update-stock'])

const editableStock = reactive({})

watchEffect(() => {
  props.products.forEach(product => {
    editableStock[product.id] = product.stock
  })
})

function update(id) {
  emit('update-stock', id, editableStock[id])
}
</script>

<style scoped>
.inventory-table {
  width: 100%;
  border-collapse: collapse;
}
.inventory-table th,
.inventory-table td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}
.low {
  background-color: #fae98c;
}
.stock-input {
  width: 60px;
  padding: 4px;
}
</style>
