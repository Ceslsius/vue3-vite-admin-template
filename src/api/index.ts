/*
 * @Descripttion:
 * @Author: Yi Yunwan
 * @Date: 2021-03-15 16:04:31
 * @LastEditors: Yi Yunwan
 * @LastEditTime: 2021-03-16 20:41:31
 */
import { service } from '@/utils/http'

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
 * @returns
 */
export function getGiftList(): Res<{
  list: GiftInfo[]
}> {
  return service.get('/backend/gift/list')
}
