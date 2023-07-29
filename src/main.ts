import './assets/style.css'
import '@/services/cookie'
import '@/services/axios'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import { plugin, defaultConfig } from '@formkit/vue'

const app = createApp(App)
const pinia = createPinia()

app.use(router).use(pinia).use(plugin, defaultConfig)

app.mount('#app')
