/*
 * @Descripttion:
 * @Author: Yi Yunwan
 * @Date: 2021-03-24 17:00:35
 * @LastEditors: Yi Yunwan
 * @LastEditTime: 2021-03-26 18:22:02
 */

import { computed, reactive } from 'vue'
import {
  PkAnchorRewarConfig,
  PkAnchorRewarConfigInfo,
  PkUserRewarConfig,
  PkUserRewarConfigInfo,
} from '../intrface'

export function useAnchorRewarTableForm(config: PkAnchorRewarConfig) {
  const anchorRewarTableForm = computed(() => {
    return [
      {
        label: '1',
        lebelKey: 'first',
        name: '头像框',
        count: config.first.avatar.url,
        time: config.first.avatar.time,
      },
      {
        label: '1',
        name: '直播封面标签',
        count: config.first.live_label.url,
        time: config.first.live_label.time,
      },
      {
        label: '1',
        name: 'T钻',
        count: config.first.coin,
        time: '-',
      },
      {
        label: '2',
        lebelKey: 'first',
        name: '头像框',
        count: config.second.avatar.url,
        time: config.second.avatar.time,
      },
      {
        label: '2',
        name: '直播封面标签',
        count: config.second.live_label.url,
        time: config.second.live_label.time,
      },
      {
        label: '2',
        name: 'T钻',
        count: config.second.coin,
        time: '-',
      },
      {
        label: '3',
        lebelKey: 'first',
        name: '头像框',
        count: config.three.avatar.url,
        time: config.three.avatar.time,
      },
      {
        label: '3',
        name: '直播封面标签',
        count: config.three.live_label.url,
        time: config.three.live_label.time,
      },
      {
        label: '3',
        name: 'T钻',
        count: config.three.coin,
        time: '-',
      },
      {
        label: '4~10',
        name: '头像框',
        count: config.four_to_ten.avatar.url,
        time: config.four_to_ten.avatar.time,
      },
      {
        label: '4~10',
        name: 'T钻',
        count: config.four_to_ten.avatar.url,
        time: '-',
      },
    ]
  })

  return { anchorRewarTableForm }
}
export function useUserRewardTableForm(config: PkUserRewarConfig) {
  const userRewarTableForm = computed(() => {
    return [
      {
        label: '1',
        lebelKey: 'first',
        name: '会员',
        count: config.first.vip,
        time: '',
      },
      {
        label: '1',
        lebelKey: 'second',
        name: '头像框',
        count: config.first.avatar?.url,
        time: config.first.avatar?.time,
      },
      {
        label: '1',
        lebelKey: 'second',
        name: '礼物',
        count: config.first.gift,
        time: config.first.gift?.time,
      },
      {
        label: '2',
        lebelKey: 'second',
        name: '会员',
        count: config.second.vip,
        time: '',
      },
      {
        label: '2',
        lebelKey: 'second',
        name: '礼物',
        count: config.second.gift,
        time: config.second.gift?.time,
      },
      {
        label: '3',
        lebelKey: 'three',
        name: '会员',
        count: config.three.vip,
        time: '',
      },
      {
        label: '3',
        lebelKey: 'four_to_ten',
        name: '礼物',
        count: config.three.gift,
        time: config.three.gift?.time,
      },
      {
        label: '4~10',
        lebelKey: 'four_to_ten',
        name: '会员',
        count: config.four_to_ten.vip,
        time: '',
      },
      {
        label: '4~10',
        lebelKey: 'four_to_ten',
        name: '礼物',
        count: config.four_to_ten.gift,
        time: config.four_to_ten.gift.time,
      },
    ]
  })

  return { userRewarTableForm }
}
export const labelMap: Record<string, string> = {
  first: '第一名',
  second: '第二名',
  three: '第三名',
  four_to_ten: '第四～十名',
}
export const labelKeys = Object.keys(labelMap)

export function useConfig<T>(base: T) {
  const config = reactive<Record<string, T>>({})
  labelKeys.forEach((item) => {
    config[item] = JSON.parse(JSON.stringify(base)) as any
  })
  return {
    config,
  }
}

export function usePkAnchorRewarConfig(
  config: Partial<PkAnchorRewarConfigInfo>
) {
  const { config: pkAnchorRewarConfig } = useConfig<PkAnchorRewarConfigInfo>({
    avatar: {
      url: '',
    },
    live_label: {
      url: '',
    },
  })
  Object.keys(config).length && Object.assign(pkAnchorRewarConfig, config)

  return {
    pkAnchorRewarConfig,
  }
}

export function usePkUserRewarConfig(config: Partial<PkUserRewarConfigInfo>) {
  const { config: pkUserRewarConfig } = useConfig<PkUserRewarConfigInfo>({
    avatar: {
      url: '',
      name: '',
    },
    gift: {},
  })
  Object.keys(config).length && Object.assign(pkUserRewarConfig, config)

  return {
    pkUserRewarConfig,
  }
}
