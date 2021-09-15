import { createRouter, createWebHistory } from 'vue-router'
import Check from '@/pages/Check.vue'
import Rank from '@/pages/Rank.vue'
import Search from '@/pages/Search.vue'
import History from '@/pages/History.vue'

const routes = [
  {
    path: '/',
    name: 'index',
    component: Check,
  },
  {
    path: '/rank',
    name: 'rank',
    component: Rank,
  },
  {
    path: '/search',
    name: 'search',
    component: Search,
  },
  {
    path: '/history',
    name: 'history',
    component: History,
  },
]

const router = createRouter({
  routes,
  history: createWebHistory(),
})

export default router
