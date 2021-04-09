/*
 * @Descripttion:
 * @Author: Yi Yunwan
 * @Date: 2021-04-06 17:31:09
 * @LastEditors: Yi Yunwan
 * @LastEditTime: 2021-04-07 15:14:26
 */

import { service } from '@/utils/http'
import type { AnchorRewardConfig, BaseConfigData } from './inerface'

/**
 * 基本涨粉配置
 */
export function setBaseConfig(data: BaseConfigData): Res {
  return service.post('/backend/base/config', data)
}

/**
 * 主播排行奖励配置
 */
export function setAnchorRewardConfig(data: AnchorRewardConfig): Res {
  return service.post('/backend/anchor/reward/config', data)
}
