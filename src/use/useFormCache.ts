/*
 * @Descripttion:
 * @Author: Zhang Yunzhong
 * @Date: 2021-03-19 17:38:55
 * @LastEditors: Zhang Yunzhong
 * @LastEditTime: 2021-03-23 17:17:40
 */

import { adminStorage } from '@/utils'
import { isProxy, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { ElMessageBox } from 'element-plus'
export function useFormCache(
  target: object | object[],
  options: {
    key: string
    message?: string
    title?: string
    onRecovery?: (target: object | object[]) => void
  }
) {
  const canCache = ref(false)

  watch(
    target,
    () => {
      // canCache.value && adminStorage.setItem(options.key, target)
    },
    {
      deep: true,
    }
  )

  function clearFormCache() {
    adminStorage.delete(options.key)
  }

  onMounted(() => {
    const temp = adminStorage.getItem(options.key)
    if (temp) {
      ElMessageBox.confirm(
        options.message || '检测你上次有修改的表单未保存，是否恢复编辑？',
        options.title || '上次编辑未保存'
      )
        .then((value) => {
          if (Array.isArray(target) && !isProxy(target)) {
            target.forEach((item, index) => {
              Object.assign(item, temp[index])
            })
          } else {
            Object.assign(target, temp)
          }
          options.onRecovery && options.onRecovery(target)
        })
        .catch(() => {
          clearFormCache()
        })
    }
  })

  return {
    clearFormCache,
    canCache,
  }
}
