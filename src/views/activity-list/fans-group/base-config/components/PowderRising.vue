<!--
 * @Descripttion: 涨粉配置
 * @Author: Yi Yunwan
 * @Date: 2021-04-06 17:26:25
 * @LastEditors: Yi Yunwan
 * @LastEditTime: 2021-04-12 14:16:04
-->
<template>
  <el-form :model="list" ref="formRef" size="mini" label-width="100px">
    <el-row
      v-for="(item, index) in list"
      :key="index"
      type="flex"
      align="bottom"
      class="border p-10 radius mb-15"
    >
      <el-col class="text-bold pb-10 mb-15 border-bottom">
        涨粉配置{{ index + 1 }}：
        <span class="form-item-tips">
          <i class="el-icon-info"></i>
          头像框和热度奖励二选一，当选择热度值时，钻石数必填
        </span>
      </el-col>
      <el-col :span="22">
        <el-row type="flex">
          <el-col :span="9">
            <el-form-item
              label="涨粉数量"
              :prop="`[${index}].num`"
              :rules="{
                required: true,
                message: '请输入涨粉数量',
              }"
            >
              <el-input
                v-model.number="item.num"
                placeholder="请输入涨粉数量"
                clearable
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex">
          <el-col :span="9">
            <el-form-item
              label="赠送钻石数"
              :prop="`[${index}].coin`"
              :rules="{
                required:
                  item.hot_rec.value || item.hot_rec.url || item.hot_rec.time,
                message: '请输入赠送钻石数',
              }"
            >
              <el-input
                v-model.number="item.coin"
                placeholder="请输入赠送钻石数"
                clearable
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row type="flex">
          <el-col :span="9">
            <el-form-item
              label="热度值"
              :prop="`[${index}].hot_rec.value`"
              :rules="{
                required:
                  item.hot_rec.value || item.hot_rec.url || item.hot_rec.time,
                message: '请输入热度值',
              }"
            >
              <el-input
                v-model.number="item.hot_rec.value"
                placeholder="请输入热度值"
                clearable
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="9">
            <el-form-item
              label="时长"
              :prop="`[${index}].hot_rec.time`"
              :rules="{
                required:
                  item.hot_rec.value || item.hot_rec.url || item.hot_rec.time,
                message: '请输入时长',
              }"
            >
              <el-input
                v-model.number="item.hot_rec.time"
                placeholder="请输入时长"
                clearable
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item
              label="奖励图片"
              :prop="`[${index}].hot_rec.url`"
              :rules="{
                required:
                  item.hot_rec.value || item.hot_rec.url || item.hot_rec.time,
                message: '请上传奖励图片',
              }"
            >
              <ImageUpload v-model:url="item.hot_rec.url"></ImageUpload>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex">
          <el-col :span="9">
            <el-form-item
              label="头像框名称"
              :prop="`[${index}].avatar.name`"
              :rules="[
                {
                  required:
                    item.avatar.name ||
                    item.avatar.url ||
                    item.avatar.time ||
                    !item.coin,
                  message: '请输入头像框名称',
                },
              ]"
            >
              <el-input
                v-model="item.avatar.name"
                placeholder="请输入头像框名称"
                clearable
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="9">
            <el-form-item
              label="使用时长"
              :prop="`[${index}].avatar.time`"
              :rules="{
                required:
                  item.avatar.name || item.avatar.url || item.avatar.time,
                message: '请输入使用时长',
              }"
            >
              <el-input
                v-model.number="item.avatar.time"
                placeholder="请输入使用时长"
                clearable
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item
              label="头像框"
              :prop="`[${index}].avatar.url`"
              :rules="{
                required:
                  item.avatar.name || item.avatar.url || item.avatar.time,
                message: '请上传头像框',
              }"
            >
              <ImageUpload v-model:url="item.avatar.url"></ImageUpload>
            </el-form-item>
          </el-col>
        </el-row>
      </el-col>
      <el-col :span="2">
        <el-row>
          <el-col v-if="list.length > 1">
            <el-button type="danger" @click="delList(index)"> 删除 </el-button>
          </el-col>
          <el-col v-if="index === list.length - 1" class="mt-15">
            <el-button type="primary" @click="addList"> 增加 </el-button>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
    <el-button type="primary" @click="onSubmit">保存</el-button>
  </el-form>
</template>

<script lang="ts">
import ImageUpload from '@/components/ImageUpload/ImageUpload.vue'
import { useDynamicForm } from '@/use/useDynamicForm'
import { useForm } from '@/use/useForm'
import { jsonClone } from '@/utils'
import { ElMessage } from 'element-plus'
import { defineComponent, reactive } from 'vue'
import { setBaseConfig } from '../api'
import { FanMissionInfo } from '../inerface'
import { useFansConfig } from '../use'

export default defineComponent({
  name: 'PowderRising',
  components: {
    ImageUpload,
  },
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
    function assignData() {
      fanMission.length && Object.assign(list, jsonClone(fanMission))
    }
    const { fanMission } = useFansConfig(assignData)
    assignData()
    const { btnLoading, onSubmit, formRef } = useForm(async () => {
      const { msg } = await setBaseConfig({
        fan_mission: list,
        act_type: 'ring_fan',
      })
      ElMessage.success(msg)
    })

    return {
      list,
      addList,
      delList,
      btnLoading,
      onSubmit,
      formRef,
    }
  },
})
</script>

<style lang="scss"></style>
