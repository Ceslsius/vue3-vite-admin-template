/*
 * @Descripttion:
 * @Author: Yi Yunwan
 * @Date: 2021-03-15 15:13:58
 * @LastEditors: Yi Yunwan
 * @LastEditTime: 2021-03-24 14:49:54
 */

import { nextTick, ref } from 'vue'

interface FormRef {
  validate(callback: (valid: boolean) => void): void
  validate(): Promise<boolean>
  clearValidate(): void
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
      try {
        const res = await formRef.value.validate()
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
