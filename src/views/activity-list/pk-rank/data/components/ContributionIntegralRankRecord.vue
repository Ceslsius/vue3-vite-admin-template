<!--
 * @Descripttion: 
 * @Author: Yi Yunwan
 * @Date: 2021-03-15 11:34:16
 * @LastEditors: Yi Yunwan
 * @LastEditTime: 2021-03-23 16:55:07
-->
<template>
  <el-form :inline="true" class="demo-form-inline">
    <el-row type="flex" justify="space-between">
      <div>
        <el-form-item label="活动时间">
          <el-date-picker
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            v-model="timeValue"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="关键字">
          <el-input placeholder="昵称/编号" v-model="form.keyword"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">搜索</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary">导出</el-button>
        </el-form-item>
      </div>
    </el-row>
  </el-form>

  <el-table :data="list.value" class="mt-15" height="70vh" style="width: 100%">
    <el-table-column prop="id" label="记录ID" align="center"> </el-table-column>
    <el-table-column prop="name" label="主播ID" align="center">
    </el-table-column>
    <el-table-column prop="user_number" label="主播编号" align="center">
    </el-table-column>
    <el-table-column prop="user_number" label="主播编号" align="center">
    </el-table-column>
    <el-table-column prop="username" label="主播昵称" align="center">
    </el-table-column>
    <el-table-column prop="score" label="当前积分" align="center">
    </el-table-column>
    <el-table-column label="操作" align="center">
      <template #default="scope">
        <el-button type="text" @click="scope.any"> 查看积分明细 </el-button>
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
import { defineComponent, reactive, ref, watch } from 'vue'
import { getContributionRankList } from '../api'

export default defineComponent({
  name: 'ContributionIntegralRankRecord',
  components: {},
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
        form.start_time = timeValue.value[0]
        form.end_time = timeValue.value[1]
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
    } = useTable(form, getContributionRankList)
    const { onSubmit, btnLoading } = useForm(search)

    return {
      list,
      total,
      pageParams,
      pageChange,
      onSubmit,
      btnLoading,
      timeValue,
      sizeChange,
      search,
      form,
    }
  },
})
</script>

<style lang="scss"></style>
