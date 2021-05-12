/*
 * @Descripttion:
 * @Author: Zhang Yunzhong
 * @Date: 2021-04-08 10:12:05
 * @LastEditors: Zhang Yunzhong
 * @LastEditTime: 2021-04-08 10:57:50
 */
import { reactive, ref, watch } from 'vue'

export function useDaterange<T extends BaseTableSearchParams>(form: T) {
  const timeValue = ref<Date[]>([])
  watch(
    timeValue,
    () => {
      if (!timeValue.value) {
        form.start_time = undefined
        form.end_time = undefined
        return
      }
      form.start_time = Math.floor(timeValue.value[0].getTime() / 1000)
      form.end_time = Math.floor(
        (timeValue.value[1].getTime() + 24 * 60 * 60 * 1000 - 1000) / 1000
      )
    },
    {
      deep: true,
    }
  )
  return {
    timeValue,
  }
}
