/*
 * @Descripttion:
 * @Author: Zhang Yunzhong
 * @Date: 2020-09-04 15:11:01
 * @LastEditors: Zhang Yunzhong
 * @LastEditTime: 2021-03-15 15:07:04
 */
export const baseURL = window.globalTakTakConfig.baseURL
export const oldBaseURL = window.globalTakTakConfig.oldBaseURL
export const SECRET_KEY = 'y3j1ju48uazcd51b9h56sftrkbebsuqt'
export const reportConfig = {
  appKey: 'a8cec57d1cd5d0f2',
  baseURL: window.globalTakTakConfig.reportBaseURL,
  debug: window.TAKTAK_DEBUG,
}
export const apiMock =
  import.meta.env.NODE_ENV !== 'production' &&
  location.href.includes('mock=true')
export const mockBaseURL = import.meta.env.VITE_MOCK_BASE_API as string
