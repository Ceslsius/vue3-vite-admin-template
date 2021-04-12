<!--
 * @Descripttion: 奖励配置
 * @Author: Yi Yunwan
 * @Date: 2021-04-06 17:26:50
 * @LastEditors: Yi Yunwan
 * @LastEditTime: 2021-04-12 14:24:30
-->
<template>
  <el-form
    :model="anchorRewardConfig"
    size="mini"
    ref="formRef"
    label-width="90px"
  >
    <el-row
      v-for="(item, key) in anchorRewardConfig"
      :key="key"
      class="border p-10 radius mb-15"
    >
      <el-col class="text-bold pb-10 mb-15 border-bottom">
        {{ getKeys(key) }}：
        <!-- <span class="form-item-tips">
          <i class="el-icon-info"></i>
          头像框和热度奖励二选一，当选择热度值时，钻石数必填
        </span> -->
      </el-col>
      <el-col :span="8">
        <el-form-item
          label="钻石数"
          :prop="`${key}.coin`"
          :rules="{
            required: true,
            message: '请输入奖励钻石数',
          }"
        >
          <el-input
            v-model.number="item.coin"
            placeholder="请输入奖励钻石数"
            clearable
          >
          </el-input>
        </el-form-item>
      </el-col>
      <el-col>
        <el-row v-if="item.live_label">
          <el-col :span="8">
            <el-form-item
              label="直播标签"
              :prop="`${key}.live_label.url`"
              :rules="{
                required: true,
                message: '请上传直播标签',
              }"
            >
              <ImageUpload v-model:url="item.live_label.url"> </ImageUpload>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item
              label="使用天数"
              :prop="`${key}.live_label.time`"
              :rules="{
                required: true,
                message: '请输入使用天数',
              }"
            >
              <el-input
                v-model.number="item.live_label.time"
                placeholder="请输入使用天数"
                clearable
              >
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item
              label="标签名称"
              :prop="`${key}.live_label.name`"
              :rules="{
                required: true,
                message: '请输入标签名称',
              }"
            >
              <el-input
                v-model="item.live_label.name"
                placeholder="请输入标签名称"
                clearable
              >
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-col>
    </el-row>

    <el-button type="primary" :loading="btnLoading" @click="onSubmit"
      >保存</el-button
    >
  </el-form>
</template>

<script lang="ts">
import { jsonClone, setKeysMap } from '@/utils'
import { defineComponent, onMounted, reactive } from 'vue'
import ImageUpload from '@/components/ImageUpload/ImageUpload.vue'
import {
  AnchorRewardConfig,
  AnchorRewardConfigInfo,
  AnchorRewardConfigKey,
} from '../inerface'
import { useForm } from '@/use/useForm'
import { setAnchorRewardConfig } from '../api'
import { ElMessage } from 'element-plus'
import { useFansConfig } from '../use'

function useAnchorRewardConfig() {
  const anchorRewardConfigKeyMap: Record<AnchorRewardConfigKey, string> = {
    first: '第一',
    second: '第二',
    three: '第三',
    four: '第四',
    five: '第五',
  }
  const temp: AnchorRewardConfigInfo = {
    live_label: {
      url: '',
      name: '',
    },
  }
  const anchorRewardConfig = reactive<AnchorRewardConfig>(
    setKeysMap(anchorRewardConfigKeyMap, temp)
  )

  function getKeys(key: string) {
    return anchorRewardConfigKeyMap[key as AnchorRewardConfigKey]
  }
  return {
    anchorRewardConfig,
    getKeys,
  }
}

export default defineComponent({
  name: 'RewardConfig',
  components: {
    ImageUpload,
  },
  setup() {
    const { anchorRewardConfig, getKeys } = useAnchorRewardConfig()
    function assignData() {
      Object.assign(anchorRewardConfig, reward)
    }
    const { reward } = useFansConfig(assignData)
    assignData()
    const { onSubmit, btnLoading, formRef } = useForm(async () => {
      const { msg } = await setAnchorRewardConfig({
        ...anchorRewardConfig,
        act_type: 'ring_fan',
      })
      ElMessage.success(msg)
    })

    onMounted(() => {
      console.log(anchorRewardConfig)
    })

    return {
      anchorRewardConfig,
      getKeys,
      onSubmit,
      btnLoading,
      formRef,
    }
  },
})
</script>

<style lang="scss"></style>
