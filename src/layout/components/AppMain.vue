<!--
 * @Descripttion: 
 * @Author: Zhang Yunzhong
 * @Date: 2021-03-11 11:42:34
 * @LastEditors: Zhang Yunzhong
 * @LastEditTime: 2021-03-19 14:58:10
-->
<template>
  <section class="app-main">
    <router-view v-slot="{ Component }">
      <component :is="Component" />
    </router-view>
  </section>
</template>

<script lang="ts"></script>

<style lang="scss" scoped>
.app-main {
  overflow: hidden;
  padding: 15px;
}
</style>
