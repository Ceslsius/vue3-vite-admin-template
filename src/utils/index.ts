/*
 * @Descripttion:
 * @Author: Yi Yunwan
 * @Date: 2021-03-19 17:43:54
 * @LastEditors: Yi Yunwan
 * @LastEditTime: 2021-03-26 10:22:54
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
