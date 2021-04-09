<!--
 * @Descripttion: 
 * @Author: Yi Yunwan
 * @Date: 2021-04-08 10:46:50
 * @LastEditors: Yi Yunwan
 * @LastEditTime: 2021-04-09 14:10:09
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
  <el-table :data="list.value" class="mt-15" height="70vh" style="width: 100%">
    <el-table-column prop="code" label="活动编号" align="center">
    </el-table-column>
    <el-table-column prop="id" label="ID" align="center"> </el-table-column>
    <el-table-column prop="liveuid" label="主播ID" align="center">
    </el-table-column>
    <el-table-column prop="username" label="主播昵称" align="center">
    </el-table-column>
    <el-table-column prop="user_number" label="主播编号" align="center">
    </el-table-column>
    <el-table-column prop="anchor_type" label="主播类型" align="center">
      <template #default="scope">
        <div>
          {{ anchorTypeMap[scope.row.anchor_type] }}
        </div>
      </template>
    </el-table-column>
    <el-table-column prop="total_num" label="礼物总数" align="center">
    </el-table-column>
    <el-table-column prop="total_money" label="总金额" align="center">
    </el-table-column>
    <el-table-column prop="uid" label="真爱粉丝id" align="center">
    </el-table-column>
    <el-table-column prop="uid_user_number" label="真爱粉丝编号" align="center">
    </el-table-column>
    <el-table-column prop="uid_username" label="真爱粉丝昵称" align="center">
    </el-table-column>
    <el-table-column prop="uid_username" label="操作" align="center">
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

  <el-dialog
    :title="`主播${fansTaskInfo.username}榜单礼物明细`"
    v-model="infoDialogVisible"
    :destroy-on-close="true"
    width="80%"
    top="5vh"
  >
    <GiftList :info="fansTaskInfo" />
  </el-dialog>
</template>

<script lang="ts">
import { useDaterange } from '@/use/useDaterange'
import { useForm } from '@/use/useForm'
import { useTable } from '@/use/useTable'
import { defineComponent, reactive, ref } from 'vue'
import { exportFanScoreList, getFanScoreList } from '../api'
import { anchorTypeMap } from '@/record/anchorTypeMap'
import GiftList from './GiftList.vue'

export default defineComponent({
  name: 'RankRecord',
  components: {
    GiftList,
  },
  setup() {
    const form = reactive<BaseTableSearchParams>({
      keyword: '',
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
    } = useTable(form, getFanScoreList, {
      exportExcelFunc: exportFanScoreList,
      exportExcelName: '榜单明细',
    })

    const { onSubmit, btnLoading } = useForm(search)

    const infoDialogVisible = ref(false)
    const fansTaskInfo = reactive<FanScoreInfo>({} as FanScoreInfo)

    function toLookInfo(info: IntegralRankRecordInfo) {
      infoDialogVisible.value = true
      Object.assign(fansTaskInfo, info)
    }

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
      toLookInfo,
      infoDialogVisible,
      fansTaskInfo,
      exportExcel,
    }
  },
})
</script>

<style lang="scss"></style>
