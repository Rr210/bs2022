import { createRouter, createWebHashHistory } from 'vue-router'
// createWebHashHistory  // createWebHistory
// import $cookie from '@/utils/serct/cookierule.js'
const routes = [
  {
    path: '/',
    component: () => import('@/views/Tabbar.vue'),
    children: [
      {
        path: '/',
        name: 'home',
        component: () => import('@/views/home/Home.vue')
      },
      {
        path: '/main',
        name: 'main',
        component: () => import('@/views/main/Mains.vue')
      },
      {
        path: '/history',
        name: 'history',
        component: () => import('@/views/history/History.vue')
      },
      {
        path: '/mine',
        name: 'mine',
        component: () => import('@/views/mine/Mine.vue')
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/Login.vue')
  },
  {
    path: '/auth',
    name: 'auth',
    component: () => import('@/views/login/components/Auth.vue')
  }
]
const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes
})

// router.beforeEach((to, from, next) => {
//   if (to.path === '/login') return next()
//   const token = localStorage.getItem('token')
//   if (!token) return next('/login')
//   // eslint-disable-next-line camelcase
//   const { email: e_id, username: u_id } = JSON.parse(token)
//   const e = $cookie.getCookie('e_id')
//   const u = $cookie.getCookie('u_id')
//   // console.log(!token || e_id !== e || u_id !== u);
//   // eslint-disable-next-line camelcase
//   if (!token || e_id !== e || u_id !== u) return next('/login')
//   next()
// })
export default router
