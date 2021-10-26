import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Check from '@/pages/Check.vue'
import Rank from '@/pages/Rank.vue'
import QA from '@/pages/QA.vue'

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
    path: '/qa',
    name: 'qa',
    component: QA,
  },
  {
    path: '/rank:pathMatch(.*)',
    name: 're-rank',
    redirect: '/rank',
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
