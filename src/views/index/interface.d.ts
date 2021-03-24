/*
 * @Descripttion:
 * @Author: Yi Yunwan
 * @Date: 2021-03-15 14:27:19
 * @LastEditors: Yi Yunwan
 * @LastEditTime: 2021-03-24 09:46:16
 */
export interface ActivityAddData {
  /**
   * 活动名称
   */
  name: string
  /**
   * 活动名称
   */
  act_type: string
  /**
   * 	活动编号
   */
  code: string
  /**
   * 	活动编号
   */
  start_time: Date | string
  /**
   * 结束时间
   */
  end_time: string
}

interface ActivityInfo {
  id: string
  name: string
  code: string
  act_type: string
  start_time: string
  end_time: string
}
