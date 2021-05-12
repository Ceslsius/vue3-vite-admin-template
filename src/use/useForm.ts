/*
 * @Descripttion:
 * @Author: Zhang Yunzhong
 * @Date: 2021-03-15 15:13:58
 * @LastEditors: Zhang Yunzhong
 * @LastEditTime: 2021-03-26 11:57:59
 */

import { nextTick, ref } from 'vue'

interface FormRef {
  validate(callback: (valid: boolean) => void): void
  validate(): Promise<boolean>
  clearValidate(): void
}

export function useForm(
  service: Function,
  options?: {
    afterSubmit?: () => void
  }
) {
  const formRef = ref<FormRef>()
  const btnLoading = ref(false)
  async function request() {
    btnLoading.value = true
    try {
      await service()
      if (options?.afterSubmit) {
        options.afterSubmit()
      }
    } finally {
      btnLoading.value = false
    }
  }
  async function onSubmit() {
    if (btnLoading.value) return
    await nextTick()
    if (formRef.value) {
      try {
        await formRef.value.validate()
        request()
      } catch (error) {
        console.error(error)
      }
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
