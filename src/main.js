import h337 from 'heatmap.js';
import { fromEvent, map, mergeWith } from 'rxjs';
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import Vue3Marquee from 'vue3-marquee'
import VueGtag from 'vue-gtag'

import App from './App.vue'
import router from './router'

import './assets/main.css'


const app = createApp(App)
app.use(createPinia())
app.config.globalProperties.window = window
app.use(Vue3Marquee)
app.use(router)
app.use(VueGtag, {
  config: { id: import.meta.env.VITE_GA_MEASUREMENT_ID },
  enabled: false,
}, router)
app.mount('#app')
