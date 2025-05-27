<template>
  <div id="app">
    <TopBar @toggle-sidebar="isSidebarVisible = !isSidebarVisible" />
    <Sidebar v-if="isSidebarVisible" />
    <main class="main-content" :class="{ 'expanded': !isSidebarVisible }">
      <router-view />
    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Sidebar from './components/Sidebar.vue'
import TopBar from './components/TopBar.vue'

const isSidebarVisible = ref(true)
</script>

<style>
#app {
  font-family: Arial, sans-serif;
  margin: 0;
}

.main-content {
  transition: margin-left 0.3s ease;
  margin-left: 220px;
  padding: 2rem;
}

.main-content.expanded {
  margin-left: 0;
}
</style>
