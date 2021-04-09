/*
 * @Descripttion:
 * @Author: Yi Yunwan
 * @Date: 2021-04-09 11:08:42
 * @LastEditors: Yi Yunwan
 * @LastEditTime: 2021-04-09 11:28:29
 */
interface FanScoreInfo {
  id: number
  liveuid: number
  username: string
  user_number: string
  anchor_type: number
  total_num: string
  total_money: number
  uid: number
  uid_user_number: string
  uid_username: string
  code: string
}

interface TaskListInfo {
  id: string
  code: string
  liveuid: string
  user_number: string
  username: string
  anchor_type: string
  total_num: string
  updated_at: string
}
