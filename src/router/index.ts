import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import GameView from '@/views/GameView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/game',
      name: 'game',
      component: GameView,
      beforeEnter: (to, from) => {
        if (!import.meta.env.DEV) {
          window.addEventListener('beforeunload', (event) => {
            event.returnValue = 'Si sales perderas la partida'
          })
        }
      }
    }
  ]
})

export default router
