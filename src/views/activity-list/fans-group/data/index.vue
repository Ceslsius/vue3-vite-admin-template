<!--
 * @Descripttion: 
 * @Author: Yi Yunwan
 * @Date: 2021-04-06 17:13:03
 * @LastEditors: Yi Yunwan
 * @LastEditTime: 2021-04-09 14:09:47
-->
<template>
  <el-tabs v-model="activeName">
    <el-tab-pane label="榜单记录" name="RankRecord" :lazy="true">
      <RankRecord></RankRecord>
    </el-tab-pane>
    <el-tab-pane label="涨粉任务" name="FansTask" :lazy="true">
      <FansTask></FansTask>
    </el-tab-pane>
  </el-tabs>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import FansTask from './components/FansTask.vue'
import RankRecord from './components/RankRecord.vue'

export default defineComponent({
  name: '',
  components: {
    FansTask,
    RankRecord,
  },
  data() {
    return {
      activeName: 'RankRecord',
    }
  },
})
</script>

<style lang="scss"></style>
