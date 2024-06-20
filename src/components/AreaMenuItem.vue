<template>
    <div class="menuItem" @click="$emit('select', area)">
      <div class="imageContainer">
        <img :src="area.imageURL" :alt="`${area.name} Image`" />
      </div>
      <div class="textContainer">
        <div class="titleAndDistance">
          <h3>{{ area.name }}</h3>
          <p class="distanceText">{{ area.distance !== null ? `${area.distance} meters` : 'Calculating...' }}</p>
        </div>
        <p>{{ area.description }}</p>
      </div>
      <i class="bi bi-arrow-right-circle"></i>
    </div>
  </template>
  
  <script setup>
  import { defineProps, defineEmits } from 'vue';
  
  defineProps(['area']);
  defineEmits(['select']);
  </script>
  <style scoped lang="scss">
  @import '@/styles/global.scss';
  @import 'bootstrap-icons/font/bootstrap-icons.css';
  
  .TopNavcontainer {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: $primary-color;
    border-bottom: 1px solid var(--color-border);
    width: 60px;
    height: 60px;
    border-radius: 50%;
    padding: 0;
    margin: 5px;
    position: fixed;
    top: 0px;
    left: 0px;
    z-index: 100000000;
  }
  
  .arrow {
    display: flex;
    fill: $background-color;
    width: 30px;
    height: 30px;
  }
  

  
    .menuItem {
      display: flex;
      align-items: center;
      background: $secondary-color;
      box-shadow: $menuContainer-shadow;
      border-radius: $border-radius;
      padding: 20px;
      color: $font-color;
      position: relative;
      gap: 10px;
  
      .imageContainer {
        flex-shrink: 0;
        width: 100px;
        height: 100px;
        border-radius: $border-radius;
        overflow: hidden;
        margin-right: 10px;
  
        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }
  
      .textContainer {
        flex-grow: 1;
  
        .titleAndDistance {
          display: flex;
          justify-content: space-between;
          align-items: center;
  
          h3 {
            font-size: $medium-font-size;
            margin: 0;
            color: $font-color;
            font-size: 16px;
          }
  
          .distance {
            background: #FFFFFF;
            color: #000000;
            padding: 5px 10px;
            border-radius: 15px;
            font-size: 12px;
          }
  
          .distanceText {
            color: $distancetext-color;
          }
        }
  
        p {
          font-size: $small-font-size;
          margin: 0;
          font-size: 12px;
          color: $font-color;
        }
      }
  
      .bi-arrow-right-circle {
        font-size: 30px;
        margin-left: auto;
        color: #FFF;
      }
    }

  </style>