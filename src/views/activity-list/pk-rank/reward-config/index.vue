<!--
 @Descripttion: 
 @Author: Yi Yunwan
 @Date: 2021-03-15 11:33:57
 * @LastEditors: Yi Yunwan
 * @LastEditTime: 2021-03-29 12:31:29
-->
<template>
  <!-- <AnchorRewar /> -->
  <el-tabs v-model="activeName">
    <el-tab-pane label="主播端" name="AnchorRewar">
      <el-form ref="anchorRewarFormRef" :model="form" label-width="110px">
        <el-form-item
          v-for="(item, key) in pkAnchorRewarConfig"
          :key="key"
          label-width="0"
        >
          <div>{{ labelMap[key] }}:</div>
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
                <ImageUpload
                  v-model:url="pkAnchorRewarConfig[key].avatar.url"
                />
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item
                label="头像框名"
                :rules="{
                  required: true,
                  message: '请输入头像框名',
                  trigger: 'blur',
                }"
                :prop="`pkAnchorRewarConfig.${key}.avatar.name`"
              >
                <el-input
                  v-model.number="pkAnchorRewarConfig[key].avatar.name"
                  placeholder="请输入头像框名"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
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
            <el-col :span="6">
              <div class="form-item-tips">
                <i class="el-icon-info"></i>
                单位天，1-1000正整数
              </div>
            </el-col>
          </el-row>
          <el-row type="flex">
            <el-col :span="5" v-if="key !== 'four_to_ten'">
              <el-form-item
                label="直播封面标签"
                :prop="`pkAnchorRewarConfig.${key}.live_label.url`"
                :rules="{
                  required: true,
                  message: '请上传直播封面标签',
                  trigger: 'blur',
                }"
              >
                <ImageUpload
                  v-model:url="pkAnchorRewarConfig[key].live_label.url"
                />
              </el-form-item>
            </el-col>
            <el-col :span="8" v-if="key !== 'four_to_ten'">
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
            <el-col :span="8" v-if="key !== 'four_to_ten'">
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

        <el-form-item>
          <el-button
            type="primary"
            @click="anchorRewarOnSubmit"
            :loading="anchorRewarbBtnLoading"
          >
            保存
          </el-button>
        </el-form-item>
      </el-form>
    </el-tab-pane>
    <el-tab-pane label="用户端" name="UserRewar">
      <el-form ref="userRewarfFormRef" :model="form" label-width="110px">
        <el-form-item
          v-for="(item, key) in pkUserRewarConfig"
          :key="key"
          label-width="0"
        >
          <div>{{ labelMap[key] }}:</div>

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
            <el-col :span="6" v-if="key === 'first'">
              <el-form-item
                label="头像框"
                :prop="`pkUserRewarConfig.${key}.avatar.url`"
                :rules="{
                  required: true,
                  message: '请上传头像框',
                  trigger: 'blur',
                }"
              >
                <ImageUpload v-model:url="pkUserRewarConfig[key].avatar.url" />
              </el-form-item>
            </el-col>
            <el-col :span="6" v-if="key === 'first'">
              <el-form-item
                label="头像框名"
                :prop="`pkUserRewarConfig[${key}].avatar.name`"
                :rules="{
                  required: true,
                  message: '请输入头像框名',
                  trigger: 'blur',
                }"
              >
                <el-input
                  placeholder="请输入头像框名"
                  v-model.number="pkUserRewarConfig[key].avatar.name"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6" v-if="key === 'first'">
              <el-form-item
                label="使用时长"
                :prop="`pkUserRewarConfig[${key}].avatar.time`"
                :rules="useTimeRules"
              >
                <el-input
                  type="number"
                  placeholder="请输入使用时长"
                  v-model.number="pkUserRewarConfig[key].avatar.time"
                ></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="6" v-if="key === 'first'">
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
                  @change="changeGift(key)"
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
            <el-col :span="6">
              <el-form-item
                label="礼物个数"
                :prop="`pkUserRewarConfig[${key}].gift.count`"
                :rules="useTimeRules"
              >
                <el-input
                  type="number"
                  v-model.number="pkUserRewarConfig[key].gift.count"
                  placeholder="请输入礼物个数（1-1000正整数）"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item
                label="使用时长"
                :prop="`pkUserRewarConfig[${key}].gift.time`"
                :rules="useTimeRules"
              >
                <el-input
                  type="number"
                  v-model.number="pkUserRewarConfig[key].gift.time"
                  placeholder="请输入使用时长（1-1000正整数）"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
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
          <el-button
            type="primary"
            @click="userRewarOnSubmit"
            :loading="userRewarbBtnLoading"
          >
            保存
          </el-button>
        </el-form-item>
      </el-form>
    </el-tab-pane>
  </el-tabs>
  <div></div>
