/*
 * @Descripttion:
 * @Author: Yi Yunwan
 * @Date: 2021-04-08 10:53:40
 * @LastEditors: Yi Yunwan
 * @LastEditTime: 2021-04-14 12:13:31
 */

import { service } from '@/utils/http'

export function getFanScoreList(
  params: BasePageParams & BaseTableSearchParams
): ListRes<FanScoreInfo> {
  return service.get('/backend/ring/fan/score/list', {
    params,
  })
}

export function exportFanScoreList(params: BaseTableSearchParams) {
  return service.get('/backend/ring/fan/score/export', {
    params,
    responseType: 'blob',
  })
}

/**
 * 榜单礼物明细列表
 */
export function getGiftList(
  params: BasePageParams &
    BaseTableSearchParams & {
      code: string
      uid: number
    }
): ListRes {
  return service.get('/backend/ring/fan/gift/list', {
    params,
  })
}

export function exportGiftList(
  params: BaseTableSearchParams & {
    code: string
    uid: number
  }
) {
  return service.get('/backend/ring/fan/gift/export', {
    params,
    responseType: 'blob',
  })
}

export function getTaskList(
  params: BasePageParams & BaseTableSearchParams
): ListRes<TaskListInfo> {
  return service.get('/backend/ring/fan/task/list', {
    params,
  })
}

export function exportTaskList(params: BaseTableSearchParams) {
  return service.get('/backend/ring/fan/task/export', {
    params,
    responseType: 'blob',
  })
}

export function getFansList(
  params: BasePageParams &
    BaseTableSearchParams & {
      code: string
      uid: string
    }
): ListRes<TaskListInfo> {
  return service.get('/backend/ring/fan/fans/list', { params })
}

export function exportFansList(
  params: BaseTableSearchParams & {
    code: string
    uid: string
  }
): ListRes<TaskListInfo> {
  return service.get('/backend/ring/fan/fans/export', {
    params,
    responseType: 'blob',
  })
}
