<template>
  <div v-if="loading" class="loading-screen">
    <div class="spinner-container">
      <div class="spinner"></div>
    </div>
  </div>
  </template>
  
  <script setup>
  import { useLoadingStore } from '@/stores/loading';
  import { computed } from 'vue';

    const loadingStore = useLoadingStore();
    const loading = computed(() => loadingStore.loading);
  </script>

  
  <style lang="scss">
  @import '../styles/global.scss';
  
  .spinner-container {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 99999; 
    background-color: #61805b;
  }
  
  .spinner {
    width: 50px;
    height: 50px;
    border: 3px solid #f3f3f3;
    border-radius: 50%;
    border-top: 3px solid #61805b;
    animation: spin 1s linear infinite;
  }
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  </style>
  