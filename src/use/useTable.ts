/*
 * @Descripttion:
 * @Author: Yi Yunwan
 * @Date: 2021-03-16 16:29:08
 * @LastEditors: Yi Yunwan
 * @LastEditTime: 2021-04-21 14:30:20
 */

import { downLoadXlsx } from '@/utils'
import { isRef, onMounted, reactive, Ref, ref, unref } from 'vue'

export function useTable<T extends object, L>(
  form: T | Ref<T>,
  service: (params: T & BasePageParams) => ListRes<L>,
  options?: {
    page_size?: 100
    page?: 1
    exportExcelFunc?: (params: T) => Promise<any>
    exportExcelName?: string | Ref<string>
  }
) {
  const pageParams = reactive<BasePageParams>({
    page_size: options?.page_size || 10,
    page: options?.page || 1,
  })
  const list = reactive<{
    value: L[]
  }>({
    value: [],
  })
  const total = ref(0)
  async function request() {
    try {
      let temp: any = form
      if (isRef(temp)) {
        temp = temp.value
      }
      const { data } = await service({
        ...temp,
        ...pageParams,
      })
      list.value = data.list as any
      total.value = data.total
    } catch (error) {
      console.error(error)
    }
  }

  async function exportExcel() {
    if (options?.exportExcelFunc) {
      let temp: any = form
      if (isRef(temp)) {
        temp = temp.value
      }
      const data = await options.exportExcelFunc(temp)
      if (data instanceof Blob) {
        downLoadXlsx(data, unref(options.exportExcelName))
      }
    }
  }

  async function search() {
    pageParams.page = 1
    await request()
  }
  function pageChange(page: number) {
    console.log(page)

    pageParams.page = page
    request()
  }
  function sizeChange(pageSize: number) {
    pageParams.page = 1
    pageParams.page_size = pageSize
    request()
  }
  onMounted(() => {
    search()
  })

  return {
    search,
    list,
    total,
    pageParams,
    pageChange,
    sizeChange,
    exportExcel,
  }
}
