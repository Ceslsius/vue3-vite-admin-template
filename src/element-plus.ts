/*
 * @Descripttion:
 * @Author: Yi Yunwan
 * @Date: 2021-03-10 12:09:12
 * @LastEditors: Yi Yunwan
 * @LastEditTime: 2021-03-10 18:24:29
 */
import { App } from 'vue'
import { ElButton, ElSelect, ElInput } from 'element-plus'

export function useElementPlus<T>(app: App<T>) {
  app.use(ElButton)
  app.use(ElSelect)
  app.use(ElInput)
}
