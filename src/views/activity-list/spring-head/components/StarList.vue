<!--
 * @Descripttion: name
 * @Author: weilkss
 * @Date: 2021-04-15 15:28:19
 * @LastEditors: weilkss
 * @LastEditTime: 2021-04-15 16:07:18
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
      <el-table-column
        type="index"
        label="序号"
        width="60"
        align="center"
      ></el-table-column>
      <el-table-column prop="id" label="主播ID" align="center">
      </el-table-column>
      <el-table-column prop="id" label="主播编号" align="center">
      </el-table-column>
      <el-table-column prop="id" label="主播昵称" align="center">
      </el-table-column>
      <el-table-column prop="id" label="主播类型" align="center">
      </el-table-column>
      <el-table-column prop="id" label="星星总数" align="center">
      </el-table-column>
      <el-table-column prop="id" label="星星获得时间" align="center">
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template #default="scope">
          <el-button type="text" @click="toLookInfo(scope.row)">
            查看明细
          </el-button>
        </template>
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
