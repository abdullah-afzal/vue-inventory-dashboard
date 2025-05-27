<template>
  <div class="product-registration">
    <h2>Product Registration</h2>
    <form @submit.prevent="submitForm" class="product-form">
      <div class="form-group">
        <label for="name">Product Name</label>
        <input id="name" v-model="form.name" type="text" required />
      </div>

      <div class="form-group">
        <label for="description">Description</label>
        <textarea id="description" v-model="form.description" rows="4" required></textarea>
      </div>

      <div class="form-row">
        <div class="form-group">
          <label for="price">Price ($)</label>
          <input id="price" v-model.number="form.price" type="number" min="0" step="0.01" required />
        </div>

        <div class="form-group">
          <label for="stock">Initial Stock</label>
          <input id="stock" v-model.number="form.stock" type="number" min="0" required />
        </div>
      </div>

      <div class="form-group">
        <label for="category">Category</label>
        <select id="category" v-model="form.category" required>
          <option value="">Select Category</option>
          <option value="Merch">Merch</option>
          <option value="Clothing">Clothing</option>
          <option value="Footwear">Footwear</option>
          <option value="Other">Other</option>
        </select>
      </div>

      <div class="form-group">
        <label for="image">Product Image</label>
        <input id="image" type="file" accept="image/*" @change="onImageChange" />
        <div v-if="imagePreview" class="image-preview">
          <img :src="imagePreview" alt="Preview" />
        </div>
      </div>

      <div class="form-button">
        <button type="submit">Add Product</button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { useInventoryStore } from '../store/inventory'

const inventoryStore = useInventoryStore()

const form = reactive({
  name: '',
  description: '',
  price: 0,
  stock: 0,
  category: '',
  image: null,
})

const imagePreview = ref(null)

function onImageChange(event) {
  const file = event.target.files[0]
  if (file) {
    form.image = file
    const reader = new FileReader()
    reader.onload = e => {
      imagePreview.value = e.target.result
    }
    reader.readAsDataURL(file)
  } else {
    form.image = null
    imagePreview.value = null
  }
}

function submitForm() {
  if (!form.name || !form.description || form.price < 0 || form.stock < 0 || !form.category) {
    alert('Please fill all fields correctly.')
    return
  }

  const newProduct = {
    id: Date.now(),
    name: form.name,
    description: form.description,
    price: form.price,
    stock: form.stock,
    category: form.category,
    image: imagePreview.value || null,
  }

  inventoryStore.products.push(newProduct)

  form.name = ''
  form.description = ''
  form.price = 0
  form.stock = 0
  form.category = ''
  form.image = null
  imagePreview.value = null

  alert('Product added successfully!')
}
</script>

<style scoped>
.product-registration {
  max-width: 700px;
  margin: 0 auto;
  padding: 2rem;
  background: #ffffff;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  border-radius: 12px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.product-registration h2 {
  font-size: 1.75rem;
  color: #1e88e5;
  margin-bottom: 1.5rem;
  text-align: center;
}

.product-form {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.form-row {
  display: flex;
  gap: 6%;
  flex-wrap: wrap;
}

.form-group label {
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: #333;
}

input[type='text'],
input[type='number'],
textarea,
select {
  padding: 0.75rem;
  font-size: 1rem;
  border-radius: 6px;
  border: 1px solid #ccc;
  transition: border 0.3s, box-shadow 0.3s;
}

#price,
#stock {
  width: 100%;
}

input:focus,
textarea:focus,
select:focus {
  border-color: #42a5f5;
  box-shadow: 0 0 0 3px rgba(66, 165, 245, 0.2);
  outline: none;
}

.image-preview img {
  margin-top: 0.75rem;
  max-width: 100%;
  max-height: 220px;
  border-radius: 8px;
  border: 1px solid #ddd;
  object-fit: contain;
}

button {
  align-self: flex-start;
  padding: 0.75rem 1.5rem;
  background-color: #42a5f5;
  color: white;
  font-weight: 600;
  font-size: 1rem;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  width: 100%;
}

button:hover {
  background-color: #1e88e5;
}
.form-button {
  display: flex;
  justify-content: center;
}
</style>


