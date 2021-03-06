import Vue from 'vue'
import VueRouter from 'vue-router'
import Userinfo from '../views/My/userinfo.vue'

// import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    component: () => import('@/views/login')
  },
  {
    path: '/search',
    component: () => import('@/views/Search')
  },
  {
    path: '/userinfo',
    component: Userinfo
  },
  {
    path: '/Dq/:id',
    component: () => import('@/views/DQ')
  },
  {
    path: '/layout',
    component: () => import('@/views/Layout'),
    children: [
      {
        path: 'home',
        component: () => import('@/views/Home')
      },
      {
        path: 'my',
        component: () => import('@/views/My')
      },
      {
        path: 'qa',
        component: () => import('@/views/QA')
      },
      {
        path: 'video',
        component: () => import('@/views/Video')
      }
    ]
  },
  {
    path: '/',
    redirect: '/layout/home'
  }
]

const router = new VueRouter({
  routes
})

export default router
