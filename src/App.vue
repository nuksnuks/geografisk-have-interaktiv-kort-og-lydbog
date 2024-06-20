<template>
  <div>
    <LoadingSpinner/>
    <router-view />
    <BottomNav />
  </div>
</template>

<script setup>

import { useLoadingStore } from './stores/loading';  // Adjust the path accordingly
import BottomNav from '@/components/BottomNav.vue';
import { onAuthStateChanged, getAuth } from 'firebase/auth';
import { useRouter } from 'vue-router';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import firebaseConfig from './config/firebaseConfig';
import LoadingSpinner from './components/LoadingSpinner.vue';

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
const storage = getStorage(firebaseApp);

// Use Pinia store for loading state
const loadingStore = useLoadingStore();

// Firebase auth and router
const router = useRouter();
const auth = getAuth();

// Monitor auth state
onAuthStateChanged(auth, (user) => {
  if (user) {
    if (router.currentRoute.value.path !== "/admin") {
      // Do something if needed
    }
  } else {
    if (router.currentRoute.value.path !== "/login") {
      // Do something if needed
    }
  }
  loadingStore.stopLoading();  // Stop loading when auth state is determined
});

// Start loading initially
loadingStore.startLoading();
</script>

<style scoped lang="scss">
</style>
