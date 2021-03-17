<!--
 * @Descripttion: 贡献积分参数配置
 * @Author: Yi Yunwan
 * @Date: 2021-03-11 09:55:12
 * @LastEditors: Yi Yunwan
 * @LastEditTime: 2021-03-16 16:13:32
-->
<template>
  <div>
    <el-form ref="formRef" :model="form" label-width="80px">
      <el-row type="flex">
        <el-col :span="8">
          <el-form-item label="常规比例">
            <el-input
              v-model="form.regular_ratio"
              placeholder="请输入常规比例"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="16">
          <div class="form-item-tips">
            <i class="el-icon-info"></i>
            常规比例=T钻值:贡献积分，0 {{ min }} 常规比例 ≤1
          </div>
        </el-col>
      </el-row>
      <el-row type="flex" v-for="(item, index) in list" :key="item.key">
        <el-col :span="8">
          <el-form-item label="特殊礼物">
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
          <el-form-item label="贡献积分">
            <el-input v-model="item.integral"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item>
            <el-button
              class="ml-15"
              type="danger"
              icon="el-icon-minus"
              circle
              v-if="list.length > 1"
              @click="delList(index)"
            ></el-button>
            <el-button
              class="ml-15"
              type="primary"
              icon="el-icon-plus"
              v-if="list.length === index + 1"
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
import { ElMessage } from 'element-plus'
import { defineComponent, reactive } from 'vue'

const baseInfo = { giftid: '', integral: 0 }
const min = '<'

export default defineComponent({
  name: '',
  setup(props) {
    const { list, addList, delList } = useDynamicForm(baseInfo, {})
    const form = reactive({
      regular_ratio: 0,
      special_gift: list,
    })
    const { formRef, btnLoading, onSubmit } = useForm(async () => {
      ElMessage.success('msg')
    })
    const { giftList } = useGiftList()

    return {
      list,
      addList,
      delList,
      formRef,
      btnLoading,
      onSubmit,
      form,
      giftList,
      min,
    }
  },
})
</script>

<style lang="scss"></style>
