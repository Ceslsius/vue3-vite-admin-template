/*
 * @Descripttion:
 * @Author: Zhang Yunzhong
 * @Date: 2021-03-19 17:43:54
 * @LastEditors: Zhang Yunzhong
 * @LastEditTime: 2021-04-07 15:57:40
 */

import { TakStorage } from './storage'
export const adminStorage = new TakStorage({
  prefix: 'activity-admin',
})

export function downLoadXlsx(file: Blob, name = 'file') {
  const url = window.URL.createObjectURL(file)
  const link = document.createElement('a')
  link.style.display = 'none'
  link.href = url
  link.setAttribute('download', `${name}.xlsx`)
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

export function dateFormat(fmt: string, date: Date) {
  const o: any = {
    'Y+': date.getFullYear(),
    'M+': date.getMonth() + 1, //月份
    'd+': date.getDate(), //日
    'h+': date.getHours(), //小时
    'm+': date.getMinutes(), //分
    's+': date.getSeconds(), //秒
    'q+': Math.floor((date.getMonth() + 3) / 3), //季度
    S: date.getMilliseconds(), //毫秒
  }
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(
      RegExp.$1,
      (date.getFullYear() + '').substr(4 - RegExp.$1.length)
    )
  }
  for (const k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) {
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length == 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length)
      )
    }
  }
  return fmt
}

export function jsonClone<T>(data: T): T {
  return JSON.parse(JSON.stringify(data))
}

export function setKeysMap<T, D>(keys: T, data: D) {
  let tempKeys = (Array.isArray(keys) ? keys : Object.keys(keys)) as (keyof T)[]
  const tempMap = {} as Record<keyof T, D>
  tempKeys.forEach((item) => {
    tempMap[item] = jsonClone(data)
  })
  return tempMap
}
