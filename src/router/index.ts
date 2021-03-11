/*
 * @Descripttion:
 * @Author: Yi Yunwan
 * @Date: 2021-03-10 18:11:11
 * @LastEditors: Yi Yunwan
 * @LastEditTime: 2021-03-11 17:54:30
 */
import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import login from '@/views/login/index.vue'
import Layout from '@/layout/index.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/index/index.vue'),
        name: 'Dashboard',
        meta: { title: '首页', icon: 'dashboard', affix: true },
      },
    ],
  },
  {
    path: '/test1',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/test1/index.vue'),
        name: 'test1',
        meta: { title: '测试', icon: 'dashboard', affix: true },
      },
    ],
  },
  {
    path: '/login',
    component: login,
  },
]

export const router = createRouter({
  routes,
  history: createWebHashHistory(),
})
