import { service } from '@/utils/http'

/*
 * @Descripttion: name
 * @Author: weilkss
 * @Date: 2021-04-15 15:37:30
 * @LastEditors: weilkss
 * @LastEditTime: 2021-04-15 15:47:17
 */

export function getStarsList(
  params: BasePageParams & BaseTableSearchParams
): ListRes<TaskListInfo> {
  return service.get('/backend/ring/fan/task/list', {
    params,
  })
}

export function exportStarsList(params: BaseTableSearchParams) {
  return service.get('/backend/ring/fan/task/export', {
    params,
    responseType: 'blob',
  })
}
