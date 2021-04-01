/*
 * @Descripttion:
 * @Author: Yi Yunwan
 * @Date: 2021-03-24 17:00:35
 * @LastEditors: Yi Yunwan
 * @LastEditTime: 2021-04-01 17:37:39
 */

import { numberCheck } from '@/utils/check'
import { computed, reactive } from 'vue'
import {
  PkAnchorRewarConfig,
  PkAnchorRewarConfigInfo,
  PkUserRewarConfig,
  PkUserRewarConfigInfo,
} from '../intrface'

interface BaseTableFormInfo<T extends String, M> {
  label: string
  lebelKey: string
  name: string
  type: T
  count: M
  time?: string | number
}

export type AnchorRewarTableFormInfo =
  | BaseTableFormInfo<
      'avatar',
      {
        url: string
        name?: string
        time?: number
      }
    >
  | BaseTableFormInfo<'live_label', string>
  | BaseTableFormInfo<'coin', number | undefined>

export function useAnchorRewarTableForm(config: PkAnchorRewarConfig) {
  const anchorRewarTableForm = computed<AnchorRewarTableFormInfo[]>(() => {
    return [
      {
        label: '1',
        lebelKey: 'first',
        name: '头像框',
        type: 'avatar',
        count: config.first.avatar,
        time: config.first.avatar?.time,
      },
      {
        label: '1',
        lebelKey: 'first',
        name: '直播封面标签',
        type: 'live_label',
        count: config.first.live_label?.url,
        time: config.first.live_label?.time,
      },
      {
        label: '1',
        lebelKey: 'first',
        name: 'T钻',
        type: 'coin',
        count: config.first.coin,
        time: '-',
      },
      {
        label: '2',
        lebelKey: 'second',
        name: '头像框',
        type: 'avatar',
        count: config.second.avatar,
        time: config.second.avatar?.time,
      },
      {
        label: '2',
        lebelKey: 'second',
        name: '直播封面标签',
        type: 'live_label',
        count: config.second.live_label?.url,
        time: config.second.live_label?.time,
      },
      {
        label: '2',
        lebelKey: 'second',
        type: 'coin',
        name: 'T钻',
        count: config.second.coin,
        time: '-',
      },
      {
        label: '3',
        lebelKey: 'three',
        name: '头像框',
        type: 'avatar',
        count: config.three.avatar,
        time: config.three.avatar?.time,
      },
      {
        label: '3',
        lebelKey: 'three',
        type: 'live_label',
        name: '直播封面标签',
        count: config.three.live_label?.url,
        time: config.three.live_label?.time,
      },
      {
        label: '3',
        lebelKey: 'three',
        type: 'coin',
        name: 'T钻',
        count: config.three.coin,
        time: '-',
      },
      {
        label: '4~10',
        lebelKey: 'four_to_ten',
        type: 'avatar',
        name: '头像框',
        count: config.four_to_ten.avatar,
        time: config.four_to_ten.avatar?.time,
      },
      {
        label: '4~10',
        lebelKey: 'four_to_ten',
        type: 'coin',
        name: 'T钻',
        count: config.four_to_ten.coin,
        time: '-',
      },
    ]
  })

  return { anchorRewarTableForm }
}

export type UserRewarTableFormInfo =
  | BaseTableFormInfo<'vip', number | undefined>
  | BaseTableFormInfo<
      'avatar',
      { url: string; time?: number | undefined; name: string }
    >
  | BaseTableFormInfo<
      'gift',
      {
        id?: number | undefined
        time?: number | undefined
        giftname?: string | undefined
        count?: number | undefined
        url?: string | undefined
      }
    >

export function useUserRewardTableForm(config: PkUserRewarConfig) {
  const userRewarTableForm = computed<UserRewarTableFormInfo[]>(() => {
    return [
      {
        label: '1',
        lebelKey: 'first',
        type: 'vip',
        name: '会员',
        count: config.first.vip,
        time: '',
      },
      {
        label: '1',
        lebelKey: 'second',
        type: 'avatar',
        name: '头像框',
        count: config.first.avatar,
        time: config.first.avatar?.time,
      },
      {
        label: '1',
        lebelKey: 'second',
        type: 'gift',
        name: '礼物',
        count: config.first.gift,
        time: config.first.gift?.time,
      },
      {
        label: '2',
        lebelKey: 'second',
        type: 'vip',
        name: '会员',
        count: config.second.vip,
        time: '',
      },
      {
        label: '2',
        lebelKey: 'second',
        type: 'gift',
        name: '礼物',
        count: config.second.gift,
        time: config.second.gift?.time,
      },
      {
        label: '3',
        lebelKey: 'three',
        type: 'vip',
        name: '会员',
        count: config.three.vip,
        time: '',
      },
      {
        label: '3',
        lebelKey: 'four_to_ten',
        type: 'gift',
        name: '礼物',
        count: config.three.gift,
        time: config.three.gift?.time,
      },
      {
        label: '4~10',
        lebelKey: 'four_to_ten',
        type: 'vip',
        name: '会员',
        count: config.four_to_ten.vip,
        time: '',
      },
      {
        label: '4~10',
        lebelKey: 'four_to_ten',
        type: 'gift',
        name: '礼物',
        count: config.four_to_ten.gift,
        time: config.four_to_ten.gift?.time,
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

export const useTimeRules = [
  {
    required: true,
    message: '不能为空',
    trigger: 'blur',
  },
  {
    validator: numberCheck,
    trigger: 'blur',
    min: 1,
    max: 1000,
    isInt: true,
  },
]
