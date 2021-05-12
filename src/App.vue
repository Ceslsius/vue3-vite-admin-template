<!--
 * @Descripttion: 
 * @Author: Zhang Yunzhong
 * @Date: 2021-03-10 11:28:58
 * @LastEditors: Zhang Yunzhong
 * @LastEditTime: 2021-03-11 10:10:26
-->
<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'App',
})
</script>

<style>
#app {
  min-height: 100vh;
}
</style>
