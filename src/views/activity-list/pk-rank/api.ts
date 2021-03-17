/*
 * @Descripttion:
 * @Author: Yi Yunwan
 * @Date: 2021-03-15 15:26:27
 * @LastEditors: Yi Yunwan
 * @LastEditTime: 2021-03-15 20:46:06
 */

import { service } from '@/utils/http'
import {
  PkAnchorRewarConfig,
  PkBaseCofigData,
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
export function setPkAnchorRewarConfig(data: PkAnchorRewarConfig) {
  return service.post('/backend/pk/anchor/reward/config', data)
}
export function setPkUserRewarConfig(data: PkUserRewarConfig) {
  return service.post('/backend/pk/user/reward/config', data)
}
