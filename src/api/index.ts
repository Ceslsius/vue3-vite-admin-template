/*
 * @Descripttion:
 * @Author: Zhang Yunzhong
 * @Date: 2021-03-15 16:04:31
 * @LastEditors: Zhang Yunzhong
 * @LastEditTime: 2021-03-30 18:19:00
 */
import { service } from '@/utils/http'
import md5 from 'js-md5'

export function getActivityConfig(
  params: GetActivityConfigParams
): Res<{
  value: any
}> {
  return service.get('/backend/activity/config', {
    params,
  })
}

export function uploadFile(image: File) {
  const data = new FormData()
  data.set('image', image)
  return service.post('/api/v1/5/upload/file', data)
}

/**
 * 礼物列表 - 不包含幸运礼物
 * 0 不含幸运礼物，1包含幸运礼物
 * @returns
 */
export function getGiftList(
  type: 0 | 1
): Res<{
  list: GiftInfo[]
}> {
  return service.get('/backend/gift/list', {
    params: {
      type,
    },
  })
}

export function login(data: {
  username: string
  password: string
}): Res<{
  user_info: {
    id: number
    username: string
    token: string
  }
}> {
  const password = md5('rCt52pF2cnnKNB3Hkp' + data.password)
  return service.post('/backend/admin/login', {
    ...data,
    password,
  })
}

export function logout() {
  return service.post('/backend/admin/logout')
}
