/*
 * @Descripttion:
 * @Author: Yi Yunwan
 * @Date: 2021-03-10 18:11:11
 * @LastEditors: Yi Yunwan
 * @LastEditTime: 2021-03-29 15:54:53
 */
import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import Login from '@/views/login/index.vue'
import Layout from '@/layout/index.vue'
import { adminStorage } from '@/utils'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: Layout,
    redirect: '/record',
    children: [
      // {
      //   path: 'dashboard',
      //   component: () => import('@/views/index/index.vue'),
      //   name: 'Dashboard',
      //   meta: { title: '添加活动', affix: true },
      // },
      {
        path: 'record',
        component: () => import('@/views/index/record.vue'),
        name: 'record',
        meta: {
          title: '活动列表',
          icon: 'el-icon-s-data',
          affix: true,
        },
      },
    ],
    meta: { title: '活动管理', affix: true },
  },
  {
    path: '/activity-list',
    component: Layout,
    redirect: '/activity-list/pk-rank',
    children: [
      {
        path: 'pk-rank',
        component: () => import('@/views/activity-list/pk-rank/index.vue'),
        name: 'test1',
        meta: {
          title: 'PK排位赛',
          affix: true,
        },
        redirect: '/activity-list/pk-rank/parameter-config',
        children: [
          {
            path: 'parameter-config',
            component: () =>
              import(
                '@/views/activity-list/pk-rank/parameter-config/index.vue'
              ),
            name: 'parameter-config',
            meta: {
              title: '参数配置',
              icon: 'el-icon-s-tools',
              affix: true,
            },
          },
          {
            path: 'reward-config',
            component: () =>
              import('@/views/activity-list/pk-rank/reward-config/index.vue'),
            name: 'reward-config',
            meta: {
              title: '奖励配置',
              icon: 'el-icon-s-tools',
              affix: true,
            },
          },
          {
            path: 'data',
            component: () =>
              import('@/views/activity-list/pk-rank/data/index.vue'),
            name: 'pk-rank-data',
            meta: {
              title: '活动数据',
              icon: 'el-icon-s-data',
              affix: true,
            },
          },
        ],
      },
    ],
    meta: {
      title: '活动配置',
      affix: true,
    },
  },
  {
    path: '/login',
    component: Login,
    meta: {
      auth: false,
      hidden: true,
    },
  },
]

export const router = createRouter({
  routes,
  history: createWebHashHistory(),
})

router.beforeEach((to, from, next) => {
  if (to.meta?.auth === false) {
    next()
    return
  } else if (!adminStorage.getItem('token')) {
    next({
      path: '/login',
      query: {
        redirect: to.fullPath,
      },
    })
    return
  }
  next()
})
