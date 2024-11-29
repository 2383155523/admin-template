import login from '@/layouts/login.vue'
import type { RouteRecordRaw } from 'vue-router'

const Layout = () => import('@/layouts/index.vue')

//常量路由
const constantRoutes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/dashboard',
  },
  {
    path: '/login',
    name: 'login',
    component: login,
    meta: {
      title: '登录',
    },
  },
  {
    path: '/test2',
    component: Layout,
    meta: {
      title: '测试2',
    },
    children: [
      {
        path: 'index',
        name: 'test2-index',
        component: () => import('@pages/test2/index.vue'),
        meta: {
          title: '测试2',
        },
      },
    ],
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/dashboard',
  },
]

export default constantRoutes
