<!--
 * @Descripttion: 
 * @Author: Zhang Yunzhong
 * @Date: 2021-03-11 09:55:12
 * @LastEditors: Zhang Yunzhong
 * @LastEditTime: 2021-04-09 14:20:46
-->
<template>
  <el-dialog title="添加活动" v-model="addActivityVisible">
    <el-form ref="formRef" :model="form" :rules="rules" label-width="80px">
      <el-form-item label="活动编号" prop="code">
        <el-input
          type="number"
          v-model.number="form.code"
          placeholder="请输入活动编号"
        ></el-input>
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
      <el-form-item
        label="结束时间"
        prop="end_time"
        :rules="[
          {
            required: true,
            message: '请选择结束时间',
            trigger: 'change',
          },
          {
            validator: dateCheck,
            trigger: 'blur',
          },
        ]"
      >
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
          <el-option
            v-for="(item, index) in activityTypeList"
            :key="index"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <span class="form-item-tips ml-15">
          <i class="el-icon-info"></i>
          同一活动结束时间后可再次添加
        </span>
        <el-button @click="close">取 消</el-button>
        <el-button type="primary" :loading="btnLoading" @click="onSubmit">
          保存
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, nextTick } from 'vue'
import { addActivity } from '../api'
import { useForm } from '@/use/useForm'
import { ElMessage } from 'element-plus'
import { numberCheck } from '@/utils/check'
import { activityTypeList } from '@/record/activityTypeList'

export default defineComponent({
  name: 'AddActivity',
  data() {
    return {
      rules: {
        code: [
          { required: true, message: '请输入活动编号', trigger: 'blur' },
          {
            validator: numberCheck,
            trigger: 'blur',
            min: 1,
            max: 9999999,
            isInt: true,
          },
        ],
        name: { required: true, message: '请输入活动名称', trigger: 'blur' },
        start_time: {
          required: true,
          message: '请选择开始时间',
          trigger: 'change',
        },
        end_time: [
          {
            required: true,
            message: '请选择结束时间',
            trigger: 'change',
          },
        ],
        act_type: {
          required: true,
          message: '请选择活动类型',
          trigger: 'change',
        },
      },
    }
  },
  emits: ['finished'],
  setup(props, ctx) {
    const form = reactive<ActivityAddData>({
      name: '',
      act_type: '',
      code: '',
      start_time: '',
      end_time: '',
    })

    const addActivityVisible = ref(false)
    async function open() {
      Object.assign(form, {
        name: '',
        act_type: '',
        code: '',
        start_time: '',
        end_time: '',
      })
      addActivityVisible.value = true
      await nextTick()
      formRef.value?.clearValidate()
    }
    function close() {
      addActivityVisible.value = false
    }
    const { formRef, btnLoading, onSubmit } = useForm(async () => {
      const { msg } = await addActivity({
        ...form,
        // @ts-ignore
        start_time: Math.floor(form.start_time.getTime() / 1000),
        // @ts-ignore
        end_time: Math.floor(form.end_time.getTime() / 1000),
      })
      ElMessage.success(msg)
      ctx.emit('finished')
      close()
    })

    function dateCheck(
      rule: any,
      value: Date,
      callback: (error?: Error) => void
    ) {
      // @ts-ignore
      if (value?.getTime() < form.start_time.getTime()) {
        return callback(new Error('结束时间不得小于开始时间'))
      }
      return callback()
    }

    return {
      form,
      onSubmit,
      formRef,
      btnLoading,
      addActivityVisible,
      open,
      close,
      dateCheck,
      activityTypeList,
    }
  },
})
</script>

<style lang="scss"></style>
