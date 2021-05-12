<!--
 * @Descripttion: 
 * @Author: Zhang Yunzhong
 * @Date: 2021-04-21 12:21:18
 * @LastEditors: Zhang Yunzhong
 * @LastEditTime: 2021-04-21 16:31:58
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
            placeholder="昵称"
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
      <el-table-column prop="id" label="	序号" align="center"> </el-table-column>
      <el-table-column prop="get_type" label="获得方式" align="center">
      </el-table-column>
      <el-table-column prop="param_one" label="参数一" align="center">
      </el-table-column>
      <el-table-column prop="param_two" label="参数二" align="center">
      </el-table-column>
      <el-table-column prop="param_three" label="参数三" align="center">
      </el-table-column>
      <el-table-column prop="created_at" label="获得时间" align="center">
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
import { defineComponent, PropType, reactive } from 'vue'
import { getStarRecordList, exportStarRecordList } from '../api'
export default defineComponent({
  name: 'StarInfo',
  props: {
    info: {
      required: true,
      type: Object as PropType<HeadlinesRankListInfo>,
    },
  },
  setup(props) {
    const form = reactive<
      BaseTableSearchParams & {
        code: string
        liveuid: string
      }
    >({
      keyword: '',
      code: props.info.code,
      liveuid: props.info.liveuid,
    })

    const {
      list,
      search,
      pageChange,
      pageParams,
      total,
      sizeChange,
      exportExcel,
    } = useTable(form, getStarRecordList, {
      exportExcelFunc: exportStarRecordList,
      exportExcelName: `主播${props.info.username}榜单礼物明细`,
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
