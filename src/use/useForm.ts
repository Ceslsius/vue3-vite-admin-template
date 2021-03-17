/*
 * @Descripttion:
 * @Author: Yi Yunwan
 * @Date: 2021-03-15 15:13:58
 * @LastEditors: Yi Yunwan
 * @LastEditTime: 2021-03-16 17:23:32
 */

import { nextTick, ref } from 'vue'

interface FormRef {
  validate(callback: (valid: boolean) => void): void
}

export function useForm(service: Function) {
  const formRef = ref<FormRef>()
  const btnLoading = ref(false)
  async function request() {
    btnLoading.value = true
    try {
      await service()
    } finally {
      btnLoading.value = false
    }
  }
  async function onSubmit() {
    if (btnLoading.value) return
    await nextTick()
    if (formRef.value) {
      formRef.value?.validate(async (valid) => {
        if (valid) {
          request()
        }
      })
    } else {
      request()
    }
  }

  return {
    formRef,
    btnLoading,
    onSubmit,
  }
}
