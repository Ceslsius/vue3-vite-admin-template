<!--
 * @Descripttion: 
 * @Author: Yi Yunwan
 * @Date: 2021-03-24 16:24:23
 * @LastEditors: Yi Yunwan
 * @LastEditTime: 2021-03-26 18:26:26
-->
<template>
  <div>
    <el-table
      :data="anchorRewarTableForm"
      :span-method="objectSpanMethod"
      border
      style="width: 100%; margin-top: 20px"
    >
      <el-table-column prop="label" label="名次" align="center">
      </el-table-column>
      <el-table-column prop="name" label="奖励类型" align="center">
      </el-table-column>
      <el-table-column prop="count" label="奖项值" align="center">
        <template #default="scope">
          <div
            v-if="
              typeof scope.row.count === 'string' &&
              scope.row.count.includes('http')
            "
          >
            <el-image
              class="form-image"
              :src="scope.row.count"
              fit="contain"
              :preview-src-list="[scope.row.count]"
            ></el-image>
          </div>
          <div v-else>{{ scope.row.count }}</div>
        </template>
      </el-table-column>
      <el-table-column prop="time" label="使用时长" align="center">
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template #default>
          <el-button type="text"> 修改 </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts">
import { useGiftList } from '@/use/useGiftList'
import { defineComponent, nextTick, PropType } from 'vue'
import { setPkUserRewarConfig } from '../../api'
import { usePkRankSetting } from '../../use/usePkRankSetting'
import {
  useAnchorRewarTableForm,
  usePkAnchorRewarConfig,
  usePkUserRewarConfig,
  useUserRewardTableForm,
} from '../use'
export default defineComponent({
  name: 'AnchorRewar',

  methods: {
    objectSpanMethod({ rowIndex, columnIndex }: any) {
      if (columnIndex === 0) {
        if (rowIndex % 3 === 0) {
          return {
            rowspan: 3,
            colspan: 1,
          }
        } else {
          return {
            rowspan: 0,
            colspan: 0,
          }
        }
      }
    },
  },
  setup(props) {
    const { userReward } = usePkRankSetting(async () => {
      if (Object.keys(userReward).length) {
        Object.assign(pkUserRewarConfig, JSON.parse(JSON.stringify(userReward)))
      }
    })
    const { pkUserRewarConfig } = usePkUserRewarConfig(userReward)

    const { anchorRewarTableForm } = useAnchorRewarTableForm(userReward as any)
    return { anchorRewarTableForm }
  },
})
</script>

<style lang="scss"></style>
