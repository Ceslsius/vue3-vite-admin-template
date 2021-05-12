<!--
 @Descripttion: 
 @Author: Zhang Yunzhong
 @Date: 2021-03-15 11:33:57
 * @LastEditors: Zhang Yunzhong
 * @LastEditTime: 2021-04-01 18:50:36
-->
<template>
  <el-tabs v-model="activeName">
    <el-tab-pane label="主播端" name="AnchorRewar">
      <AnchorRewar />
    </el-tab-pane>
    <el-tab-pane label="用户端" name="UserRewar">
      <UserRewar />
    </el-tab-pane>
  </el-tabs>
  <div></div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import AnchorRewar from './components/AnchorRewar.vue'
import UserRewar from './components/UserRewar.vue'

export default defineComponent({
  name: '',
  components: {
    AnchorRewar,
    UserRewar,
  },
  data() {
    return {
      activeName: 'AnchorRewar',
    }
  },
})
</script>

<style lang="scss"></style>
