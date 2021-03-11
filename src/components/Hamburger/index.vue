<!--
 * @Descripttion: 
 * @Author: Yi Yunwan
 * @Date: 2021-03-11 12:09:07
 * @LastEditors: Yi Yunwan
 * @LastEditTime: 2021-03-11 14:17:55
-->
<template>
  <div :class="[{ 'is-active': isActive }]" @click="toggleClick">
    <!-- <svg-icon name="hamburger" width="20" height="20" /> -->
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Hamburger',
  props: {
    isActive: {
      default: false,
    },
  },
  methods: {
    toggleClick() {
      this.$emit('toggle-click')
    },
  },
})
</script>

<style lang="scss" scoped>
.svg-icon {
  vertical-align: middle;
}

.is-active {
  transform: rotate(180deg);
}
</style>
