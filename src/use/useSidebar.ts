/*
 * @Descripttion:
 * @Author: Yi Yunwan
 * @Date: 2021-03-11 11:16:20
 * @LastEditors: Yi Yunwan
 * @LastEditTime: 2021-03-11 11:38:59
 */

import { reactive } from '@vue/reactivity'
import { getSidebarStatus, setSidebarStatus } from '@/utils/cookies'

const sidebar = reactive({
  opened: getSidebarStatus() !== 'closed',
  withoutAnimation: false,
})

function setSidebar(withoutAnimation: boolean) {
  sidebar.opened = !sidebar.opened
  sidebar.withoutAnimation = withoutAnimation
  if (sidebar.opened) {
    setSidebarStatus('opened')
  } else {
    setSidebarStatus('closed')
  }
}

function closeSideBar(withoutAnimation: boolean) {
  sidebar.opened = false
  sidebar.withoutAnimation = withoutAnimation
  setSidebarStatus('closed')
}

export function useSidebar() {
  return {
    sidebar,
    setSidebar,
    closeSideBar,
  }
}
