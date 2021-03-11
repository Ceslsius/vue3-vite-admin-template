<!--
 * @Descripttion: 
 * @Author: Yi Yunwan
 * @Date: 2021-03-11 10:55:58
 * @LastEditors: Yi Yunwan
 * @LastEditTime: 2021-03-11 18:22:30
-->
<template>
  <div :class="classObj" class="app-wrapper">
    <Sidebar class="sidebar-container" />
    <div class="main-container">
      <Navbar />
      <AppMain />
    </div>
  </div>
</template>

<script lang="ts">
import { useSidebar } from '@/use/useSidebar'
import { computed, defineComponent } from 'vue'
import { AppMain, Navbar, Sidebar } from './components'

export default defineComponent({
  name: 'Layout',
  components: {
    AppMain,
    Navbar,
    Sidebar,
  },
  setup() {
    const { closeSideBar, sidebar } = useSidebar()
    const classObj = computed(() => {
      return {
        hideSidebar: !sidebar.opened,
        openSidebar: sidebar.opened,
        withoutAnimation: sidebar.withoutAnimation,
      }
    })

    return {
      closeSideBar,
      classObj,
      sidebar,
    }
  },
})
</script>

<style lang="scss" scoped>
.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;
  display: flex;
  min-height: 100vh;
}

.main-container {
  flex: 1;
  min-height: 100vh;
  margin-left: 200px;
}

.sidebar-container {
  position: fixed;
  left: 0;
  bottom: 0;
  top: 0;
  width: 200px;
  height: 100vh;
}
</style>
