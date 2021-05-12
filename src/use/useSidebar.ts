/*
 * @Descripttion:
 * @Author: Zhang Yunzhong
 * @Date: 2021-03-11 11:16:20
 * @LastEditors: Zhang Yunzhong
 * @LastEditTime: 2021-03-14 21:04:38
 */

import { getSidebarStatus, setSidebarStatus } from '@/utils/cookies'
import { computed, reactive } from 'vue'

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
  const isCollapse = computed(() => {
    return !sidebar.opened
  })
  return {
    sidebar,
    isCollapse,
    setSidebar,
    closeSideBar,
  }
}
