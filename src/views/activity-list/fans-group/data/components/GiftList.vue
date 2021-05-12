<!--
 * @Descripttion: 
 * @Author: Zhang Yunzhong
 * @Date: 2021-04-08 10:46:50
 * @LastEditors: Zhang Yunzhong
 * @LastEditTime: 2021-04-09 14:16:54
-->
<template>
  <el-form :inline="true" class="demo-form-inline">
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
            placeholder="昵称、编号"
            v-model="form.keyword"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" :loading="btnLoading" @click="onSubmit">
            搜索
          </el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="exportExcel"> 导出 </el-button>
        </el-form-item>
      </div>
    </el-row>
  </el-form>
  <el-table :data="list.value" class="mt-15" height="60vh" style="width: 100%">
    <el-table-column prop="id" label="ID" align="center"> </el-table-column>
    <el-table-column prop="uid" label="	用户ID" align="center">
    </el-table-column>
    <el-table-column prop="user_number" label="用户编号" align="center">
    </el-table-column>
    <el-table-column prop="username" label="用户昵称" align="center">
    </el-table-column>
    <el-table-column prop="giftname" label="礼物名称" align="center">
    </el-table-column>
    <el-table-column prop="gift_num" label="礼物数量" align="center">
    </el-table-column>
    <el-table-column prop="gift_price" label="礼物价格" align="center">
    </el-table-column>
    <el-table-column
      prop="created_at"
      label="送礼时间"
      align="center"
      width="200"
    >
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
</template>

<script lang="ts">
import { useDaterange } from '@/use/useDaterange'
import { useForm } from '@/use/useForm'
import { useTable } from '@/use/useTable'
import { defineComponent, PropType, reactive, ref } from 'vue'
import { exportGiftList, getGiftList } from '../api'
import { anchorTypeMap } from '@/record/anchorTypeMap'

export default defineComponent({
  name: 'GiftList',
  props: {
    info: {
      required: true,
      type: Object as PropType<FanScoreInfo>,
    },
  },
  setup(props) {
    const form = reactive({
      keyword: '',
      code: props.info.code,
      uid: props.info.liveuid,
    })
    const { timeValue } = useDaterange(form)
    const {
      list,
      search,
      pageChange,
      pageParams,
      total,
      sizeChange,
      exportExcel,
    } = useTable(form, getGiftList, {
      exportExcelFunc: exportGiftList,
      exportExcelName: `主播${props.info.username}榜单礼物明细`,
    })

    const { onSubmit, btnLoading } = useForm(search)

    return {
      list,
      pageChange,
      pageParams,
      total,
      sizeChange,
      onSubmit,
      btnLoading,
      timeValue,
      form,
      anchorTypeMap,
      exportExcel,
    }
  },
})
</script>

<style lang="scss"></style>
