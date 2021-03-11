<!--
 * @Descripttion: 
 * @Author: Yi Yunwan
 * @Date: 2021-03-11 11:42:34
 * @LastEditors: Yi Yunwan
 * @LastEditTime: 2021-03-11 12:07:26
-->
<template>
  <a v-if="isExternal(to)" :href="to" target="_blank" rel="noopener">
    <slot />
  </a>
  <router-link v-else :to="to">
    <slot />
  </router-link>
</template>

<script lang="ts">
import { isExternal } from '@/utils/validate'
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'SidebarItemLink',
  props: {
    to: { required: true, type: String },
  },
  setup() {
    return {
      isExternal,
    }
  },
})
</script>

<style lang="scss"></style>
