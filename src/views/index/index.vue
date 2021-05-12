<!--
 * @Descripttion: 
 * @Author: Zhang Yunzhong
 * @Date: 2021-03-11 09:55:12
 * @LastEditors: Zhang Yunzhong
 * @LastEditTime: 2021-04-08 10:59:04
-->
<template>
  <div style="width: 40%; min-width: 400px">
    <el-form ref="formRef" :model="form" :rules="rules" label-width="80px">
      <el-form-item label="活动编号" prop="code">
        <el-input v-model="form.code" placeholder="请输入活动编号"></el-input>
      </el-form-item>
      <el-form-item label="活动名称" prop="name">
        <el-input v-model="form.name" placeholder="请输入活动名称"></el-input>
      </el-form-item>
      <el-form-item label="开始时间" prop="start_time">
        <el-date-picker
          type="date"
          placeholder="选择日期"
          v-model="form.start_time"
          style="width: 100%"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="结束时间" prop="end_time">
        <el-date-picker
          type="date"
          placeholder="选择日期"
          style="width: 100%"
          v-model="form.end_time"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="活动类型" prop="act_type">
        <el-select
          v-model="form.act_type"
          placeholder="请选择"
          style="width: 100%"
        >
          <el-option label="PK排位赛" value="pk_rank"> </el-option>
        </el-select>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" :loading="btnLoading" @click="onSubmit">
          保存
        </el-button>
        <el-button>取消</el-button>
        <span class="form-item-tips">
          <i class="el-icon-info"></i>
          同一活动结束时间后可再次添加
        </span>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { ElFormItemContext } from 'element-plus/lib/el-form'
import { defineComponent, reactive, ref } from 'vue'
import { addActivity } from './api'
import { useForm } from '@/use/useForm'
import { ElMessage } from 'element-plus'

export default defineComponent({
  name: '',
  data() {
    return {
      rules: {
        code: { required: true, message: '请输入活动名称', trigger: 'blur' },
        name: { required: true, message: '请输入活动编号', trigger: 'blur' },
        start_time: {
          required: true,
          message: '请选择开始时间',
          trigger: 'change',
        },
        end_time: {
          required: true,
          message: '请选择结束时间',
          trigger: 'change',
        },
        act_type: {
          required: true,
          message: '请选择活动类型',
          trigger: 'change',
        },
      },
    }
  },
  setup() {
    const form = reactive<ActivityAddData>({
      name: '',
      act_type: '',
      code: '',
      start_time: '',
      end_time: '',
    })

    const { formRef, btnLoading, onSubmit } = useForm(async () => {
      const { msg } = await addActivity(form)
      ElMessage.success(msg)
    })

    return {
      form,
      onSubmit,
      formRef,
      btnLoading,
    }
  },
})
</script>

<style lang="scss"></style>
