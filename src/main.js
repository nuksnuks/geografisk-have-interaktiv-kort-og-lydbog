// src/main.js
import './assets/main.css';
import '@/assets/images/geografiskhave_hvid_logo.svg';

import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router';


const app = createApp(App);
app.use(createPinia());
app.use(router);
app.mount('#app');
