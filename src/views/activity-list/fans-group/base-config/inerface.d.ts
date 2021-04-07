/*
 * @Descripttion:
 * @Author: Yi Yunwan
 * @Date: 2021-04-06 17:32:50
 * @LastEditors: Yi Yunwan
 * @LastEditTime: 2021-04-07 12:12:15
 */
interface BaseConfigData {
  fan_mission: FanMissionInfo[]
}
interface FanMissionInfo {
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
