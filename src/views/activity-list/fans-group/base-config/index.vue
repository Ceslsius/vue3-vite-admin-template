<!--
 * @Descripttion: 
 * @Author: Yi Yunwan
 * @Date: 2021-04-06 17:12:42
 * @LastEditors: Yi Yunwan
 * @LastEditTime: 2021-04-08 10:37:16
-->
<template>
  <el-tabs v-model="activeName">
    <el-tab-pane label="涨粉配置" name="PowderRising" :lazy="true">
      <PowderRising />
    </el-tab-pane>
    <el-tab-pane label="奖励配置" name="RewardConfig" :lazy="true">
      <RewardConfig />
    </el-tab-pane>
  </el-tabs>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import PowderRising from './components/PowderRising.vue'
import RewardConfig from './components/RewardConfig.vue'
export default defineComponent({
  name: '',
  components: {
    RewardConfig,
    PowderRising,
  },
  data() {
    return {
      activeName: 'PowderRising',
    }
  },
})
</script>

<style lang="scss"></style>
