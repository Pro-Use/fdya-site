import h337 from 'heatmap.js';
import { fromEvent, map, mergeWith } from 'rxjs';
import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import './index.css'

const app = createApp(App)
app.config.globalProperties.window = window
app.use(createPinia())
app.use(router)

app.mount('#app')
