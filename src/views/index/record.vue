<!--
 * @Descripttion: 
 * @Author: Yi Yunwan
 * @Date: 2021-03-11 20:33:32
 * @LastEditors: Yi Yunwan
 * @LastEditTime: 2021-03-16 18:20:03
-->
<template>
  <el-form :inline="true" class="demo-form-inline">
    <el-form-item label="活动时间">
      <el-col :span="11">
        <el-date-picker
          type="datetimerange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          v-model="timeValue"
        >
        </el-date-picker>
      </el-col>
    </el-form-item>
    <el-form-item label="关键字">
      <el-input placeholder="关键字"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">搜索</el-button>
    </el-form-item>
    <el-form-item>
      <el-button type="primary">导出</el-button>
    </el-form-item>
  </el-form>

  <el-table :data="list.value" class="mt-15" height="70vh" style="width: 100%">
    <el-table-column prop="id" label="活动ID" align="center"> </el-table-column>
    <el-table-column prop="name" label="活动名称" align="center">
    </el-table-column>
    <el-table-column prop="start_time" label="开始时间" align="center">
    </el-table-column>
    <el-table-column prop="end_time" label="结束时间" align="center">
      <template #default="scope">
        <span>{{ scope.row.end_time }}</span>
      </template>
    </el-table-column>
    <el-table-column prop="act_type" label="活动类型" align="center">
    </el-table-column>
    <el-table-column label="操作" align="center">
      <template #default="scope">
        <el-button type="text" @click="updateActivity(scope.row)">
          修改
        </el-button>
      </template>
    </el-table-column>
  </el-table>

  <el-row type="flex" justify="end" v-if="total > pageParams.page_size">
    <div class="mt-15">
      <el-pagination
        background
        layout="sizes, prev, pager, next, jumper, ->, total,"
        :total="total"
        :current-page="pageParams.page"
        :page-size="pageParams.page_size"
        hide-on-single-page
        @current-change="pageChange"
        @size-change="sizeChange"
      >
      </el-pagination>
    </div>
  </el-row>
</template>
<script lang="ts">
import { useForm } from '@/use/useForm'
import { useTable } from '@/use/useTable'
import { defineComponent, reactive, ref } from 'vue'
import { getActivityList } from './api'
import { ActivityInfo } from './interface'
export default defineComponent({
  name: '',
  data() {
    return {}
  },
  setup() {
    const form = reactive({})
    const timeValue = ref([])
    const state = reactive({})

    const {
      list,
      search,
      pageChange,
      pageParams,
      total,
      sizeChange,
    } = useTable(form, getActivityList)
    const { onSubmit, btnLoading } = useForm(search)

    function updateActivity(info: ActivityInfo) {}

    return {
      list,
      total,
      pageParams,
      pageChange,
      onSubmit,
      btnLoading,
      timeValue,
      updateActivity,
      sizeChange,
    }
  },
})
</script>

<style lang="scss"></style>
