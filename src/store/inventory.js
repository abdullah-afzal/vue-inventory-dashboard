import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useInventoryStore = defineStore('inventory', () => {
  const products = ref([
    {
      id: 1,
      name: 'Wireless Headphones',
      category: 'Merch',
      price: 99.99,
      stock: 15,
    },
    {
      id: 2,
      name: 'Cotton T-Shirt',
      category: 'Clothing',
      price: 19.99,
      stock: 5,
    },
    {
      id: 3,
      name: 'Coffee Mug',
      category: 'Merch',
      price: 9.99,
      stock: 8,
    },
    {
      id: 4,
      name: 'Lux Shoes',
      category: 'Footwear',
      price: 599.99,
      stock: 20,
    },
  ])

  function updateStock(id, newStock) {
    const product = products.value.find(p => p.id === id)
    if (product) {
      product.stock = newStock
    }
  }

  return {
    products,
    updateStock,
  }
})
