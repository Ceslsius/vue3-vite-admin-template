/*
 * @Descripttion:
 * @Author: Yi Yunwan
 * @Date: 2021-03-15 16:04:41
 * @LastEditors: Yi Yunwan
 * @LastEditTime: 2021-03-30 18:23:29
 */

interface GetActivityConfigParams {
  /**
   * 活动类型
   * - pk_rank PK排行榜PK排行榜
   */
  act_type: string
  /**
   * 类型值，
   * - 基本参数：base
   * - 积分参数：integral
   * - 段位配置：rank，
   * - 贡献积分参数：contribution
   * - 主播奖励：anchor_reward，
   * - 用户奖励：user_reward
   */
  type_value: string
}

interface GiftInfo {
  id: number
  giftname: string
  url: string
  /**
   * 3为幸运礼物
   */
  mark: number
}
