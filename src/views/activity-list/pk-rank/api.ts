/*
 * @Descripttion:
 * @Author: Zhang Yunzhong
 * @Date: 2021-03-15 15:26:27
 * @LastEditors: Zhang Yunzhong
 * @LastEditTime: 2021-03-19 17:25:28
 */

import { service } from '@/utils/http'
import {
  PkAnchorRewarConfig,
  PkBaseCofigData,
  PkContributionConfig,
  PkIntegralConfigData,
  PkRankConfigData,
  PkUserRewarConfig,
} from './intrface'

export function setPkBaseConfig(data: PkBaseCofigData): Res {
  return service.post('/backend/pk/base/config', data)
}
export function setPkIntegralConfig(data: PkIntegralConfigData): Res {
  return service.post('/backend/pk/integral/config', data)
}
export function setPkRankConfig(data: PkRankConfigData): Res {
  return service.post('/backend/pk/rank/config', data)
}
export function setPkAnchorRewarConfig(data: PkAnchorRewarConfig): Res {
  return service.post('/backend/pk/anchor/reward/config', data)
}
export function setPkUserRewarConfig(data: PkUserRewarConfig): Res {
  return service.post('/backend/pk/user/reward/config', data)
}
export function setPkContributionConfig(data: PkContributionConfig): Res {
  return service.post('/backend/pk/contribution/config', data)
}

export function getPkRankActivityRule(): Res {
  return service.get('/pk/rank/activity/rule')
}
