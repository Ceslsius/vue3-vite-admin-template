<!--
 * @Descripttion: 
 * @Author: Yi Yunwan
 * @Date: 2021-03-11 11:42:34
 * @LastEditors: Yi Yunwan
 * @LastEditTime: 2021-03-11 19:24:29
-->
<template>
  <div>
    <!-- <el-radio-group v-model="isCollapse" style="margin-bottom: 20px">
      <el-radio-button :label="false">展开</el-radio-button>
      <el-radio-button :label="true">收起</el-radio-button>
    </el-radio-group> -->
    <el-menu
      :uniqueOpened="true"
      default-active="2"
      class="tak-menu"
      @open="handleOpen"
      @close="handleClose"
      background-color="#001529"
      text-color="#fff"
      active-text-color="#ffd04b"
    >
      <el-submenu index="1">
        <template #title>
          <i class="el-icon-menu"></i>
          <span>活动管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="1-1">添加活动</el-menu-item>
          <el-menu-item index="1-2">活动记录</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="2">
        <template #title>
          <i class="el-icon-menu"></i>
          <span>活动列表</span>
        </template>
        <el-menu-item-group>
          <el-submenu index="1-4">
            <template #title>PK排位赛</template>
            <el-menu-item index="1-4-1">参数配置</el-menu-item>
            <el-menu-item index="1-4-2">奖励配置</el-menu-item>
            <el-menu-item index="1-4-3">活动数据</el-menu-item>
          </el-submenu>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isCollapse: true,
    }
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath)
    },
  },
}
</script>

<style>
.tak-menu {
  height: 100vh;
}
</style>
