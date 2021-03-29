/*
 * @Descripttion:
 * @Author: Yi Yunwan
 * @Date: 2020-09-04 17:13:23
 * @LastEditors: Yi Yunwan
 * @LastEditTime: 2021-03-29 09:45:11
 */
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import { apiMock, baseURL, mockBaseURL, SECRET_KEY } from '@/config'
import { ElMessage } from 'element-plus'
import md5 from 'js-md5'
import { router } from '@/router'
import { adminStorage } from '.'

export const service = axios.create({
  baseURL,
  timeout: 60 * 1000,
})

function _log(response: AxiosResponse<any>) {
  if (process.env.NODE_ENV === 'development') {
    console.log('*==== 请求信息 ====*')
    console.log('地址：', response.config.method, response.config.url)
    const { data, params } = response.config

    if (typeof data === 'string') {
      try {
        const tempData = JSON.parse(data)
        Object.keys(tempData).length > 0 && console.log('请求参数：', tempData)
      } catch (error) {
        console.log('请求参数：', data)
      }
    } else if (data) {
      console.log('请求参数：', data)
    }
    if (typeof params === 'string') {
      try {
        const tempData = JSON.parse(params)
        Object.keys(tempData).length > 0 && console.log('请求参数：', tempData)
      } catch (error) {
        console.log('请求参数：', params)
      }
    } else if (params) {
      console.log('请求参数：', params)
    }
    console.log('响应结果：', response.data)
    console.log('响应配置：', response.config)
    console.log('-------------------------------------------')
  }
}

export function serviceFulfilled(response: AxiosResponse) {
  _log(response)
  // 对响应数据做点什么
  const data = response.data as CusResponse
  if (response.status === 200) {
    if (data instanceof ArrayBuffer || data instanceof Blob) {
      return response.data
    }
    if (data.code == '200') {
      return response.data
    } else if (data.code == '100003') {
      adminStorage.delete('token')
      adminStorage.delete('uid')
      adminStorage.delete('username')
      router.replace({
        path: '/login',
        query: {
          redirect: window.location.hash.slice(1),
        },
      })
      ElMessage(data.msg)
      return Promise.reject(data)
    } else {
      ElMessage(data.msg)
      return Promise.reject(data)
    }
  } else {
    ElMessage(`服务异常【${response.status}】`)
    return Promise.reject(response)
  }
}

export function serviceRejected(error: Error) {
  // 对响应错误做点什么
  console.error(error)
  error.message &&
    ElMessage(
      error.message == 'Network Error' ? '网络请求失败，请重试' : error.message
    )
  return Promise.reject(error)
}

export function useMock(config: AxiosRequestConfig) {
  if (apiMock) {
    config.baseURL = mockBaseURL
  }
  return config
}
export function addSign(config: AxiosRequestConfig) {
  const timestamp = Math.floor(new Date().getTime() / 1000)
  const sign = md5(md5(SECRET_KEY) + timestamp)
  config.headers['timestamp'] = timestamp
  config.headers['sign'] = sign
  return config
}

function addAuthorization(config: AxiosRequestConfig) {
  const Authorization = adminStorage.getItem('token')
  Authorization && (config.headers['Authorization'] = Authorization)
  return config
}
service.interceptors.request.use(addSign)
service.interceptors.request.use(useMock)
service.interceptors.request.use(addAuthorization)
service.interceptors.response.use(serviceFulfilled, serviceRejected)
