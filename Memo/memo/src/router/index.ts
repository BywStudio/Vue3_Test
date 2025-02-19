import { createRouter, createWebHistory } from 'vue-router'

// 导入 Home 组件
import HomeView from '@/views/Home.vue'
// 创建路由对象
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: HomeView,
      redirect: '/index',
      children: [
        {
          path: '/index',
          component: () => import('@/views/index/index.vue'),
        },
      ],
    },
    {
      path: '/login',
      name: 'login',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      // 导入 Login 组件
      component: () => import('@/views/Login.vue'),
    },
  ],
})

// 导出路由对象
export default router
