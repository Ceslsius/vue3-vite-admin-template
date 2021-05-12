<!--
 * @Descripttion: 
 * @Author: Zhang Yunzhong
 * @Date: 2021-03-24 16:24:23
 * @LastEditors: Zhang Yunzhong
 * @LastEditTime: 2021-04-02 11:20:11
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
          <div v-else-if="typeof scope.row.count === 'object'">
            <el-image
              class="form-image"
              :src="scope.row.count.url"
              fit="contain"
              :preview-src-list="[scope.row.count.url]"
            ></el-image>
            <div>
              {{ scope.row.count.giftname || scope.row.count.name }}
            </div>
          </div>
          <div v-else>
            {{ scope.row.count }}
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="time" label="使用时长" align="center">
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template #default="scope">
          <el-button type="text" @click="change(scope.row)"> 修改 </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>

  <el-dialog title="主播端配置修改" v-model="visibleRef" width="40%">
    <el-form ref="formRef" :model="form" label-width="110px">
      <el-row type="flex" v-if="type === 'avatar' && form.avatar">
        <el-col :span="14">
          <el-form-item
            label="头像框"
            :prop="`avatar.url`"
            :rules="{
              required: true,
              message: '请上传头像框',
              trigger: 'blur',
            }"
          >
            <ImageUpload v-model:url="form.avatar.url" />
          </el-form-item>
        </el-col>
        <el-col :span="14">
          <el-form-item
            label="头像框名"
            :prop="`avatar.name`"
            :rules="{
              required: true,
              message: '请输入头像框名',
              trigger: 'blur',
            }"
          >
            <el-input
              v-model.number="form.avatar.name"
              placeholder="请输入头像框名"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="14">
          <el-form-item
            label="使用时长"
            :rules="useTimeRules"
            :prop="`avatar.time`"
          >
            <el-input
              type="number"
              v-model.number="form.avatar.time"
              placeholder="请输入使用时长（单位天，1-1000正整数）"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <div class="form-item-tips">
            <i class="el-icon-info"></i>
            单位天，1-1000正整数
          </div>
        </el-col>
      </el-row>
      <el-row type="flex" v-if="type === 'live_label' && form.live_label">
        <el-col :span="14">
          <el-form-item
            label="直播封面标签"
            prop="live_label.url"
            :rules="{
              required: true,
              message: '请上传直播封面标签',
              trigger: 'blur',
            }"
          >
            <ImageUpload v-model:url="form.live_label.url" />
          </el-form-item>
        </el-col>
        <el-col :span="14">
          <el-form-item
            label="使用时长"
            :rules="useTimeRules"
            prop="live_label.time"
          >
            <el-input
              type="number"
              v-model.number="form.live_label.time"
              placeholder="请输入使用时长(单位天，1-1000正整数)"
            ></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="10">
          <div class="form-item-tips">
            <i class="el-icon-info"></i>
            单位天，1-1000正整数
          </div>
        </el-col>
      </el-row>
      <el-row type="flex" v-if="type === 'coin'">
        <el-col :span="14">
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
            :prop="`coin`"
          >
            <el-input
              type="number"
              placeholder="请输入T钻"
              v-model.number="form.coin"
            ></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="10">
          <div class="form-item-tips">
            <i class="el-icon-info"></i>
            T钻：1-9999999正整数
          </div>
        </el-col>
      </el-row>
    </el-form>

    <template #footer>
      <span class="dialog-footer">
        <el-button @click="close">取 消</el-button>
        <el-button type="primary" :loading="btnLoading" @click="onSubmit">
          保存
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts">
import { useForm } from '@/use/useForm'
import { ElMessage } from 'element-plus'
import { defineComponent, reactive, ref } from 'vue'
import { setPkAnchorRewarConfig } from '../../api'
import { usePkRankSetting } from '../../use/usePkRankSetting'
import { numberCheck } from '@/utils/check'
import {
  AnchorRewarTableFormInfo,
  useAnchorRewarTableForm,
  usePkAnchorRewarConfig,
  useTimeRules,
} from '../use'
import ImageUpload from '@/components/ImageUpload/ImageUpload.vue'
import { PkAnchorRewarConfigInfo } from '../../intrface'

export default defineComponent({
  name: 'AnchorRewar',
  components: {
    ImageUpload,
  },
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
  setup() {
    const { anchorReward } = usePkRankSetting(async () => {
      if (Object.keys(anchorReward).length) {
        Object.assign(
          pkAnchorRewarConfig,
          JSON.parse(JSON.stringify(anchorReward))
        )
      }
    })
    const { pkAnchorRewarConfig } = usePkAnchorRewarConfig(anchorReward)

    const { anchorRewarTableForm } = useAnchorRewarTableForm(
      pkAnchorRewarConfig as any
    )

    const { formRef, btnLoading, onSubmit } = useForm(async () => {
      const { msg } = await setPkAnchorRewarConfig(
        Object.assign(JSON.parse(JSON.stringify(pkAnchorRewarConfig)), {
          [lebelKey.value]: form,
        })
      )
      Object.assign(pkAnchorRewarConfig, {
        [lebelKey.value]: JSON.parse(JSON.stringify(form)),
      })

      ElMessage.success(msg)
      visibleRef.value = false
    })

    const form = reactive<Partial<PkAnchorRewarConfigInfo>>({})

    const type = ref('')
    const lebelKey = ref('')
    function change(info: AnchorRewarTableFormInfo) {
      type.value = info.type
      lebelKey.value = info.lebelKey
      visibleRef.value = true
      formRef.value?.clearValidate()
      Object.assign(
        form,
        JSON.parse(JSON.stringify(pkAnchorRewarConfig[info.lebelKey]))
      )
    }

    const visibleRef = ref(false)

    function close() {
      visibleRef.value = false
    }

    return {
      anchorRewarTableForm,
      change,
      formRef,
      btnLoading,
      onSubmit,
      pkAnchorRewarConfig,
      close,
      type,
      lebelKey,
      useTimeRules,
      visibleRef,
      numberCheck,
      form,
    }
  },
})
</script>

<style lang="scss"></style>
