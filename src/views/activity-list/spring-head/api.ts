/*
 * @Descripttion: name
 * @Author: weilkss
 * @Date: 2021-04-15 15:37:30
 * @LastEditors: Zhang Yunzhong
 * @LastEditTime: 2021-04-21 16:34:44
 */
import { service } from '@/utils/http'

/**
 * 小时榜单记录列表
 */
export function getHourRankList(
  params: BasePageParams & BaseTableSearchParams
): ListRes<HourRankListInfo> {
  return service.get('/backend/grab/headlines/hour/rank/list', {
    params,
  })
}

/**
 * 小时榜单记录导出
 */
export function exportHourRankList(params: BaseTableSearchParams) {
  return service.get('/backend/grab/headlines/hour/rank/export', {
    params,
    responseType: 'blob',
  })
}

/**
 * 星星榜单记录列表
 */
export function getHeadlinesRankList(
  params: BasePageParams & BaseTableSearchParams
): ListRes<HeadlinesRankListInfo> {
  return service.get('/backend/grab/headlines/rank/list', {
    params,
  })
}

/**
 * 星星榜单记录列表
 */
export function exportHeadlinesRankList(params: BaseTableSearchParams) {
  return service.get('/backend/grab/headlines/rank/export', {
    params,
    responseType: 'blob',
  })
}

export function getStarRecordList(
  params: BasePageParams &
    BaseTableSearchParams & {
      code: string
      liveuid: string
    }
): ListRes {
  return service.get('/backend/grab/headlines/star/record/list', {
    params,
  })
}

export function exportStarRecordList(
  params: BaseTableSearchParams & {
    code: string
    liveuid: string
  }
) {
  return service.get('/backend/grab/headlines/star/record/export', {
    params,
    responseType: 'blob',
  })
}
