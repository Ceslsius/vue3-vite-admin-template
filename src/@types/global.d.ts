/*
 * @Descripttion:
 * @Author: Zhang Yunzhong
 * @Date: 2020-12-03 16:29:15
 * @LastEditors: Zhang Yunzhong
 * @LastEditTime: 2021-03-19 17:43:45
 */
declare interface Window {
  _hmt: any
  TAKTAK_DEBUG: boolean
  /**
   * 搜狐ip查询接口返回数据
   */
  returnCitySN?: {
    /**
     * ip地址
     */
    cip: string
    /**
     * 城市地址
     */
    cname: string
  }
  globalTakTakConfig: {
    /**
     * 接口地址
     */
    baseURL: string
    /**
     * 老接口地址
     */
    oldBaseURL: string
    /**
     * 埋点上报接口地址
     */
    reportBaseURL: string
    /**
     * IM配置 sdkAppId
     */
    IMSdkAppId: number
    /**
     * sdkAppId
     */
    IMKey: string
    /**
     * 微信公众号使用微信ID
     */
    WX_APPID: string
  }
  WVJBCallbacks: Function[]
  WebViewJavascriptBridge: WebViewJavascriptBridge
}
interface WebViewJavascriptBridge {
  /**
   * WebViewJavascriptBridge 初始化
   */
  init: () => void
  /**
   * WebViewJavascriptBridge 注册事件
   */
  registerHandler: RegisterHandler

  /**
   * WebViewJavascriptBridge 调用事件
   */
  callHandler: CallHandler

  /**
   * WebViewJavascriptBridge 发送消息
   */
  send: () => void
}
type RegisterHandler = (
  /**
   * 注册的与原生通信事件名字
   */
  name: string,
  /**
   * 原生调用的回调函数
   */
  responseCallback: (data: any, responseCallback: ResponseCallback) => void
) => void
type ResponseCallback = (data: any) => void

type CallHandler = (
  name: string,
  data: any,
  responseCallback: ResponseCallback
) => void
type MayNull<T> = T | null
