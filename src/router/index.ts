import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Check from '@/pages/Check.vue'
import Rank from '@/pages/Rank.vue'
import QA from '@/pages/QA.vue'
import { useFavicon, useTitle } from '@vueuse/core'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'index',
    component: Check,
    meta: {
      name: '枝网查重',
    },
  },
  {
    path: '/rank',
    name: 'rank',
    component: Rank,
    meta: {
      name: '枝江作文展',
    },
  },
  {
    path: '/qa',
    name: 'qa',
    component: QA,
    meta: {
      name: '阿草的太极教室',
    },
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

router.beforeEach((to) => {
  if (to.meta.name && typeof to.meta.name == 'string') useTitle(to.meta.name)
  if (to.name == 'qa') {
    useFavicon('/assets/images/cao.jpg')
  } else {
    useFavicon('/favicon.svg')
  }
})

export default router
