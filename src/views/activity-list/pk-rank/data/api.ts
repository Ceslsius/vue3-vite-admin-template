/*
 * @Descripttion:
 * @Author: Yi Yunwan
 * @Date: 2021-03-23 14:44:31
 * @LastEditors: Yi Yunwan
 * @LastEditTime: 2021-03-26 18:25:01
 */

import { service } from '@/utils/http'

export function getIntegralRankRecord(
  params: any
): ListRes<IntegralRankRecordInfo> {
  return service.get('/backend/pk/integral/rank/list', {
    params,
  })
}

export function getIntegralRankInfo(params: any): ListRes<any> {
  return service.get('/backend/pk/integral/record/list', {
    params,
  })
}

export function exportIntegralRankInfo(params: any) {
  return service.get('/backend/pk/integral/record/export', {
    params,
    responseType: 'blob',
  })
}

export function getContributionRankList(
  params: any
): ListRes<ContributionRankInfo> {
  return service.get('/backend/pk/user/contribution/rank/list', {
    params,
  })
}

/**
 * 用户积分明细
 * @param params
 * @returns
 */
export function getContributionRankInfo(
  params: any
): ListRes<IntegralRankRecordInfo> {
  return service.get('/backend/pk/user/contribution/record/list', {
    params,
  })
}

export function exportContributionRankInfo(params: any) {
  return service.get('/backend/pk/integral/record/export', {
    params,
    responseType: 'blob',
  })
}

export function exportIntegralRank(params: any) {
  return service.get('/backend/pk/integral/rank/export', {
    params,
    responseType: 'blob',
  })
}

export function exportUserContributionRank(params: any) {
  return service.get('/backend/pk/user/contribution/rank/export', {
    params,
    responseType: 'blob',
  })
}
export function updateIntegral(data: { score: number; liveuid?: number }): Res {
  return service.post('/backend/pk/integral/update', data)
}
