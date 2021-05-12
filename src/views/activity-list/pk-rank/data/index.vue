<!--
 * @Descripttion: 
 * @Author: Zhang Yunzhong
 * @Date: 2021-03-15 11:34:16
 * @LastEditors: Zhang Yunzhong
 * @LastEditTime: 2021-03-23 16:29:16
-->
<template>
  <el-tabs v-model="activeName">
    <el-tab-pane label="积分排行记录" name="IntegralRankRecord" :lazy="true">
      <IntegralRankRecord></IntegralRankRecord>
    </el-tab-pane>
    <el-tab-pane
      label="贡献积分排行记录"
      name="ContributionIntegralRankRecord"
      :lazy="true"
    >
      <ContributionIntegralRankRecord></ContributionIntegralRankRecord>
    </el-tab-pane>
  </el-tabs>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import IntegralRankRecord from './components/IntegralRankRecord.vue'
import ContributionIntegralRankRecord from './components/ContributionIntegralRankRecord.vue'

export default defineComponent({
  name: '',
  components: {
    IntegralRankRecord,
    ContributionIntegralRankRecord,
  },
  data() {
    return {
      activeName: 'IntegralRankRecord',
    }
  },
})
</script>

<style lang="scss"></style>
