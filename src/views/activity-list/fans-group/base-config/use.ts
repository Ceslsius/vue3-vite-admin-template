/*
 * @Descripttion:
 * @Author: Yi Yunwan
 * @Date: 2021-04-12 10:08:27
 * @LastEditors: Yi Yunwan
 * @LastEditTime: 2021-04-15 09:45:41
 */
import { adminStorage, jsonClone } from '@/utils'
import { reactive } from 'vue'
import { getActivityRule } from './api'
import { FanMissionInfo } from './inerface'

export function useFansConfig(callBack: Function) {
  const fanMission = reactive<FanMissionInfo[]>(
    adminStorage.getItem('fanMission') || []
  )
  const reward = reactive(adminStorage.getItem('fansAnchorReward') || {})
  getActivityRule().then(({ data }) => {
    const fanMissionList = JSON.parse(data.base || '{}').fan_mission || []
    const anchorReward = JSON.parse(data.anchor_reward || '{}') || {}
    Object.assign(fanMission, fanMissionList)
    Object.assign(reward, anchorReward)
    adminStorage.setItem('fanMission', fanMissionList)
    adminStorage.setItem('fansAnchorReward', anchorReward)
    callBack()
  })

  return {
    reward,
    fanMission,
  }
}
