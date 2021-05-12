/*
 * @Descripttion:
 * @Author: Zhang Yunzhong
 * @Date: 2020-12-02 18:04:32
 * @LastEditors: Zhang Yunzhong
 * @LastEditTime: 2021-04-08 10:57:31
 */
interface CusResponse<T = any> {
  code: string
  msg: string
  data: T
}

type Res<T = any> = Promise<CusResponse<T>>

type ListRes<T = any> = Res<{
  list: T[]
  total: number
}>
interface BasePageParams {
  page_size: number
  page: number
}

interface BaseTableSearchParams {
  keyword: string
  start_time?: number
  end_time?: number
}
