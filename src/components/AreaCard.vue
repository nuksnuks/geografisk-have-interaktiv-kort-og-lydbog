<template>
  <div>
    <LoadingSpinner />

    <div class="menuContainer" v-if="!locationStore.selectedArea">
      <AreaMenuItem
        v-for="area in locationStore.gardenAreas"
        :key="area.id"
        :area="area"
        @select="selectArea(area)"
      />
    </div>
    
    <div v-else class="selectedAreaContainer">
      <SelectedArea
        :selectedArea="locationStore.selectedArea"
        @navigate="navigateToMoreInfo(locationStore.selectedArea)"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useLocationStore } from '@/stores/location';
import { useLoadingStore } from '@/stores/loading';  // Import loading store
import LoadingSpinner from '@/components/LoadingSpinner.vue';  // Import loading spinner
import AreaMenuItem from '@/components/AreaMenuItem.vue'; // Import AreaMenuItem
import SelectedArea from '@/components/SelectedArea.vue'; // Import SelectedArea

// Initialize stores and router
const locationStore = useLocationStore();
const loadingStore = useLoadingStore();
const router = useRouter();
const route = useRoute();
const previousRoute = ref(null);

// Function to select an area
function selectArea(area) {
  loadingStore.startLoading();
  locationStore.updateSelectedArea(area);
  setTimeout(() => { // Simulate loading time
    loadingStore.stopLoading();
  }, 500);  // Adjust the loading time as needed
}

// Function to navigate to more info
function navigateToMoreInfo(area) {
  loadingStore.startLoading();
  router.push({ name: 'countryView', params: { id: area.id } });
  loadingStore.stopLoading();
}

// Function to go back
function goBack() {
  if (locationStore.selectedArea) {
    loadingStore.startLoading();
    locationStore.updateSelectedArea(null);
    router.push({ name: 'map' });
    loadingStore.stopLoading();
  } else if (previousRoute.value) {
    loadingStore.startLoading();
    router.push(previousRoute.value);
    loadingStore.stopLoading();
  } else {
    router.back();
  }
}

// Watch for route changes
watch(route, (newRoute, oldRoute) => {
  if (oldRoute && oldRoute.name) {
    previousRoute.value = { name: oldRoute.name, params: oldRoute.params };
  }
}, { immediate: true });
</script>

<style scoped lang="scss">
@import '@/styles/global.scss';
@import 'bootstrap-icons/font/bootstrap-icons.css';

.menuContainer {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin: 8px 15px 0px 15px;
  margin-bottom: 100px;
}
</style>
