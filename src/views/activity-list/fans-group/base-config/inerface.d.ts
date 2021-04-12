/*
 * @Descripttion:
 * @Author: Yi Yunwan
 * @Date: 2021-04-06 17:32:50
 * @LastEditors: Yi Yunwan
 * @LastEditTime: 2021-04-12 11:39:32
 */
export interface BaseConfigData {
  fan_mission: FanMissionInfo[]
  act_type: string
}
export interface FanMissionInfo {
  /**
   * 数量
   */
  num?: number
  /**
   * 赠送钻石数，没有默认为0
   */
  coin?: number
  /**
   * 	热度推荐，没有参数都传对应零值
   */
  hot_rec: {
    /**
     * 热度值
     */
    value?: number
    /**
     * 时长
     */
    time?: number
    /**
     * 地址
     */
    url: string
  }
  avatar: {
    /**
     * 地址
     */
    url: string
    /**
     * 名称
     */
    name: string
    /**
     * 时长
     */
    time?: number
  }
}

export type AnchorRewardConfigKey =
  | 'first'
  | 'second'
  | 'three'
  | 'four'
  | 'five'

export type AnchorRewardConfig = Record<
  AnchorRewardConfigKey,
  AnchorRewardConfigInfo
>

export interface AnchorRewardConfigInfo {
  coin?: number
  live_label: {
    url: string
    time?: number
    name: string
  }
}
