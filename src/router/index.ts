import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Check from '@/pages/Check.vue'
import Rank from '@/pages/Rank.vue'
import Search from '@/pages/Search.vue'
import History from '@/pages/History.vue'

const routes: RouteRecordRaw[] = [
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
  {
    path: '/rank:pathMatch(.*)',
    name: 're-rank',
    redirect: '/rank',
  },
  {
    path: '/:pathMatch(.*)',
    name: 'not-found',
    redirect: '/',
  },
]

const router = createRouter({
  routes,
  history: createWebHistory(),
})

router.afterEach(() => {
  scrollTo(0, 0)
})

export default router
