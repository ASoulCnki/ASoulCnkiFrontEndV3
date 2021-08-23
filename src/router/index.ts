import { createRouter, createWebHistory } from 'vue-router'
import Check from '@/pages/Check.vue'
import Rank from '@/pages/Rank.vue'

const routes = [
  {
    path: '/',
    name: 'index',
    component: Check
  },
  {
    path: '/rank',
    name: 'rank',
    component: Rank
  },
]

const router = createRouter({
  routes,
  history: createWebHistory()
})

export default router
