/*
 * @Descripttion:
 * @Author: Zhang Yunzhong
 * @Date: 2021-03-16 09:32:54
 * @LastEditors: Zhang Yunzhong
 * @LastEditTime: 2021-04-14 17:45:12
 */

import { reactive } from '@vue/reactivity'

export function useDynamicForm<T extends object>(
  data: T,
  options?: {
    onDel?: (index: number) => void
    onAdd?: (index: number) => void
    init?: (data: T[]) => void
    min?: number
  }
) {
  const list: (T & {
    key: number
  })[] = reactive([])
  if (options?.min) {
    for (let index = 0; index < options.min; index++) {
      const temp: T = JSON.parse(JSON.stringify(data))
      list.push({
        ...temp,
        key: new Date().getTime(),
      })
    }
  } else {
    const temp: T = JSON.parse(JSON.stringify(data))
    list.push({
      ...temp,
      key: new Date().getTime(),
    })
  }

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
