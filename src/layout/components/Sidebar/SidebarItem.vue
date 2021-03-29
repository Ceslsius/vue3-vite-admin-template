<!--
 * @Descripttion: 
 * @Author: Yi Yunwan
 * @Date: 2021-03-11 11:42:34
 * @LastEditors: Yi Yunwan
 * @LastEditTime: 2021-03-29 17:16:29
-->
<template>
  <div
    v-if="!item.meta || !item.meta.hidden"
    :class="[
      'menu-wrapper',
      isCollapse ? 'simple-mode' : 'full-mode',
      { 'first-level': isFirstLevel },
    ]"
  >
    <template v-if="theOnlyOneChild && !theOnlyOneChild.children">
      <sidebar-item-link
        v-if="theOnlyOneChild.meta"
        :to="resolvePath(theOnlyOneChild.path)"
      >
        <el-menu-item
          :index="resolvePath(theOnlyOneChild.path)"
          :class="{ 'submenu-title-noDropdown': isFirstLevel }"
        >
          <i
            class="submenu-icon"
            :class="
              (theOnlyOneChild.meta && theOnlyOneChild.meta.icon) ||
              'el-icon-s-tools'
            "
          ></i>
          <template #title>
            <span v-if="theOnlyOneChild.meta.title">{{
              theOnlyOneChild.meta.title
            }}</span>
          </template>
        </el-menu-item>
      </sidebar-item-link>
    </template>
    <el-submenu v-else :index="resolvePath(item.path)" popper-append-to-body>
      <template #title>
        <i
          class="submenu-icon"
          :class="(item.meta && item.meta.icon) || 'el-icon-s-tools'"
        ></i>
        <template v-if="item.meta && item.meta.title">
          <span>{{ item.meta.title }}</span>
        </template>
      </template>
      <template v-if="item.children">
        <sidebar-item
          v-for="child in item.children"
          :key="child.path"
          :item="child"
          :is-collapse="isCollapse"
          :is-first-level="false"
          :base-path="resolvePath(child.path)"
          class="nest-menu"
        />
      </template>
    </el-submenu>
  </div>
</template>

<script lang="ts">
import { useSidebar } from '@/use/useSidebar'
import { isExternal } from '@/utils/validate'
import { computed, defineComponent, PropType } from 'vue'
import { RouteRecordRaw } from 'vue-router'
import SidebarItemLink from './SidebarItemLink.vue'

export default defineComponent({
  name: 'SidebarItem',
  components: {
    SidebarItemLink,
  },
  props: {
    item: {
      type: Object as PropType<RouteRecordRaw>,
      required: true,
    },
    isCollapse: {
      type: Boolean,
      default: false,
    },
    isFirstLevel: {
      type: Boolean,
      default: true,
    },
    basePath: {
      type: String,
      default: '',
    },
  },
  setup(props) {
    const showingChildNumber = computed(() => {
      if (props.item.children) {
        const showingChildren = props.item.children.filter((item) => {
          if (item.meta?.hidden) {
            return false
          } else {
            return true
          }
        })
        return showingChildren.length
      }
      return 0
    })

    const { isCollapse } = useSidebar()

    const theOnlyOneChild = computed(() => {
      if (showingChildNumber.value > 1) {
        return null
      }
      if (props.item.children) {
        for (const child of props.item.children) {
          const length = child.children?.length
          if (length && length > 1) {
            return null
          }
          if (!child.meta || !child.meta.hidden) {
            return child
          }
        }
      }
      return { ...props.item, path: '' }
    })

    function resolvePath(routePath: string) {
      if (isExternal(routePath)) {
        return routePath
      }
      if (isExternal(props.basePath)) {
        return props.basePath
      }

      return `${props.basePath !== '/' ? props.basePath : ''}${
        routePath && '/'
      }${routePath}`
    }

    return {
      theOnlyOneChild,
      resolvePath,
      isCollapse,
    }
  },
})
</script>

<style lang="scss">
.simple-mode {
  &.first-level {
    .submenu-title-noDropdown {
      padding: 0 !important;
      position: relative;

      .el-tooltip {
        padding: 0 !important;
      }
    }

    .el-submenu {
      overflow: hidden;

      & > .el-submenu__title {
        padding: 0px !important;

        .el-submenu__icon-arrow {
          display: none;
        }

        & > span {
          visibility: hidden;
        }
      }
    }
  }
}
.el-submenu__title i {
  color: #fff !important;
}
.is-opened {
  .el-submenu__title,
  .el-menu,
  .el-menu-item {
    background: #202430 !important;
    &:hover {
      background: #13151a !important;
    }
  }
}
</style>

<style lang="scss" scoped>
.submenu-icon {
  margin-right: 16px;
  color: #fff;
}

.el-submenu {
  .submenu-icon {
    margin-left: 20px;
  }
}
.el-popper,
.full-mode {
  .submenu-icon {
    margin-left: 0;
  }
}
</style>
