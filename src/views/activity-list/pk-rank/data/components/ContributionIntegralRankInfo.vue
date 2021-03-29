<!--
 * @Descripttion: 
 * @Author: Yi Yunwan
 * @Date: 2021-03-15 11:34:16
 * @LastEditors: Yi Yunwan
 * @LastEditTime: 2021-03-29 12:03:08
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
            placeholder="主播昵称、主播编号"
            v-model="form.keyword"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">搜索</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="exportExcel">导出</el-button>
        </el-form-item>
      </div>
    </el-row>
  </el-form>

  <el-table :data="list.value" class="mt-15" height="70vh" style="width: 100%">
    <el-table-column prop="uid" label="主播ID" align="center">
    </el-table-column>
    <el-table-column prop="user_number" label="主播编号" align="center">
    </el-table-column>
    <el-table-column prop="username" label="主播昵称" align="center">
    </el-table-column>
    <el-table-column prop="giftname" label="礼物名称" align="center">
    </el-table-column>
    <el-table-column prop="gift_num" label="礼物数量" align="center">
    </el-table-column>
    <el-table-column prop="created_at" label="收礼物时间" align="center">
    </el-table-column>
    <el-table-column prop="contribution" label="贡献积分" align="center">
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
import { computed, defineComponent, PropType, reactive, ref, watch } from 'vue'
import { exportContributionRankInfo, getContributionRankInfo } from '../api'

export default defineComponent({
  name: 'ContributionIntegralRankRecord',
  components: {},
  data() {
    return {}
  },
  props: {
    info: {
      required: true,
      type: Object as PropType<Partial<ContributionRankInfo>>,
    },
  },
  setup(props) {
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
        uid: props.info.uid,
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
    } = useTable(tempForm, getContributionRankInfo, {
      exportExcelName: '贡献积分排行记录',
      exportExcelFunc: exportContributionRankInfo,
    })

    const { onSubmit, btnLoading } = useForm(search)

    watch(
      () => {
        return props.info
      },
      () => {
        list.value = []
        total.value = 0
        onSubmit()
      },
      {
        deep: true,
      }
    )

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
      exportExcel,
    }
  },
})
</script>

<style lang="scss"></style>
