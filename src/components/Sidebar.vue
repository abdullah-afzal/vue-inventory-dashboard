<template>
    <nav class="sidebar">
      <router-link to="/revenue" active-class="active-link">
        <BarChart2 class="icon" /> Revenue Analysis
      </router-link>
      <router-link to="/inventory" active-class="active-link">
        <Boxes class="icon" /> Inventory Management
      </router-link>
      <router-link to="/product-registration" active-class="active-link">
        <FileText class="icon" /> Product Registration
      </router-link>
    </nav>
  </template>
  
  <script setup>
  import { BarChart2, Boxes, FileText } from 'lucide-vue-next'
  </script>
  
  <style scoped>
  .sidebar {
    position: fixed;
    left: 0;
    top: 60px;
    height: 100vh;
    width: 240px;
    background-color: #ffffff;
    padding: 2rem 1.5rem;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    box-shadow: 2px 0 8px rgba(0, 0, 0, 0.05);
    z-index: 1000;
    border-right: 1px solid #eee;
  }
  
  .sidebar a {
    display: flex;
    align-items: center;
    text-decoration: none;
    color: #333;
    font-weight: 500;
    padding: 0.75rem 1rem;
    border-radius: 8px;
    transition: all 0.3s ease;
    font-size: 1rem;
    white-space: nowrap;
    gap: 0.75rem;
  }
  
  .sidebar a:hover {
    background-color: #e3f2fd;
    color: #1e88e5;
  }
  
  .sidebar a:hover .icon,
  .active-link .icon {
    stroke: #1e88e5;
  }
  
  .icon {
    width: 20px;
    height: 20px;
    stroke: #666;
    transition: stroke 0.3s ease;
  }
  
  .active-link {
    background-color: #e1f5fe;
    color: #1e88e5;
    font-weight: 600;
    border-left: 4px solid #1e88e5;
    padding-left: calc(1rem - 4px); /* Compensate for border */
  }
  </style>
  