/*
 * @Descripttion:
 * @Author: Yi Yunwan
 * @Date: 2021-04-06 17:31:09
 * @LastEditors: Yi Yunwan
 * @LastEditTime: 2021-04-07 14:44:10
 */

import { service } from '@/utils/http'

export function setBaseConfig(data: BaseConfigData): Res {
  return service.post('/backend/base/config', data)
}
