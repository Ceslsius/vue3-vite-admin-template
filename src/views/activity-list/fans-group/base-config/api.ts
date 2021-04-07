/*
 * @Descripttion:
 * @Author: Yi Yunwan
 * @Date: 2021-04-06 17:31:09
 * @LastEditors: Yi Yunwan
 * @LastEditTime: 2021-04-07 09:36:34
 */

import { service } from '@/utils/http'

export function setBaseConfig(data: BaseConfigData) {
  return service.post('/backend/base/config', data)
}
