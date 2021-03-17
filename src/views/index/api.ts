/*
 * @Descripttion:
 * @Author: Yi Yunwan
 * @Date: 2021-03-15 12:29:53
 * @LastEditors: Yi Yunwan
 * @LastEditTime: 2021-03-16 17:38:47
 */

import { service } from '@/utils/http'
import type { ActivityAddData, ActivityInfo } from './interface'

/**
 * 活动添加
 */
export function addActivity(data: ActivityAddData): Res {
  return service.post('/backend/activity/add', data)
}

/**
 * 活动列表
 */
export function getActivityList(params: any): ListRes<ActivityInfo> {
  return service.get('/backend/activity/list', {
    params,
  })
}
