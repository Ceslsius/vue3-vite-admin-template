<!--
 * @Descripttion: 
 * @Author: Yi Yunwan
 * @Date: 2021-03-11 12:09:07
 * @LastEditors: Yi Yunwan
 * @LastEditTime: 2021-03-11 12:25:28
-->
<template>
  <el-breadcrumb class="app-breadcrumb" separator="/">
    <transition-group name="breadcrumb">
      <el-breadcrumb-item v-for="(item, index) in breadcrumbs" :key="item.path">
        <span
          v-if="
            item.redirect === 'noredirect' || index === breadcrumbs.length - 1
          "
          class="no-redirect"
          >{{ item.meta.title }}</span
        >
        <a v-else @click.prevent="handleLink(item)">{{ item.meta.title }}</a>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { compile } from 'path-to-regexp'
import {
  RouteLocationMatched,
  RouteRecordRaw,
  useRoute,
  useRouter,
} from 'vue-router'

export default defineComponent({
  name: 'App',
  setup() {
    const route = useRoute()
    const router = useRouter()
    const breadcrumbs = ref<RouteLocationMatched[]>([])

    function isDashboard(route: RouteRecordRaw) {
      const name = route && route.meta && route.meta.title
      return name === 'Dashboard'
    }

    function pathCompile(path: string) {
      // To solve this problem https://github.com/PanJiaChen/vue-element-admin/issues/561
      const { params } = route
      const toPath = compile(path)
      return toPath(params)
    }

    function handleLink(item: any) {
      const { redirect, path } = item
      if (redirect) {
        router.push(redirect)
        return
      }
      router.push(pathCompile(path))
    }

    function getBreadcrumb() {
      let matched = route.matched.filter((item) => item.meta && item.meta.title)
      const first = matched[0]
      if (!isDashboard(first)) {
        matched = [
          { path: '/dashboard', meta: { title: 'Dashboard' } } as any,
        ].concat(matched)
      }
      breadcrumbs.value = matched.filter((item) => {
        return item.meta && item.meta.title && item.meta.breadcrumb !== false
      })
    }

    return {
      breadcrumbs,
      handleLink,
    }
  },
})
</script>

<style lang="scss" scoped>
.el-breadcrumb__inner,
.el-breadcrumb__inner a {
  font-weight: 400 !important;
}

.app-breadcrumb.el-breadcrumb {
  display: inline-block;
  font-size: 14px;
  line-height: 50px;
  margin-left: 8px;

  .no-redirect {
    color: #97a8be;
    cursor: text;
  }
}
</style>
