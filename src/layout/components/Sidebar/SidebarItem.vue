<template>
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
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>
