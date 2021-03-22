<!--
 * @Descripttion: 
 * @Author: Yi Yunwan
 * @Date: 2021-03-17 14:47:24
 * @LastEditors: Yi Yunwan
 * @LastEditTime: 2021-03-17 14:54:07
-->
<template>
  <el-row type="flex">
    <el-col :span="5">
      <el-form-item
        label="头像框"
        :prop="`pkAnchorRewarConfig.${formKey}.avatar.url`"
        :rules="{
          required: true,
          message: '请上传头像框',
          trigger: 'blur',
        }"
      >
        <ImageUpload v-model:url="config.avatar.url" />
      </el-form-item>
    </el-col>
    <el-col :span="8">
      <el-form-item
        label="使用时长"
        :rules="useTimeRules"
        :prop="`pkAnchorRewarConfig.${formKey}.avatar.time`"
      >
        <el-input
          type="number"
          v-model.number="config.avatar.time"
          placeholder="请输入使用时长（单位小时，1-1000正整数）"
        ></el-input>
      </el-form-item>
    </el-col>
    <el-col :span="8">
      <div class="form-item-tips">
        <i class="el-icon-info"></i>
        单位天，1-1000正整数
      </div>
    </el-col>
  </el-row>
  <el-row type="flex">
    <el-col :span="5">
      <el-form-item
        label="直播封面标签"
        :prop="`pkAnchorRewarConfig.${formKey}.live_label.url`"
        :rules="{
          required: true,
          message: '请上传直播封面标签',
          trigger: 'blur',
        }"
      >
        <ImageUpload v-model:url="config.live_label.url" />
      </el-form-item>
    </el-col>
    <el-col :span="8">
      <el-form-item
        label="使用时长"
        :rules="useTimeRules"
        :prop="`pkAnchorRewarConfig[${formKey}].live_label.time`"
      >
        <el-input
          type="number"
          v-model.number="config.live_label.time"
          placeholder="请输入使用时长"
        ></el-input>
      </el-form-item>
    </el-col>
    <el-col :span="8">
      <div class="form-item-tips">
        <i class="el-icon-info"></i>
        单位天，1-1000正整数
      </div>
    </el-col>
    <el-col :span="8">
      <el-form-item
        label="T钻"
        :rules="[
          {
            required: true,
            message: '请输入T钻',
            trigger: 'blur',
          },
          {
            validator: numberCheck,
            trigger: 'blur',
            min: 1,
            max: 9999999,
            isInt: true,
          },
        ]"
        :prop="`pkAnchorRewarConfig[${formKey}].coin`"
      >
        <el-input
          type="number"
          placeholder="请输入T钻"
          v-model.number="config.coin"
        ></el-input>
      </el-form-item>
    </el-col>
    <el-col :span="8">
      <div class="form-item-tips">
        <i class="el-icon-info"></i>
        T钻：1-9999999正整数
      </div>
    </el-col>
  </el-row>
  <el-row type="flex">
    <el-col :span="5">
      <el-form-item
        label="头像框"
        :prop="`pkAnchorRewarConfig.${formKey}.avatar.url`"
        :rules="{
          required: true,
          message: '请上传头像框',
          trigger: 'blur',
        }"
      >
        <ImageUpload v-model:url="config.avatar.url" />
      </el-form-item>
    </el-col>
    <el-col :span="8">
      <el-form-item
        label="使用时长"
        :rules="useTimeRules"
        :prop="`pkAnchorRewarConfig.${formKey}.avatar.time`"
      >
        <el-input
          type="number"
          v-model.number="config.avatar.time"
          placeholder="请输入使用时长（单位小时，1-1000正整数）"
        ></el-input>
      </el-form-item>
    </el-col>
    <el-col :span="8">
      <div class="form-item-tips">
        <i class="el-icon-info"></i>
        单位天，1-1000正整数
      </div>
    </el-col>
  </el-row>
  <el-row type="flex">
    <el-col :span="5">
      <el-form-item
        label="直播封面标签"
        :prop="`pkAnchorRewarConfig.${formKey}.live_label.url`"
        :rules="{
          required: true,
          message: '请上传直播封面标签',
          trigger: 'blur',
        }"
      >
        <ImageUpload v-model:url="config.live_label.url" />
      </el-form-item>
    </el-col>
    <el-col :span="8">
      <el-form-item
        label="使用时长"
        :rules="useTimeRules"
        :prop="`pkAnchorRewarConfig[${formKey}].live_label.time`"
      >
        <el-input
          type="number"
          v-model.number="config.live_label.time"
          placeholder="请输入使用时长"
        ></el-input>
      </el-form-item>
    </el-col>
    <el-col :span="8">
      <div class="form-item-tips">
        <i class="el-icon-info"></i>
        单位天，1-1000正整数
      </div>
    </el-col>
    <el-col :span="8">
      <el-form-item
        label="T钻"
        :rules="[
          {
            required: true,
            message: '请输入T钻',
            trigger: 'blur',
          },
          {
            validator: numberCheck,
            trigger: 'blur',
            min: 1,
            max: 9999999,
            isInt: true,
          },
        ]"
        :prop="`pkAnchorRewarConfig[${formKey}].coin`"
      >
        <el-input
          type="number"
          placeholder="请输入T钻"
          v-model.number="config.coin"
        ></el-input>
      </el-form-item>
    </el-col>
    <el-col :span="8">
      <div class="form-item-tips">
        <i class="el-icon-info"></i>
        T钻：1-9999999正整数
      </div>
    </el-col>
  </el-row>
</template>

<script lang="ts">
import { numberCheck } from '@/utils/check'
import { defineComponent, PropType } from 'vue'
import { PkAnchorRewarConfigInfo } from '../../intrface'

export default defineComponent({
  name: 'AnchorRewarConfig',
  props: {
    config: {
      required: true,
      type: Object as PropType<PkAnchorRewarConfigInfo>,
    },
    formKey: {
      required: true,
      type: String,
    },
  },
  data() {
    return {
      useTimeRules: [
        {
          required: true,
          message: '请输入使用时长',
          trigger: 'blur',
        },
        {
          validator: numberCheck,
          trigger: 'blur',
          min: 1,
          max: 1000,
          isInt: true,
        },
      ],
      numberCheck,
    }
  },
  setup() {},
})
</script>

<style lang="scss"></style>
