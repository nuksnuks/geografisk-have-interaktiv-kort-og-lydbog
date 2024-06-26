<template>
  <div class="menuContainer">
    <div class="menuItem" v-for="event in events" :key="event.id" @click="() => navigateToEvent(event.id)">
      <div class="imageContainer">
        <img :src="event.imageURL || '/default-image.jpg'" :alt="`${event.imageURL} Image`" class="eventImage" />
      </div>
      <div class="textContainer">
        <div class="titleandDateContainer">
          <h3>{{ event.title }}</h3>
          <p class="eventDate">{{ event.date || 'Date not available' }}</p>
        </div>
        <div class="describtionContainer">
          <p class="truncated">{{ event.description }}</p>
          <i class="bi bi-arrow-right-circle navigateIcon"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>

import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { getFirestore, collection, getDocs } from 'firebase/firestore';

const router = useRouter();
const db = getFirestore();
const events = ref([]);
const showFullText = ref({});

onMounted(async () => {
  const eventsCollectionRef = collection(db, 'events');
  const querySnapshot = await getDocs(eventsCollectionRef);
  events.value = querySnapshot.docs.map(doc => {
    const data = doc.data();
    console.log(data); 
    data.id = doc.id;
    data.date = data.date ? new Date(data.date).toLocaleDateString() : 'No Date Provided';
    data.imageUrl = data.imageUrl || '/default-image.jpg'; 
    return data;
  });
});


function navigateToEvent(id) {
  router.push({ name: 'event-detail', params: { id } });
}

</script>




<style scoped lang="scss">
@import '@/styles/global.scss';
@import 'bootstrap-icons/font/bootstrap-icons.css';

.menuContainer {
  display: flex;
  flex-direction: column;
  gap: 15px;
  padding: 10px;

    .menuItem {
      display: flex;
      align-items: center;
      background-color: $secondary-color;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
      border-radius: 10px;
      padding: 10px;
      gap: 10px;
      color: $font-color;
      cursor: pointer;

      &:hover {
        background-color: darken($secondary-color, 5%);
      }

      .imageContainer {
        flex-shrink: 0;
        width: 100px;
        height: 100px;
        border-radius: 10px;
        overflow: hidden;

        .eventImage {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: -webkit-box;
          -webkit-line-clamp: 4;
          -webkit-box-orient: vertical;
          overflow: hidden;
          text-overflow: ellipsis;
        }

      }

      .textContainer {
        flex-grow: 1;
        width: 50%;

        h3 {
          font-size: $medium-font-size;
          color: $font-color;
        }

        .eventDate {
          font-size: $extra-small-font-size;
          color: darken($font-color, 20%);
          display: flex;
          align-items: center;
        }

        p.truncated {
        display: -webkit-box;
        -webkit-line-clamp: 4;
        -webkit-box-orient: vertical;
        overflow: hidden;
        text-overflow: ellipsis;
        font-size: $extra-small-font-size;
      }
    
        .show-more {
          color: $distancetext-color; 
          cursor: pointer;
      }

      .navigateIcon {
        font-size: 35px;
        color: $font-color;
        margin-left: auto;
      }

      .describtionContainer{
        display: flex;
        flex-direction: row;
        gap: 5px;
      }

      .titleandDateContainer{
        display: flex;
        flex-direction: row;
        gap: 15px;
      }
    }
  }
}
</style>
