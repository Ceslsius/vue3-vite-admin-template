<!--
 * @Descripttion: 
 * @Author: Yi Yunwan
 * @Date: 2021-03-15 11:34:16
 * @LastEditors: Yi Yunwan
 * @LastEditTime: 2021-03-29 15:27:47
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
            placeholder="主播昵称、主播编号"
            v-model="form.keyword"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" :loading="btnLoading" @click="onSubmit">
            搜索
          </el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="exportExcel">导出</el-button>
        </el-form-item>
      </div>
    </el-row>
  </el-form>

  <el-table :data="list.value" class="mt-15" height="70vh" style="width: 100%">
    <el-table-column prop="id" label="记录ID" align="center"> </el-table-column>
    <el-table-column prop="uid" label="主播ID" align="center">
    </el-table-column>
    <el-table-column prop="user_number" label="主播编号" align="center">
    </el-table-column>
    <el-table-column prop="username" label="主播昵称" align="center">
    </el-table-column>
    <el-table-column prop="score" label="当前积分" align="center">
    </el-table-column>
    <el-table-column label="操作" align="center">
      <template #default="scope">
        <el-button type="text" @click="changeIntegral(scope.row)">
          修改积分
        </el-button>
        <el-button type="text" @click="toLookInfo(scope.row)">
          查看积分明细
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

  <el-dialog title="修改积分" v-model="dialogVisible" width="30%">
    <el-form :inline="true" ref="scoreFormRef" :model="scoreForm">
      <el-form-item
        label="积分"
        prop="score"
        :rules="{
          required: true,
          message: '请输入积分',
          trigger: 'blur',
        }"
      >
        <el-input
          placeholder="请输入积分"
          type="number"
          v-model.numer="scoreForm.score"
        ></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitScore"> 确 定 </el-button>
      </span>
    </template>
  </el-dialog>

  <el-dialog
    :title="`主播${integralRankRecordInfo.username}积分排行记录明细`"
    v-model="infoDialogVisible"
    width="80%"
    top="5vh"
  >
    <IntegralRankInfo :info="integralRankRecordInfo" />
  </el-dialog>
</template>

<script lang="ts">
import { useForm } from '@/use/useForm'
import { useTable } from '@/use/useTable'
import { ElMessage } from 'element-plus'
import { computed, defineComponent, reactive, ref, watch } from 'vue'
import {
  exportIntegralRank,
  getIntegralRankRecord,
  updateIntegral,
} from '../api'
import IntegralRankInfo from './IntegralRankInfo.vue'
export default defineComponent({
  name: 'IntegralRankRecord',
  components: {
    IntegralRankInfo,
  },
  data() {
    return {}
  },
  setup() {
    const form = reactive({
      keyword: '',
      start_time: '' as string | Date | number | undefined,
      end_time: '' as string | Date | number | undefined,
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
    const tempForm = computed(() => {
      let { start_time, end_time } = form
      if (start_time instanceof Date) {
        start_time = Math.floor(start_time.getTime() / 1000)
      }
      if (end_time instanceof Date) {
        end_time = Math.floor(end_time.getTime() / 1000)
      }
      return {
        ...form,
        start_time,
        end_time,
      }
    })

    const {
      list,
      search,
      pageChange,
      pageParams,
      total,
      sizeChange,
      exportExcel,
    } = useTable(tempForm, getIntegralRankRecord, {
      exportExcelFunc: exportIntegralRank,
      exportExcelName: '积分排行记录',
    })

    const { onSubmit, btnLoading, formRef } = useForm(search)
    const dialogVisible = ref(false)
    const scoreForm = reactive({
      score: 0,
    })

    const integralRankRecordInfo = reactive<Partial<IntegralRankRecordInfo>>({})
    function changeIntegral(info: IntegralRankRecordInfo) {
      scoreForm.score = info.score
      Object.assign(integralRankRecordInfo, info)
      dialogVisible.value = true
    }
    const infoDialogVisible = ref(false)
    function toLookInfo(info: IntegralRankRecordInfo) {
      infoDialogVisible.value = true
      Object.assign(integralRankRecordInfo, info)
    }

    const {
      onSubmit: submitScore,
      btnLoading: scoreBtnLoading,
      formRef: scoreFormRef,
    } = useForm(async () => {
      const { msg } = await updateIntegral({
        score: scoreForm.score,
        liveuid: integralRankRecordInfo.uid,
      })
      ElMessage.success(msg)
      dialogVisible.value = false
      onSubmit()
    })

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
      dialogVisible,
      changeIntegral,
      exportExcel,
      formRef,
      infoDialogVisible,
      toLookInfo,
      integralRankRecordInfo,
      submitScore,
      scoreBtnLoading,
      scoreFormRef,
      scoreForm,
    }
  },
})
</script>

<style lang="scss"></style>
