/*
 * @Descripttion:
 * @Author: Zhang Yunzhong
 * @Date: 2021-03-15 15:27:44
 * @LastEditors: Zhang Yunzhong
 * @LastEditTime: 2021-04-06 14:11:40
 */
export interface PkBaseCofigData {
  /**
   * 有效值
   */
  effective_value?: number
  /**
   * 首胜
   */
  first_win?: number
  winning_streak: {
    session: number
    integral: number
  }[]
  single_game: {
    pk_value: number
    integral: number
  }[]
}

export interface PkIntegralConfigData {
  same_win: number
  same_fail: number
  same_equal: number
  high_win: number
  high_fail: number
  high_equal: number
  low_win: number
  low_fail: number
  low_equal: number
}

export interface PkRankConfigData {
  rank: RankConfigInfo[]
}

export interface RankConfigInfo {
  name: string
  under?: number
  upper?: number
  url: string
}

export interface PkAnchorRewarConfig {
  first: PkAnchorRewarConfigInfo
  second: PkAnchorRewarConfigInfo
  three: PkAnchorRewarConfigInfo
  four_to_ten: PkAnchorRewarConfigInfo
}

export interface PkAnchorRewarConfigInfo {
  avatar: {
    url: string
    name?: string
    time?: number
  }
  live_label: {
    url: string
    time?: number
  }
  coin?: number
}

export interface PkUserRewarConfig {
  first: PkUserRewarConfigInfo
  second: PkUserRewarConfigInfo
  three: PkUserRewarConfigInfo
  four_to_ten: PkUserRewarConfigInfo
}

export interface PkUserRewarConfigInfo {
  vip?: number
  avatar: {
    url: string
    time?: number
    name: string
  }
  gift: {
    id?: number
    time?: number
    giftname?: string
    count?: number
    url?: string
  }
}

export interface PkContributionConfig {
  regular_ratio: number
  special_gift: SpecialGiftInfo[]
}

export interface SpecialGiftInfo {
  key?: any
  giftname?: string
  giftid: number
  url?: string
  integral: number
  mark?: number
}

export interface BaseConfig {
  /**
   * 有效值
   */
  effective_value: number
  /**
   * 首胜
   */
  first_win: number
  winning_streak: {
    session: number
    integral: number
  }[]
  single_game: {
    pk_value: number
    integral: number
  }[]
}
