<template>
    <header class="top-bar">
      <button class="menu-btn" @click="$emit('toggle-sidebar')">
        <Menu class="icon" />
      </button>
      <h1 class="title">Dashboard</h1>
    </header>
  </template>
  
  <script setup>
  import { Menu } from 'lucide-vue-next'
  </script>
  
  <style scoped>
  .top-bar {
    height: 60px;
    background-color: #ffffff;
    display: flex;
    align-items: center;
    padding: 0 1rem;
    box-shadow: 0 2px 5px rgba(0,0,0,0.05);
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1001;
  }
  
  .menu-btn {
    background: none;
    border: none;
    cursor: pointer;
    padding: 0.5rem;
    margin-right: 1rem;
  }
  
  .icon {
    width: 24px;
    height: 24px;
    stroke: #333;
  }
  .title {
    font-size: 1.25rem;
    font-weight: 600;
    color: #333;
  }
  </style>
  