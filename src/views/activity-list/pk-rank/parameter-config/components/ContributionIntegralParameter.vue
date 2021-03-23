<!--
 * @Descripttion: 贡献积分参数配置
 * @Author: Yi Yunwan
 * @Date: 2021-03-11 09:55:12
 * @LastEditors: Yi Yunwan
 * @LastEditTime: 2021-03-22 18:37:49
-->
<template>
  <div>
    <el-form ref="formRef" :model="form" label-width="90px">
      <el-row type="flex">
        <el-col :span="8">
          <el-form-item
            label="常规比例"
            :rules="[
              {
                required: true,
                message: `请输入常规比例`,
                trigger: 'blur',
              },
              {
                validator: numberCheck,
                trigger: 'blur',
                min: 1,
                max: 100,
                isInt: true,
              },
            ]"
            prop="regular_ratio"
          >
            <el-input
              v-model.number="form.regular_ratio"
              placeholder="请输入常规比例"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="16">
          <div class="form-item-tips">
            <i class="el-icon-info"></i>
            常规比例=贡献积分:T钻值，1 {{ min }} 常规比例 ≤100
          </div>
        </el-col>
      </el-row>
      <el-row
        type="flex"
        v-for="(item, index) in form.special_gift"
        :key="item.key"
      >
        <el-col :span="8">
          <el-form-item
            label="特殊礼物"
            :rules="{
              required: true,
              message: `请选择礼物`,
              trigger: 'change',
            }"
            :prop="`special_gift[${index}].giftid`"
          >
            <el-select
              placeholder="请选择礼物"
              style="width: 100%"
              v-model="item.giftid"
            >
              <el-option
                v-for="(item, index) in giftList"
                :key="index"
                :label="item.giftname"
                :value="item.id"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item
            label="贡献积分"
            :rules="[
              {
                required: true,
                message: `请输入贡献积分`,
                trigger: 'change',
              },
              {
                validator: numberCheck,
                trigger: 'blur',
                min: 1,
                max: 100000,
                isInt: true,
              },
            ]"
            :prop="`special_gift[${index}].integral`"
          >
            <el-input
              v-model.number="item.integral"
              placeholder="请输入贡献积分"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item>
            <el-button
              class="ml-15"
              type="danger"
              icon="el-icon-minus"
              circle
              v-if="form.special_gift.length > 1"
              @click="delList(index)"
            ></el-button>
            <el-button
              class="ml-15"
              type="primary"
              icon="el-icon-plus"
              v-if="form.special_gift.length === index + 1"
              circle
              @click="addList"
            ></el-button>
          </el-form-item>
        </el-col>
      </el-row>

      <el-form-item>
        <div class="form-item-tips">
          <i class="el-icon-info"></i>
          赠送特殊礼物获得的贡献积分，特殊礼物选择：所有礼物；贡献积分：1-100000正整数。特殊礼物记录至少存在1条记录，上限100条
        </div>
        <el-button type="primary" @click="onSubmit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { useDynamicForm } from '@/use/useDynamicForm'
import { useForm } from '@/use/useForm'
import { useGiftList } from '@/use/useGiftList'
import { useFormCache } from '@/use/useFormCache'
import { ElMessage } from 'element-plus'
import { defineComponent, nextTick, reactive } from 'vue'
import { setPkContributionConfig } from '../../api'
import { numberCheck } from '@/utils/check'
import { usePkRankSetting } from '../../use/usePkRankSetting'

const baseInfo = { giftid: '', integral: undefined }
const min = '<'

export default defineComponent({
  name: '',
  setup() {
    const { contributionConfig } = usePkRankSetting(async () => {
      if (Object.keys(contributionConfig).length) {
        canCache.value = false
        Object.assign(form, JSON.parse(JSON.stringify(contributionConfig)))
        form.special_gift = Object.assign(list, form.special_gift)
        await nextTick()
        canCache.value = true
      }
    })
    const { list, addList, delList } = useDynamicForm(baseInfo, {})

    const form = reactive({
      regular_ratio: undefined,
      special_gift: list,
    })

    if (Object.keys(contributionConfig).length) {
      Object.assign(form, JSON.parse(JSON.stringify(contributionConfig)))
      form.special_gift = Object.assign(list, form.special_gift)
    }
    const { clearFormCache, canCache } = useFormCache(form, {
      key: 'PkContributionConfig',
      async onRecovery() {
        canCache.value = false
        form.special_gift = Object.assign(list, form.special_gift)
        await nextTick()
        canCache.value = true
      },
    })
    const { formRef, btnLoading, onSubmit } = useForm(async () => {
      const { msg } = await setPkContributionConfig(form as any)
      ElMessage.success(msg)
      clearFormCache()
    })
    const { giftList } = useGiftList()

    return {
      addList,
      delList,
      formRef,
      btnLoading,
      onSubmit,
      form,
      giftList,
      min,
      numberCheck,
    }
  },
})
</script>

<style lang="scss"></style>
