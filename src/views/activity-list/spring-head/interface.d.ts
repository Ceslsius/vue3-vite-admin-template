/*
 * @Descripttion: name
 * @Author: weilkss
 * @Date: 2021-04-15 15:27:30
 * @LastEditors: Yi Yunwan
 * @LastEditTime: 2021-04-21 12:18:01
 */
interface HourRankListInfo {
  /**
   * 	榜单开始时间
   */
  rank_time: string
  /**
   * 	榜单开始时间
   */
  liveuid: string
  /**
   * 	NO.1收入
   */
  income: string
  /**
   * 	是否发放星星
   * - 0 否
   * - 1 是
   */
  is_send: string
}

interface HeadlinesRankListInfo {
  id: string
  liveuid: string
  user_number: string
  username: string
  anchor_type: string
  total_star: string
  get_star_time: string
  code: string
}
