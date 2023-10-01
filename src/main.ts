import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from '@/App.vue'
import router from './router'

window.addEventListener('beforeunload', function (event) {
  event.returnValue = 'Write something'
  console.log('asdad')
})

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
