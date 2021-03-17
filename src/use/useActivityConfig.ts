/*
 * @Descripttion:
 * @Author: Yi Yunwan
 * @Date: 2021-03-15 16:09:09
 * @LastEditors: Yi Yunwan
 * @LastEditTime: 2021-03-15 16:27:51
 */

import { getActivityConfig } from '@/api'
import { Ref } from 'vue'
const activityConfigMap: Record<string, any> = {}

export function useActivityConfig<T>(
  params: GetActivityConfigParams,
  form: Ref<T>
) {
  const key = params.act_type + params.type_value
  form.value ??= activityConfigMap[key]
  getActivityConfig(params).then(({ data }) => {
    activityConfigMap[key] = data.value
    form.value = data.value
  })
}
