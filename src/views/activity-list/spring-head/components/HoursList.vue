<!--
 * @Descripttion: name
 * @Author: weilkss
 * @Date: 2021-04-15 15:28:19
 * @LastEditors: weilkss
 * @LastEditTime: 2021-04-15 16:00:24
-->
<template>
  <el-form :inline="true" class="demo-form-inline">
    <el-row class="mt-15" type="flex" justify="space-between">
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
            placeholder="昵称、编号"
            v-model="form.keyword"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" :loading="btnLoading" @click="onSubmit"
            >搜索
          </el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="exportExcel"> 导出 </el-button>
        </el-form-item>
      </div>
    </el-row>
    <el-table
      :data="list.value"
      class="mt-15"
      height="70vh"
      style="width: 100%"
    >
      <el-table-column prop="id" label="榜单开始时间" align="center">
      </el-table-column>
      <el-table-column prop="id" label="NO.1用户" align="center">
      </el-table-column>
      <el-table-column prop="id" label="NO.1收益" align="center">
      </el-table-column>
      <el-table-column prop="id" label="是否发放星星" align="center">
      </el-table-column>
    </el-table>
    <el-row type="flex" justify="end">
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
  </el-form>
</template>

<script lang="ts">
import { useDaterange } from '@/use/useDaterange'
import { useForm } from '@/use/useForm'
import { useTable } from '@/use/useTable'
import { defineComponent, reactive } from 'vue'
import { getStarsList, exportStarsList } from '../api'
export default defineComponent({
  setup() {
    const form = reactive<BaseTableSearchParams>({
      keyword: '',
    })

    const {
      list,
      search,
      pageChange,
      pageParams,
      total,
      sizeChange,
      exportExcel,
    } = useTable(form, getStarsList, {
      exportExcelFunc: exportStarsList,
      exportExcelName: '星星榜单记录',
    })

    const { timeValue } = useDaterange(form)
    const { onSubmit, btnLoading } = useForm(search)

    return {
      form,
      timeValue,
      onSubmit,
      btnLoading,
      list,
      search,
      pageChange,
      pageParams,
      total,
      sizeChange,
      exportExcel,
    }
  },
})
</script>

<style></style>
