<!--
 * @Descripttion: name
 * @Author: weilkss
 * @Date: 2021-04-15 15:11:28
 * @LastEditors: weilkss
 * @LastEditTime: 2021-04-15 15:30:16
-->
<template>
  <el-tabs v-model="activeName">
    <el-tab-pane label="星星榜单记录" name="star" :lazy="true">
      <StarList />
    </el-tab-pane>
    <el-tab-pane label="小时榜单记录" name="hours" :lazy="true">
      <HoursList />
    </el-tab-pane>
  </el-tabs>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import StarList from './components/StarList.vue'
import HoursList from './components/HoursList.vue'
export default defineComponent({
  components: {
    StarList,
    HoursList,
  },
  setup() {
    const activeName = ref<string>('star')
    return {
      activeName,
    }
  },
})
</script>

<style></style>
