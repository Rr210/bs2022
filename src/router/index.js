import { createRouter, createWebHashHistory } from 'vue-router'
// createWebHashHistory  // createWebHistory
const routes = [
  {
    path: '/',
    component: () => import('@/views/Home.vue')
  }
]
const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes
})

export default router
