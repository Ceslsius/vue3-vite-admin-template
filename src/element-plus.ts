/*
 * @Descripttion:
 * @Author: Zhang Yunzhong
 * @Date: 2021-03-10 12:09:12
 * @LastEditors: Zhang Yunzhong
 * @LastEditTime: 2021-03-10 18:29:03
 */
import { App } from 'vue'
import { ElButton, ElSelect, ElInput, ElForm } from 'element-plus'

export function useElementPlus<T>(app: App<T>) {
  app.use(ElButton)
  app.use(ElSelect)
  app.use(ElInput)
  app.use(ElForm)
}
