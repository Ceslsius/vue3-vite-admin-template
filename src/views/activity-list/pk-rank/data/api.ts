/*
 * @Descripttion:
 * @Author: Yi Yunwan
 * @Date: 2021-03-23 14:44:31
 * @LastEditors: Yi Yunwan
 * @LastEditTime: 2021-03-23 16:55:18
 */

import { service } from '@/utils/http'

export function getIntegralRankRecord(): ListRes<IntegralRankRecordInfo> {
  return service.get('/backend/pk/integral/rank/list')
}

export function getContributionRankList(): ListRes<IntegralRankRecordInfo> {
  return service.get('/backend/pk/user/contribution/rank/list')
}
