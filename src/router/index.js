import { createRouter, createWebHashHistory } from 'vue-router'
// createWebHashHistory  // createWebHistory
const routes = [
  {
    path: '/',
    component: () => import('@/views/Tabbar.vue'),
    children: [
      {
        path: '/home',
        component: () => import('@/views/home/Home.vue')
      },
      {
        path: '/main',
        component: () => import('@/views/main/Main.vue')
      },
      {
        path: '/history',
        component: () => import('@/views/history/History.vue')
      },
      {
        path: '/mine',
        component: () => import('@/views/mine/Mine.vue')
      }
    ]
  }
]
const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes
})

export default router
