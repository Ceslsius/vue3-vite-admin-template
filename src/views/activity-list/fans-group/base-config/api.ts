/*
 * @Descripttion:
 * @Author: Zhang Yunzhong
 * @Date: 2021-04-06 17:31:09
 * @LastEditors: Zhang Yunzhong
 * @LastEditTime: 2021-04-12 11:48:23
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
export function setAnchorRewardConfig(
  data: AnchorRewardConfig & {
    act_type: string
  }
): Res {
  return service.post('/backend/anchor/reward/config', data)
}

/**
 * 获取配置
 */
export function getActivityRule(act_type = 'ring_fan'): Res {
  return service.get('/activity/rule', {
    params: {
      act_type,
    },
  })
}
