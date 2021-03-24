<!--
 * @Descripttion: 
 * @Author: Yi Yunwan
 * @Date: 2021-03-24 16:24:23
 * @LastEditors: Yi Yunwan
 * @LastEditTime: 2021-03-24 16:57:12
-->
<template>
  <div>
    <el-table
      :data="tableData"
      :span-method="objectSpanMethod"
      border
      style="width: 100%; margin-top: 20px"
    >
      <el-table-column prop="label" label="名次" align="center">
      </el-table-column>
      <el-table-column prop="name" label="奖励类型" align="center">
      </el-table-column>
      <el-table-column prop="count" label="奖项值" align="center">
      </el-table-column>
      <el-table-column prop="time" label="使用时长" align="center">
      </el-table-column>
      <el-table-column label="操作"> </el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: '',
  data() {
    return {
      tableData: [
        {
          label: '1',
          name: '头像框',
          count: '234',
          time: '3.2',
        },
        {
          label: '1',
          name: '直播封面标签',
          count: '234',
          time: '3.2',
        },
        {
          label: '1',
          name: 'T钻',
          count: '234',
          time: '3.2',
        },
        {
          label: '2',
          name: '头像框',
          count: '234',
          time: '3.2',
        },
        {
          label: '2',
          name: '直播封面标签',
          count: '234',
          time: '3.2',
        },
        {
          label: '2',
          name: 'T钻',
          count: '234',
          time: '3.2',
        },
        {
          label: '3',
          name: '头像框',
          count: '234',
          time: '3.2',
        },
        {
          label: '3',
          name: '直播封面标签',
          count: '234',
          time: '3.2',
        },
        {
          label: '3',
          name: 'T钻',
          count: '234',
          time: '3.2',
        },
        {
          label: '4~10',
          name: '头像框',
          count: '234',
          time: '3.2',
        },
        {
          label: '4~10',
          name: 'T钻',
          count: '234',
          time: '3.2',
        },
      ],
    }
  },
  methods: {
    arraySpanMethod({ row, column, rowIndex, columnIndex }: any) {
      if (rowIndex % 2 === 0) {
        if (columnIndex === 0) {
          return [1, 2]
        } else if (columnIndex === 1) {
          return [0, 0]
        }
      }
    },

    objectSpanMethod({ row, column, rowIndex, columnIndex }: any) {
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
})
</script>

<style lang="scss"></style>
