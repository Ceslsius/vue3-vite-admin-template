<!--
 * @Descripttion: 
 * @Author: Zhang Yunzhong
 * @Date: 2021-03-11 09:55:12
 * @LastEditors: Zhang Yunzhong
 * @LastEditTime: 2021-04-06 14:16:10
-->
<template>
  <div>
    <div class="form-item-tips">
      <i class="el-icon-info mb-10"></i>
      “+”或不填符号表示增加积分，“-”表示减少积分，“0”表示不增不减，积分1-1000正整数
    </div>
    <el-form ref="formRef" :model="form" label-width="90px">
      <el-row v-for="(item, key) in form" :key="key">
        <el-col :span="6">
          <el-form-item
            :rules="[
              {
                required: true,
                message: `请输入${labelMap[key]}`,
                trigger: 'blur',
              },
              {
                validator: numberCheck,
                required: true,
                trigger: 'blur',
              },
            ]"
            :label="labelMap[key]"
            :prop="key"
          >
            <el-input
              type="number"
              v-model.number="form[key]"
              :placeholder="`请输入${labelMap[key]}`"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="18"> </el-col>
      </el-row>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { useForm } from '@/use/useForm'
import { useFormCache } from '@/use/useFormCache'
import { isInt } from '@/utils/validate'
import { ElMessage } from 'element-plus'
import { defineComponent, nextTick, reactive, ref, watch } from 'vue'
import { setPkIntegralConfig } from '../../api'
import { PkIntegralConfigData } from '../../intrface'
import { usePkRankSetting } from '../../use/usePkRankSetting'
const labelMap: Record<string, string> = {
  same_win: '同段位胜',
  same_fail: '同段位负',
  same_equal: '同段位平',
  high_win: '高段位胜',
  high_fail: '高段位负',
  high_equal: '高段位平',
  low_win: '低段位胜',
  low_fail: '低段位负',
  low_equal: '低段位平',
}

export default defineComponent({
  name: '',
  data() {
    const numberCheck = (
      rule: any,
      value: number,
      callback: (error?: Error) => void
    ) => {
      if (value < -1000 || value > 1000 || !isInt(value)) {
        return callback(new Error('请输入-1000 ~ 1000的整数'))
      }
      return callback()
    }
    return {
      numberCheck,
    }
  },
  setup() {
    const { integralConfig } = usePkRankSetting(async () => {
      if (Object.keys(integralConfig).length) {
        canCache.value = false
        Object.assign(form, JSON.parse(JSON.stringify(integralConfig)))
        await nextTick()
        canCache.value = true
      }
    })
    const form = reactive<Record<string, number | undefined>>(
      Object.assign(
        {
          same_win: undefined,
          same_fail: undefined,
          same_equal: undefined,
          high_win: undefined,
          high_fail: undefined,
          high_equal: undefined,
          low_win: undefined,
          low_fail: undefined,
          low_equal: undefined,
        },
        integralConfig
      )
    )

    const { clearFormCache, canCache } = useFormCache(form, {
      key: 'PkIntegralConfig',
    })

    const { btnLoading, formRef, onSubmit } = useForm(async () => {
      const { msg } = await setPkIntegralConfig(form as any)
      ElMessage.success(msg)
      clearFormCache()
    })

    watch(
      form,
      () => {
        console.log(form)
      },
      {
        immediate: true,
        deep: true,
      }
    )

    return {
      btnLoading,
      formRef,
      onSubmit,
      form,
      labelMap,
    }
  },
})
</script>

<style lang="scss"></style>
