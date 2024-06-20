<template>
    <div>
      <div ref="mapContainer" class="map-container"></div>
    </div>
  </template>
  
  <script setup>
  import 'leaflet/dist/leaflet.css';
  import { ref, onMounted, watch} from 'vue';
  import L from 'leaflet';
  import { useLocationStore } from '@/stores/location';

  import marker from '@/assets/marker.png';
  import polygons from '@/data/polygons.json';

  const props = defineProps({
    selectedArea: {
      type: Object,
      default: null
    },
    areaDistance: {
      type: Number,
      default: null
    }
  });
  
  const emits = defineEmits(['update:areaDistance', 'update:info']);
  
  const mapContainer = ref(null);
  var map = null;
  var currentLocationMarker = null;
  var linesLayer = null;
  
  const locationStore = useLocationStore();
  
  onMounted(() => {
    map = L.map(mapContainer.value, { zoomControl: false}).setView([55.47509029500938, 9.492597226698194], 16);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', 
      {
      attribution: '© OpenStreetMap contributors'
    }).addTo(map);
  
    // Layer for lines
    linesLayer = L.layerGroup().addTo(map);
  
    // Add polygons from polygons.json
    polygons.features.forEach(feature => {
      const coordinates = feature.geometry.coordinates[0].map(coord => [coord[1], coord[0]]);
      const properties = feature.properties;
      const info = properties.info;

      console.log('info', info)
  
      // Function to generate a random color
      function getRandomColor() {
      const letters = '0123456789ABCDEF';
      let color = '#';
      for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }

      return color;
      }

      // Use the random color for each polygon
      const polygon = L.polygon(coordinates, {
        color: getRandomColor(), // Set the stroke color to a random color
        fillColor: getRandomColor(), // Set the fill color to a random color
        fillOpacity: 0.5
      }).addTo(map);
  
      polygon.on('click', () => {
        const distance = locationStore.calculateDistance(locationStore.currentPosition, polygon.getBounds().getCenter());
        emits('update:areaDistance', distance);
        drawLineToArea(polygon.getBounds().getCenter().lat, polygon.getBounds().getCenter().lng);
        // Emit the info data so other components can use it as a prop
        emits('update:info', info);
        // Update the popup content with the distance
        const popupContent = `${info}<br>Distance: ${distance} meters`;
        polygon.bindPopup(popupContent).openPopup();
      });
    });
    var greenIcon = L.icon({
    iconUrl: marker,

    iconSize:     [42, 66], // size of the icon
    shadowSize:   [0, 0], // size of the shadow
    iconAnchor:   [21, 66], // point of the icon which will correspond to marker's location
    shadowAnchor: [4, 62],  // the same for the shadow
    popupAnchor:  [0, -66] // point from which the popup should open relative to the iconAnchor
});
  
    // Locate and mark the user's current location
    map.locate({ setView: true, maxZoom: 16 });
    map.on('locationfound', e => {
      locationStore.updateCurrentPosition(e.latlng);
      if (!currentLocationMarker) {
        currentLocationMarker = L.marker(e.latlng, {icon: greenIcon}).addTo(map);
        currentLocationMarker.bindPopup('Your Current Location').openPopup();
      } else {
        currentLocationMarker.setLatLng(e.latlng);
      }
    });
  
    map.on('locationerror', () => {
      alert('Location access denied. Unable to retrieve your location.');
    });
  
    watch(() => props.areaDistance, (newVal, oldVal) => {
      if (newVal === null && oldVal !== null) {
        // If area distance falls back to "Connecting..."
        locationStore.calculateDistances();
      }
    });
  });
  
  function drawLineToArea(lat, lng) {
    linesLayer.clearLayers();  
    if (currentLocationMarker) {
      L.polyline([
        currentLocationMarker.getLatLng(),
        [lat, lng]
      ], {
        color: 'blue',
        weight: 4,
        dashArray: '10, 10',
        lineCap: 'round'
      }).addTo(linesLayer);
    }
  }
  </script>
  
  <style scoped>
  .map-container {
    height: 370px;
  }
  </style>
  