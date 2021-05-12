<!--
 * @Descripttion: 
 * @Author: Zhang Yunzhong
 * @Date: 2021-03-11 12:09:07
 * @LastEditors: Zhang Yunzhong
 * @LastEditTime: 2021-03-11 19:44:24
-->
<template>
  <div :class="[{ 'is-active': isActive }]" @click="toggleClick">
    <div class="el-icon-s-unfold"></div>
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
