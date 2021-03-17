/*
 * @Descripttion:
 * @Author: Yi Yunwan
 * @Date: 2021-03-16 09:32:54
 * @LastEditors: Yi Yunwan
 * @LastEditTime: 2021-03-16 19:31:37
 */

import { reactive } from '@vue/reactivity'

export function useDynamicForm<T extends object>(
  data: T,
  options?: {
    onDel?: (index: number) => void
    onAdd?: (index: number) => void
    init?: (data: T[]) => void
  }
) {
  const temp: T = JSON.parse(JSON.stringify(data))
  const list = reactive([
    {
      ...temp,
      key: new Date().getTime(),
    },
  ])
  options?.init && options.init(list as any)

  function addList() {
    const temp = {
      ...JSON.parse(JSON.stringify(data)),
      key: new Date().getTime(),
    }
    const index = list.push(temp)
    options?.onAdd && options.onAdd(index - 1)
  }
  function delList(index: number) {
    list.splice(index, 1)
    options?.onDel && options.onDel(index)
  }

  return {
    list,
    addList,
    delList,
  }
}
