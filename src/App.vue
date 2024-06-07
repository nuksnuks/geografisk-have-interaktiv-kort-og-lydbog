<template>
  <div>
    <!-- her bruger jeg conditional rendering til at vise loadingspinner eller router-view-->
    <template v-if="isLoading">
      <loading-spinner :loading="true" />
    </template>
    <template v-else>
      <router-view />
    </template>
    
  </div>
  <!-- Bottom nav vises alti' alti' -->
  <BottomNav />
</template>

<script setup>
import { ref, onMounted } from 'vue';
import LoadingSpinner from '@/components/LoadingSpinner.vue';
import BottomNav from '@/components/bottomNav.vue';
import { onAuthStateChanged, getAuth } from 'firebase/auth';
import { useRouter } from 'vue-router';

import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyBrXS9zQOlmv6BfZgrTLHY402zKsE7Zm9c",
  authDomain: "geo-kort-og-lydbog.firebaseapp.com",
  projectId: "geo-kort-og-lydbog",
  storageBucket: "geo-kort-og-lydbog.appspot.com",
  messagingSenderId: "447721431608",
  appId: "1:447721431608:web:d793a2a1904c6176cfbccd",
  measurementId: "G-5N25FFYYME"
};

console.log(import.meta.env.VUE_APP_FIREBASE_MEASUREMENT_ID)
console.log(process.env.VUE_APP_FIREBASE_MEASUREMENT_ID)

const firebaseApp = initializeApp(firebaseConfig);
const db  = getFirestore(firebaseApp);
  const storage = getStorage(firebaseApp);
  const isLoading = ref(true);

  const fetchData = async () => {
  // sætter loading til at være "true"
    isLoading.value = true;

    try {
    // 1. API logik skal insættes her
    // For example, if you're using fetch to make an API call:
    // const response = await fetch('your-api-url');
    // const data = await response.json();

    // Remember to replace the above with your actual API call
    } catch (error) {
        console.error("Error fetching data: ", error);
      } finally {
        // 2. når async/await er færdig sættes isloading tilbage til false så router-view componentet vises.
        isLoading.value = false;
    }
  };

const router = useRouter();
const auth = getAuth();

onAuthStateChanged(auth, (user) => {

  if(user) {
    if(router.currentRoute.value.path !== "/admin"){
    }
  } else {
    if(router.currentRoute.value.path !== "/login") {
    }
  }

})

onMounted(() => {
  fetchData();
});

</script>

<style scoped lang="scss">
</style>
