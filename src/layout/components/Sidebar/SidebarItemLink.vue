<!--
 * @Descripttion: 
 * @Author: Yi Yunwan
 * @Date: 2021-03-11 11:42:34
 * @LastEditors: Yi Yunwan
 * @LastEditTime: 2021-03-14 22:33:46
-->
<template>
  <a v-if="isExternal(to)" :href="to" target="_blank" rel="noopener">
    <slot />
  </a>

  <router-link v-else v-bind="$props" custom v-slot="{ navigate }">
    <div v-bind="$attrs" @click="navigate">
      <slot />
    </div>
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
