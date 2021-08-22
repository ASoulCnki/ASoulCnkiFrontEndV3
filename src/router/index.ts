import { createRouter, createWebHistory } from 'vue-router'
import Check from '@/pages/Check.vue'

const routes = [
  {
    path: '/',
    name: 'index',
    component: Check
  },
  {
    path: '/rank',
    name: 'rank',
    component: () => import('@/pages/Rank.vue')
  },
]

const router = createRouter({
  routes,
  history: createWebHistory()
})

export default router
