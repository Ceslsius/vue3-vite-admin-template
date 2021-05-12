/*
 * @Descripttion:
 * @Author: Zhang Yunzhong
 * @Date: 2021-03-11 11:18:04
 * @LastEditors: Zhang Yunzhong
 * @LastEditTime: 2021-03-11 11:18:38
 */
import Cookies from 'js-cookie'

// App
const sidebarStatusKey = 'sidebar_status'
export const getSidebarStatus = () => Cookies.get(sidebarStatusKey)
export const setSidebarStatus = (sidebarStatus: string) =>
  Cookies.set(sidebarStatusKey, sidebarStatus)

// User
const tokenKey = 'vue_typescript_admin_access_token'
export const getToken = () => Cookies.get(tokenKey)
export const setToken = (token: string) => Cookies.set(tokenKey, token)
export const removeToken = () => Cookies.remove(tokenKey)
