/*
 * @Author: Harry
 * @Date: 2021-12-26 15:16:20
 * @LastEditors: harry
 * @Github: https://github.com/rr210
 * @LastEditTime: 2022-05-03 16:40:46
 * @FilePath: \vant-u\src\router\index.js
 */
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
        meta: {
          keepAlive: true
        },
        component: () => import('@/views/home/Home.vue')
      },
      {
        path: '/main',
        name: 'main',
        meta: {
          keepAlive: true
        },
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
    path: '/detail/:pestname',
    name: 'detail',
    component: () => import('@/views/detail/DetailPest.vue')
  },
  {
    path: '/hisdetail/:pestname',
    name: 'hisdetail',
    component: () => import('@/views/history/components/HisDetail.vue')
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
