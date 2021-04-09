/*
 * @Descripttion:
 * @Author: Yi Yunwan
 * @Date: 2021-04-08 10:53:40
 * @LastEditors: Yi Yunwan
 * @LastEditTime: 2021-04-09 11:40:10
 */

import { service } from '@/utils/http'

export function getFanScoreList(
  params: BasePageParams & BaseTableSearchParams
): ListRes<FanScoreInfo> {
  return service.get('/ring/fan/score/list', {
    params,
  })
}

export function exportFanScoreList(params: BaseTableSearchParams) {
  return service.get('/ring/fan/score/export', {
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
  return service.get('/ring/fan/gift/list', {
    params,
  })
}

/**
 * /ring/fan/gift/export
 */
export function exportGiftList(
  params: BaseTableSearchParams & {
    code: string
    uid: number
  }
) {
  return service.get('/ring/fan/gift/export', {
    params,
    responseType: 'blob',
  })
}

export function getTaskList(
  params: BasePageParams & BaseTableSearchParams
): ListRes<TaskListInfo> {
  return service.get('/ring/fan/task/list', {
    params,
  })
}

export function exportTaskList(params: BaseTableSearchParams) {
  return service.get('/ring/fan/task/export', {
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
  return service.get('/ring/fan/fans/list', { params })
}

export function exportFansList(
  params: BaseTableSearchParams & {
    code: string
    uid: string
  }
): ListRes<TaskListInfo> {
  return service.get('/ring/fan/fans/export', {
    params,
    responseType: 'blob',
  })
}
