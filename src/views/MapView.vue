<template>
  <div>
    <LoadingSpinner />
    <TopNav />
    <MapComponent @distance-calculated="handleDistanceCalculation" @update:info="handleInfoUpdate" />
    <AreaCard :distance="distanceResult" :selectedArea="selectedAreaInfo" />
  </div>
</template>

<script setup>
import { onMounted, ref, computed } from 'vue';
import { useLocationStore } from '@/stores/location';
import { useLoadingStore } from '@/stores/loading';  // Adjust the path accordingly
import TopNav from '../components/TopNav.vue';

import MapComponent from '../components/MapComponent.vue';
import AreaCard from '../components/AreaCard.vue';

const distanceResult = ref(null);
const locationStore = useLocationStore();
const loadingStore = useLoadingStore();

function handleDistanceCalculation(distance) {
  distanceResult.value = distance;
}

const selectedAreaInfo = ref(null);

function handleInfoUpdate(info) {
  selectedAreaInfo.value = info;
}

onMounted(() => {
  loadingStore.startLoading();
  locationStore.fetchGardenAreas().then(() => {
    loadingStore.stopLoading();
  });

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      const { latitude, longitude } = position.coords;
      locationStore.updateCurrentPosition({ lat: latitude, lng: longitude });
      loadingStore.stopLoading();  // Stop loading when geolocation is updated
    }, () => {
      loadingStore.stopLoading();  // Stop loading even if geolocation fails
    });
  } else {
    loadingStore.stopLoading();  // Stop loading if geolocation is not supported
  }
});
</script>


