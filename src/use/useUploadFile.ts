/*
 * @Descripttion:
 * @Author: Yi Yunwan
 * @Date: 2021-03-16 14:41:34
 * @LastEditors: Yi Yunwan
 * @LastEditTime: 2021-03-17 10:01:19
 */

import { uploadFile } from '@/api'
import { Ref, ref } from 'vue'

export function useUploadFile<T>(
  callBack: (url: string, options?: T) => void,
  options?: T
) {
  const loading = ref(false)
  async function beforeUpload(file: File) {
    try {
      loading.value = true
      const { data } = await uploadFile(file)
      callBack(data, options)
      return Promise.reject()
    } catch (error) {
      return Promise.reject()
    } finally {
      loading.value = false
    }
  }
  return {
    beforeUpload,
    loading,
  }
}

export interface UploadFileRes {
  beforeUpload: (file: File) => Promise<never>
  loading: Ref<boolean>
}
