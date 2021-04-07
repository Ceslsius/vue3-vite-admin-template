<!--
 * @Descripttion: 
 * @Author: Yi Yunwan
 * @Date: 2021-04-06 17:12:42
 * @LastEditors: Yi Yunwan
 * @LastEditTime: 2021-04-06 17:27:10
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
import PowderRising from './componens/PowderRising.vue'
import RewardConfig from './componens/RewardConfig.vue'
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
