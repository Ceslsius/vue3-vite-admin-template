<!--
 * @Descripttion: 涨粉配置
 * @Author: Yi Yunwan
 * @Date: 2021-04-06 17:26:25
 * @LastEditors: Yi Yunwan
 * @LastEditTime: 2021-04-07 12:24:00
-->
<template>
  <el-form :model="list" size="mini" label-width="90px">
    <el-row v-for="(item, index) in list" :key="index">
      <el-col>
        <el-row type="flex">
          <el-col :span="8">
            <el-form-item label="涨粉数量">
              <el-input
                v-model.number="item.num"
                placeholder="请输入涨粉数量"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex">
          <el-col :span="8">
            <el-form-item label="赠送钻石数">
              <el-input
                v-model.number="item.coin"
                placeholder="请输入赠送钻石数"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row type="flex">
          <el-col :span="8">
            <el-form-item label="热度值">
              <el-input
                v-model.number="item.hot_rec.value"
                placeholder="请输入热度值"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="时长">
              <el-input
                v-model.number="item.hot_rec.time"
                placeholder="请输入时长"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="奖励图片">
              <el-input
                v-model.number="item.hot_rec.url"
                placeholder="请输入奖励图片"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex">
          <el-col :span="8">
            <el-form-item label="地址">
              <el-input placeholder="请输入热度值"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="名称">
              <el-input placeholder="请输入头像框名称"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="时长">
              <el-input placeholder="请输入时长"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-col>
      <el-col class="mb-15">
        <el-button type="danger" @click="delList(index)" v-if="list.length > 1">
          删除
        </el-button>
        <el-button
          type="primary"
          @click="addList"
          v-if="index === list.length - 1"
        >
          增加
        </el-button>
      </el-col>
    </el-row>
  </el-form>
</template>

<script lang="ts">
import { useDynamicForm } from '@/use/useDynamicForm'
import { defineComponent, reactive } from 'vue'
export default defineComponent({
  name: 'PowderRising',
  setup() {
    const { list, addList, delList } = useDynamicForm<FanMissionInfo>({
      hot_rec: {
        url: '',
      },
      avatar: {
        url: '',
        name: '',
      },
    })

    return {
      list,
      addList,
      delList,
    }
  },
})
</script>

<style lang="scss"></style>
