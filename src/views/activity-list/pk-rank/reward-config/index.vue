<!--
 @Descripttion: 
 @Author: Yi Yunwan
 @Date: 2021-03-15 11:33:57
 * @LastEditors: Yi Yunwan
 * @LastEditTime: 2021-03-17 10:47:24
-->
<template>
  <div>
    <el-form ref="formRef" :model="form" label-width="110px">
      <el-form-item label-width="0">
        <div>主播端:</div>
      </el-form-item>
      <el-form-item
        v-for="(item, key) in pkAnchorRewarConfig"
        :key="key"
        :label="labelMap[key]"
      >
        <el-row type="flex">
          <el-col :span="5">
            <el-form-item
              label="头像框"
              :prop="`pkAnchorRewarConfig.${key}.avatar.url`"
              :rules="{
                required: true,
                message: '请上传头像框',
                trigger: 'blur',
              }"
            >
              <el-upload
                action="#"
                :before-upload="anchorUploadMap[key].avatar.beforeUpload"
                :show-file-list="false"
                v-if="!pkAnchorRewarConfig[key].avatar.url"
              >
                <el-button
                  size="small"
                  type="primary"
                  icon="el-icon-upload"
                  :loading="anchorUploadMap[key].avatar.loading"
                >
                  点击上传
                </el-button>
              </el-upload>
              <div class="flex" v-else>
                <el-image
                  class="rank-image"
                  :src="pkAnchorRewarConfig[key].avatar.url"
                  fit="contain"
                  :preview-src-list="[pkAnchorRewarConfig[key].avatar.url]"
                ></el-image>
                <span>
                  <el-button
                    class="ml-5"
                    type="danger"
                    icon="el-icon-delete"
                    circle
                  ></el-button>
                </span>
              </div>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item
              label="使用时长"
              :rules="useTimeRules"
              :prop="`pkAnchorRewarConfig.${key}.avatar.time`"
            >
              <el-input
                type="number"
                v-model.number="pkAnchorRewarConfig[key].avatar.time"
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
              :prop="`pkAnchorRewarConfig.${key}.live_label.url`"
              :rules="{
                required: true,
                message: '请上传直播封面标签',
                trigger: 'blur',
              }"
            >
              <el-upload>
                <el-button size="small" type="primary">点击上传</el-button>
              </el-upload>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item
              label="使用时长"
              :rules="useTimeRules"
              :prop="`pkAnchorRewarConfig[${key}].live_label.time`"
            >
              <el-input
                type="number"
                v-model.number="pkAnchorRewarConfig[key].live_label.time"
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
              :prop="`pkAnchorRewarConfig[${key}].coin`"
            >
              <el-input
                type="number"
                placeholder="请输入T钻"
                v-model.number="pkAnchorRewarConfig[key].coin"
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
      </el-form-item>

      <el-form-item label-width="0">
        <div>观众端:</div>
      </el-form-item>

      <el-form-item
        v-for="(item, key) in pkUserRewarConfig"
        :key="key"
        :label="labelMap[key]"
      >
        <el-row type="flex">
          <el-col :span="6">
            <el-form-item
              label="会员"
              :prop="`pkUserRewarConfig[${key}].vip`"
              :rules="[
                {
                  required: true,
                  message: '请输入会员使用时长',
                  trigger: 'blur',
                },
                {
                  validator: numberCheck,
                  trigger: 'blur',
                  min: 1,
                  max: 1000,
                  isInt: true,
                },
              ]"
            >
              <el-input
                type="number"
                v-model.number="pkUserRewarConfig[key].vip"
                placeholder="请输入会员使用时长"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="18">
            <div class="form-item-tips">
              <i class="el-icon-info"></i>
              使用时长：单位天，1-1000正整数
            </div>
          </el-col>
          <el-col :span="6">
            <el-form-item
              label="头像框"
              :prop="`pkUserRewarConfig.${key}.avatar.url`"
              :rules="{
                required: true,
                message: '请上传头像框',
                trigger: 'blur',
              }"
            >
              <el-upload>
                <el-button size="small" type="primary">点击上传</el-button>
              </el-upload>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item
              label="使用时长"
              :prop="`pkUserRewarConfig[${key}].avatar.time`"
              :rules="useTimeRules"
            >
              <el-input
                type="number"
                placeholder="请输入使用时长"
                v-model="pkUserRewarConfig[key].avatar.time"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <div class="form-item-tips">
              <i class="el-icon-info"></i>
              使用时长：单位天，1-1000正整数
            </div>
          </el-col>
        </el-row>
        <el-row type="flex">
          <el-col :span="6">
            <el-form-item
              label="礼物"
              :prop="`pkUserRewarConfig[${key}].gift.id`"
              :rules="{
                required: true,
                message: '请选择礼物',
                trigger: 'change',
              }"
            >
              <el-select
                v-model="pkUserRewarConfig[key].gift.id"
                placeholder="请选择礼物"
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
              label="使用时长"
              :prop="`pkUserRewarConfig[${key}].gift.time`"
              :rules="useTimeRules"
            >
              <el-input
                type="number"
                v-model="pkUserRewarConfig[key].gift.time"
                placeholder="请输入使用时长（1-1000正整数）"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <div class="form-item-tips">
              <div>
                <i class="el-icon-info"></i>
                礼物：当前礼物列表所有礼物（幸运礼物除外）
              </div>
              <div>
                <i class="el-icon-info"></i>
                使用时长：单位小时，1-10000正整数
              </div>
            </div>
          </el-col>
        </el-row>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit" :loading="btnLoading">
          保存
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { useForm } from '@/use/useForm'
import { useGiftList } from '@/use/useGiftList'
import { isInt } from '@/utils/validate'
import { ElMessage } from 'element-plus'
import { defineComponent, reactive, Ref } from 'vue'
import { setPkRankConfig } from '../api'
import { numberCheck } from '@/utils/check'
import {
  PkAnchorRewarConfig,
  PkAnchorRewarConfigInfo,
  PkUserRewarConfig,
  PkUserRewarConfigInfo,
  RankConfigInfo,
} from '../intrface'
import { UploadFileRes, useUploadFile } from '@/use/useUploadFile'

