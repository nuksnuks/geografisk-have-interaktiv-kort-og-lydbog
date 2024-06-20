<template>
  <div class="menuItem">
    <div class="infoContainer">
      <div class="imageContainer">
        <img :src="selectedArea.imageURL" :alt="`${selectedArea.name} Image`" />
      </div>
      <div class="textContainer">
        <div class="titleAndDistance">
          <h3>{{ selectedArea.name }}</h3>
          <p class="distanceText">{{ selectedArea.distance !== null ? `${selectedArea.distance} meters` : 'Calculating...' }}</p>
        </div>
        <p>{{ selectedArea.description }}</p>
      </div>
    </div>
    <button @click="$emit('navigate', selectedArea)">Flere informationer <i class="bi bi-arrow-right-circle"></i></button>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';

defineProps(['selectedArea']);
defineEmits(['navigate']);
</script>

<style scoped lang="scss">
@import '@/styles/global.scss';
@import 'bootstrap-icons/font/bootstrap-icons.css';

.selectedAreaContainer {
  display: flex;
  gap: 15px;
  margin: 10px;
  padding:10px;
}

.menuItem {
  display: flex;
  flex-direction: column;
  background: $secondary-color;
  box-shadow: $menuContainer-shadow;
  border-radius: $border-radius;
  padding: 20px;
  color: $font-color;
  position: relative;
  gap: 10px;
  font-size: 20px;
}

.menuItem .infoContainer {
  display: flex;
  flex-direction: row;
}

.menuItem .imageContainer {
  flex-shrink: 0;
  width: 100px;
  height: 100px;
  border-radius: $border-radius;
  overflow: hidden;
  margin-right: 10px;
}

.menuItem .imageContainer img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.menuItem .textContainer {
  flex-grow: 1;
}

.menuItem .textContainer .titleAndDistance {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.menuItem .textContainer .titleAndDistance h3 {
  font-size: $medium-font-size;
  margin: 0;
  color: $font-color;
  font-size: 16px;
}

.menuItem .textContainer .titleAndDistance .distance {
  background: #FFFFFF;
  color: #000000;
  padding: 5px 10px;
  border-radius: 15px;
  font-size: 12px;
}

.menuItem .textContainer .titleAndDistance .distanceText {
  color: $distancetext-color;
}

.menuItem .textContainer p {
  font-size: $small-font-size;
  margin: 0;
  font-size: 12px;
  color: $font-color;
}

.menuItem button {
  display: flex;
  justify-content: center;
  padding: 10px 15px;
  border-radius: 15px;
  font-size: 1rem;
  background-color: #4A4C63;
  color: white;
  border: none;
  cursor: pointer;
  display: inline-block;
  text-align: center;
}
</style>