<!--
 * @Descripttion: 
 * @Author: Yi Yunwan
 * @Date: 2021-03-11 11:42:34
 * @LastEditors: Yi Yunwan
 * @LastEditTime: 2021-03-11 18:14:17
-->
<template>
  <section class="app-main">
    <router-view v-slot="{ Component }">
      <transition>
        <keep-alive>
          <component :is="Component" />
        </keep-alive>
      </transition>
    </router-view>
  </section>
</template>

<script lang="ts"></script>

<style lang="scss" scoped>
.app-main {
  overflow: hidden;
  padding: 25px;
}
</style>
