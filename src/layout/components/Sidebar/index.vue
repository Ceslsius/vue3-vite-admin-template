<!--
 * @Descripttion: 
 * @Author: Yi Yunwan
 * @Date: 2021-03-11 11:42:34
 * @LastEditors: Yi Yunwan
 * @LastEditTime: 2021-03-29 17:03:24
-->
<template>
  <div>
    <sidebar-logo :collapse="isCollapse" />
    <el-menu
      :uniqueOpened="true"
      :collapse="isCollapse"
      background-color="#2b303b"
      text-color="#fff"
      active-text-color="#1890ff"
    >
      <SidebarItem
        v-for="(route, index) in routes"
        :key="index"
        :base-path="route.path"
        :item="route"
        :is-collapse="isCollapse"
      />
    </el-menu>
  </div>
</template>

<script lang="ts">
import { useSidebar } from '@/use/useSidebar'
import { computed, defineComponent } from 'vue'
import { RouteRecordRaw, useRouter } from 'vue-router'
import SidebarItem from './SidebarItem.vue'
import SidebarLogo from './SidebarLogo.vue'

export default defineComponent({
  name: 'Sidebar',
  components: {
    SidebarItem,
    SidebarLogo,
  },
  setup() {
    const router = useRouter()
    const routes = computed<RouteRecordRaw[]>(() => {
      return router.options.routes
    })
    const { isCollapse } = useSidebar()

    return {
      routes,
      isCollapse,
    }
  },
})
</script>

<style lang="scss">
.sidebar-container {
  // reset element-ui css
  .horizontal-collapse-transition {
    transition: 0s width ease-in-out, 0s padding-left ease-in-out,
      0s padding-right ease-in-out;
  }

  .scrollbar-wrapper {
    overflow-x: hidden !important;
  }

  .el-scrollbar__view {
    height: 100%;
  }

  .el-scrollbar__bar {
    &.is-vertical {
      right: 0px;
    }

    &.is-horizontal {
      display: none;
    }
  }
}
</style>

<style lang="scss" scoped>
.el-scrollbar {
  height: 100%;
}

.el-menu {
  border: none;
  height: 100%;
  width: 100% !important;
}
</style>
