import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from '@/App.vue'
import router from './router'

window.addEventListener('beforeunload', (event) => {
  event.preventDefault()
  event.returnValue = 'Si sales abandonaras la partida'
  alert('hello')
})

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
