/*
 * @Descripttion:
 * @Author: Yi Yunwan
 * @Date: 2021-03-22 16:48:59
 * @LastEditors: Yi Yunwan
 * @LastEditTime: 2021-03-22 18:22:38
 */

import { adminStorage } from '@/utils'
import { onBeforeMount, onBeforeUnmount, onMounted, reactive } from 'vue'
import { getPkRankActivityRule } from '../api'
import {
  BaseConfig,
  PkAnchorRewarConfigInfo,
  PkContributionConfig,
  PkIntegralConfigData,
  PkUserRewarConfigInfo,
  RankConfigInfo,
} from '../intrface'

const anchorReward = reactive<Record<string, PkAnchorRewarConfigInfo>>(
  adminStorage.getItem('anchorReward') || {}
)
const userReward = reactive<Record<string, PkUserRewarConfigInfo>>(
  adminStorage.getItem('userReward') || {}
)
const rankConfig = reactive<{ rank?: RankConfigInfo[] }>(
  adminStorage.getItem('rankConfig') || {}
)
const integralConfig = reactive<Partial<PkIntegralConfigData>>(
  adminStorage.getItem('integralConfig') || {}
)
const baseConfig = reactive<Partial<BaseConfig>>(
  adminStorage.getItem('baseConfig') || {}
)
const contributionConfig = reactive<Partial<PkContributionConfig>>(
  adminStorage.getItem('contributionConfig') || {}
)

export function usePkRankSetting(onUpdated?: Function) {
  async function updatePkRankSetting() {
    const { data } = await getPkRankActivityRule()
    Object.assign(anchorReward, JSON.parse(data.anchor_reward || '{}'))
    Object.assign(userReward, JSON.parse(data.user_reward || '{}'))
    Object.assign(rankConfig, JSON.parse(data.rank || '{}'))
    Object.assign(integralConfig, JSON.parse(data.integral || '{}'))
    Object.assign(baseConfig, JSON.parse(data.base || '{}'))
    Object.assign(contributionConfig, JSON.parse(data.contribution || '{}'))
    adminStorage.setItem('anchorReward', anchorReward)
    adminStorage.setItem('userReward', userReward)
    adminStorage.setItem('rankConfig', rankConfig)
    adminStorage.setItem('integralConfig', integralConfig)
    adminStorage.setItem('baseConfig', baseConfig)
    adminStorage.setItem('contributionConfig', contributionConfig)
    onUpdated && onUpdated()
  }

  updatePkRankSetting()

  return {
    anchorReward,
    userReward,
    rankConfig,
    integralConfig,
    baseConfig,
    updatePkRankSetting,
    contributionConfig,
  }
}