</template>

<script lang="ts">
import { useForm } from '@/use/useForm'
import { useGiftList } from '@/use/useGiftList'
import { ElMessage } from 'element-plus'
import { defineComponent, nextTick, reactive, Ref } from 'vue'
import { setPkAnchorRewarConfig, setPkUserRewarConfig } from '../api'
import { numberCheck } from '@/utils/check'
import { PkAnchorRewarConfigInfo, PkUserRewarConfigInfo } from '../intrface'
import ImageUpload from '@/components/ImageUpload/ImageUpload.vue'
import { useFormCache } from '@/use/useFormCache'
import { usePkRankSetting } from '../use/usePkRankSetting'
import AnchorRewar from './components/AnchorRewar.vue'
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

function usePkAnchorRewarConfig(config: Partial<PkAnchorRewarConfigInfo>) {
  const { config: pkAnchorRewarConfig } = useConfig<PkAnchorRewarConfigInfo>({
    avatar: {
      url: '',
      name: '',
    },
    live_label: {
      url: '',
    },
  })
  Object.keys(config).length && Object.assign(pkAnchorRewarConfig, config)

  return {
    pkAnchorRewarConfig,
  }
}

function usePkUserRewarConfig(config: Partial<PkUserRewarConfigInfo>) {
  const { config: pkUserRewarConfig } = useConfig<PkUserRewarConfigInfo>({
    avatar: {
      url: '',
      name: '',
    },
    gift: {},
  })
  Object.keys(config).length && Object.assign(pkUserRewarConfig, config)

  return {
    pkUserRewarConfig,
  }
}

export default defineComponent({
  name: '',
  components: {
    ImageUpload,
    AnchorRewar,
  },
  data() {
    return {
      useTimeRules: [
        {
          required: true,
          message: '不能为空',
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
      activeName: 'AnchorRewar',
    }
  },
  setup() {
    const { userReward, anchorReward } = usePkRankSetting(async () => {
      if (Object.keys(userReward).length) {
        Object.assign(pkUserRewarConfig, JSON.parse(JSON.stringify(userReward)))
      }
      if (Object.keys(userReward).length) {
        Object.assign(
          pkAnchorRewarConfig,
          JSON.parse(JSON.stringify(anchorReward))
        )
      }
    })
    const { pkAnchorRewarConfig } = usePkAnchorRewarConfig(anchorReward)
    const { pkUserRewarConfig } = usePkUserRewarConfig(userReward)
    const form = reactive({
      pkAnchorRewarConfig,
      pkUserRewarConfig,
    })

    const { giftList } = useGiftList()
    const {
      formRef: anchorRewarFormRef,
      btnLoading: anchorRewarbBtnLoading,
      onSubmit: anchorRewarOnSubmit,
    } = useForm(async () => {
      const { msg } = await setPkAnchorRewarConfig(pkAnchorRewarConfig as any)
      ElMessage.success(msg)
    })

    const {
      formRef: userRewarFormRef,
      btnLoading: userRewarbBtnLoading,
      onSubmit: userRewarOnSubmit,
    } = useForm(async () => {
      const { msg } = await setPkUserRewarConfig(pkUserRewarConfig as any)
      ElMessage.success(msg)
    })

    async function changeGift(key: string) {
      await nextTick()
      const temp = giftList.value.find((item) => {
        return item.id === pkUserRewarConfig[key].gift.id
      })
      pkUserRewarConfig[key].gift.giftname = temp?.giftname
    }

    return {
      anchorRewarFormRef,
      anchorRewarbBtnLoading,
      anchorRewarOnSubmit,
      pkAnchorRewarConfig,
      pkUserRewarConfig,
      labelMap,
      form,
      giftList,
      changeGift,
      userRewarFormRef,
      userRewarbBtnLoading,
      userRewarOnSubmit,
    }
  },
})
</script>

<style lang="scss"></style>
