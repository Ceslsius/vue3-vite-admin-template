/*
 * @Descripttion:
 * @Author: Yi Yunwan
 * @Date: 2021-03-16 16:29:08
 * @LastEditors: Yi Yunwan
 * @LastEditTime: 2021-03-16 18:04:33
 */

import { onMounted, reactive, ref } from 'vue'

export function useTable<T, L>(
  form: T,
  service: (params: T & BasePageParams) => ListRes<L>,
  options?: {
    page_size?: 100
    page?: 1
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
      const { data } = await service({
        ...form,
        ...pageParams,
      })
      list.value = data.list as any
      total.value = data.total
    } catch (error) {
      console.error(error)
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
  }
}
