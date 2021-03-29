<!--
 * @Descripttion: 
 * @Author: Yi Yunwan
 * @Date: 2021-03-11 20:33:32
 * @LastEditors: Yi Yunwan
 * @LastEditTime: 2021-03-29 10:53:00
-->
<template>
  <el-form :inline="true" ref="formRef" class="demo-form-inline">
    <el-row type="flex" justify="space-between">
      <div>
        <el-form-item label="活动时间">
          <el-date-picker
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            v-model="timeValue"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="关键字">
          <el-input
            placeholder="活动名称、活动编号"
            v-model="form.keyword"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" :loading="btnLoading" @click="onSubmit">
            搜索
          </el-button>
        </el-form-item>
      </div>
      <el-form-item>
        <el-button type="primary" @click="toAddActivity">添加活动</el-button>
      </el-form-item>
    </el-row>
  </el-form>

  <el-table :data="list.value" class="mt-15" height="70vh" style="width: 100%">
    <el-table-column prop="code" label="活动编号" align="center">
    </el-table-column>
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
      <template #default="scope">
        <div>{{ findType(scope.row.act_type) }}</div>
      </template>
    </el-table-column>
    <el-table-column label="操作" align="center">
      <template #default="scope">
        <el-button type="text" @click="toUpdateActivity(scope.row)">
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
  <AddActivity ref="addActivityRef" @finished="onSubmit" />
  <UpdateActivity
    ref="updateActivityRef"
    :info="updateForm"
    @finished="onSubmit"
  />
</template>
<script lang="ts">
import { useForm } from '@/use/useForm'
import { useTable } from '@/use/useTable'
import { defineComponent, reactive, ref, watch } from 'vue'
import { getActivityList } from './api'
import { activityTypeList } from '@/record/activityTypeList'
import type { ActivityInfo } from './interface'
import AddActivity from './components/AddActivity.vue'
import UpdateActivity from './components/UpdateActivity.vue'

export default defineComponent({
  name: 'record',
  components: {
    AddActivity,
    UpdateActivity,
  },
  data() {
    return {}
  },
  setup() {
    const form = reactive({
      keyword: '',
      start_time: '' as any,
      end_time: '' as any,
    })

    const timeValue = ref<Date[]>([])
    watch(
      timeValue,
      () => {
        if (!timeValue.value) {
          form.start_time = undefined
          form.end_time = undefined
          return
        }
        form.start_time = Math.floor(timeValue.value[0].getTime() / 1000)
        form.end_time = Math.floor(
          (timeValue.value[1].getTime() + 24 * 60 * 60 * 1000 - 1000) / 1000
        )
      },
      {
        deep: true,
      }
    )

    const {
      list,
      search,
      pageChange,
      pageParams,
      total,
      sizeChange,
    } = useTable(form, getActivityList)
    const { onSubmit, btnLoading } = useForm(search)

    const updateForm = reactive<Partial<ActivityInfo>>({})
    const updateActivityRef = ref<typeof UpdateActivity>()

    function toUpdateActivity(info: ActivityInfo) {
      Object.assign(updateForm, info)
      updateActivityRef.value?.open()
    }

    const addActivityRef = ref<typeof AddActivity>()

    function toAddActivity() {
      addActivityRef.value?.open()
    }

    function findType(type: string) {
      const temp = activityTypeList.find((item) => {
        return type === item.value
      })
      return temp?.label
    }

    return {
      list,
      total,
      pageParams,
      pageChange,
      onSubmit,
      btnLoading,
      timeValue,
      toUpdateActivity,
      sizeChange,
      addActivityRef,
      toAddActivity,
      search,
      form,
      updateActivityRef,
      updateForm,
      findType,
    }
  },
})
</script>

<style lang="scss"></style>