const labelMap: Record<string, string> = {
  first: '第一名',
  second: '第二名',
  three: '第三名',
  four_to_ten: '第四～十名',
}
const labelKeys = Object.keys(labelMap)

function useConfig<T>(base: T) {
  const config = reactive<Record<string, T>>({})
  labelKeys.forEach((item) => {
    config[item] = JSON.parse(JSON.stringify(base)) as any
  })
  return {
    config,
  }
}

function usePkAnchorRewarConfig() {
  const { config: pkAnchorRewarConfig } = useConfig<PkAnchorRewarConfigInfo>({
    avatar: {
      url: '',
    },
    live_label: {
      url: '',
    },
  })
  const anchorUploadMap = reactive<
    Record<
      string,
      {
        avatar: UploadFileRes
        live_label: UploadFileRes
      }
    >
  >({})
  labelKeys.forEach((item) => {
    const { loading, beforeUpload } = useUploadFile((value) => {
      pkAnchorRewarConfig[item].avatar.url = value
    })
    const { loading: loading1, beforeUpload: beforeUpload1 } = useUploadFile(
      (value) => {
        pkAnchorRewarConfig[item].live_label.url = value
      }
    )
    anchorUploadMap[item] = {
      avatar: {
        loading,
        beforeUpload,
      },
      live_label: {
        loading: loading1,
        beforeUpload: beforeUpload1,
      },
    } as any
  })
  return {
    pkAnchorRewarConfig,
    anchorUploadMap,
  }
}

function usePkUserRewarConfig() {
  const { config: pkUserRewarConfig } = useConfig<PkUserRewarConfigInfo>({
    avatar: {
      url: '',
    },
    gift: {},
  })

  const userUploadMap = reactive<Record<string, UploadFileRes>>({})
  labelKeys.forEach((item) => {
    const { loading, beforeUpload } = useUploadFile((value) => {
      pkUserRewarConfig[item].avatar.url = value
    })
    userUploadMap[item] = {
      loading,
      beforeUpload,
    } as any
  })
  return {
    pkUserRewarConfig,
    userUploadMap,
  }
}

export default defineComponent({
  name: '',
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
  setup() {
    const { pkAnchorRewarConfig, anchorUploadMap } = usePkAnchorRewarConfig()
    const { pkUserRewarConfig, userUploadMap } = usePkUserRewarConfig()
    const form = reactive({
      pkAnchorRewarConfig,
      pkUserRewarConfig,
    })
    const { giftList } = useGiftList()
    function delImage(key: string, type?: string) {
      if (type) {
      } else {
      }
    }

    const { formRef, btnLoading, onSubmit } = useForm(async () => {
      ElMessage.success('msg')
    })
    return {
      formRef,
      onSubmit,
      pkAnchorRewarConfig,
      anchorUploadMap,
      pkUserRewarConfig,
      userUploadMap,
      btnLoading,
      labelMap,
      form,
      giftList,
    }
  },
})
</script>

<style lang="scss"></style>
