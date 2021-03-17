<!--
 * @Descripttion: 
 * @Author: Yi Yunwan
 * @Date: 2021-03-11 20:39:03
 * @LastEditors: Yi Yunwan
 * @LastEditTime: 2021-03-15 16:38:33
-->
<template>
  <el-tabs v-model="activeName">
    <el-tab-pane label="基本配置" name="BaseConfig">
      <BaseConfig></BaseConfig>
    </el-tab-pane>
    <el-tab-pane label="积分参数" name="IntegrationParameters">
      <IntegrationParameters></IntegrationParameters>
    </el-tab-pane>
    <el-tab-pane label="段位配置" name="RankConfig">
      <RankConfig></RankConfig>
    </el-tab-pane>
    <el-tab-pane label="贡献积分参数" name="ContributionIntegralParameter">
      <ContributionIntegralParameter></ContributionIntegralParameter>
    </el-tab-pane>
  </el-tabs>
</template>

<script lang="ts">
import { defineComponent } from '@vue/runtime-core'
import BaseConfig from './components/BaseConfig.vue'
import IntegrationParameters from './components/IntegrationParameters.vue'
import RankConfig from './components/RankConfig.vue'
import ContributionIntegralParameter from './components/ContributionIntegralParameter.vue'
export default defineComponent({
  components: {
    BaseConfig,
    IntegrationParameters,
    RankConfig,
    ContributionIntegralParameter,
  },
  data() {
    return {
      activeName: 'BaseConfig',
    }
  },
})
</script>

<style lang="scss"></style>
