<!--
 * @Descripttion: 
 * @Author: Yi Yunwan
 * @Date: 2021-03-24 16:24:23
 * @LastEditors: Yi Yunwan
 * @LastEditTime: 2021-04-01 18:53:17
-->
<template>
  <div>
    <el-table
      :data="userRewarTableForm"
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
              <span v-if="scope.row.count.count">
                *{{ scope.row.count.count }}
              </span>
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

    <el-dialog title="用户端配置修改" v-model="visibleRef" width="50%">
      <el-form ref="formRef" :model="pkUserRewarConfig" label-width="110px">
        <el-row type="flex" v-if="type === 'avatar'">
          <el-col :span="14">
            <el-form-item
              label="头像框"
              :prop="`${lebelKey}.avatar.url`"
              :rules="{
                required: true,
                message: '请上传头像框',
                trigger: 'blur',
              }"
            >
              <ImageUpload
                v-model:url="pkUserRewarConfig[lebelKey].avatar.url"
              />
            </el-form-item>
          </el-col>
          <el-col :span="14">
            <el-form-item
              label="头像框名"
              :prop="`${lebelKey}.avatar.name`"
              :rules="{
                required: true,
                message: '请输入头像框名',
                trigger: 'blur',
              }"
            >
              <el-input
                v-model.number="pkUserRewarConfig[lebelKey].avatar.name"
                placeholder="请输入头像框名"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="14">
            <el-form-item
              label="使用时长"
              :rules="useTimeRules"
              :prop="`${lebelKey}.avatar.time`"
            >
              <el-input
                type="number"
                v-model.number="pkUserRewarConfig[lebelKey].avatar.time"
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
        <el-row type="flex" v-if="type === 'vip'">
          <el-col :span="14">
            <el-form-item
              label="会员"
              :prop="`${lebelKey}.vip`"
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
                v-model.number="pkUserRewarConfig[lebelKey].vip"
                placeholder="请输入会员使用时长"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <div class="form-item-tips">
              <i class="el-icon-info"></i>
              使用时长：单位天，1-1000正整数
            </div>
          </el-col>
        </el-row>
        <el-row type="flex" v-if="type === 'gift'">
          <el-col :span="14">
            <el-form-item
              label="礼物"
              :prop="`${lebelKey}.gift.id`"
              :rules="{
                required: true,
                message: '请选择礼物',
                trigger: 'change',
              }"
            >
              <el-select
                style="width: 100%"
                v-model="pkUserRewarConfig[lebelKey].gift.id"
                @change="changeGift(lebelKey)"
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
          <el-col :span="10">
            <div class="form-item-tips">
              <i class="el-icon-info"></i>
              礼物：当前礼物列表所有礼物（幸运礼物除外）
            </div>
          </el-col>
          <el-col :span="14">
            <el-form-item
              label="礼物个数"
              :prop="`${lebelKey}.gift.count`"
              :rules="useTimeRules"
            >
              <el-input
                type="number"
                v-model.number="pkUserRewarConfig[lebelKey].gift.count"
                placeholder="请输入礼物个数（1-1000正整数）"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="14">
            <el-form-item
              label="使用时长"
              :prop="`${lebelKey}.gift.time`"
              :rules="useTimeRules"
            >
              <el-input
                type="number"
                v-model.number="pkUserRewarConfig[lebelKey].gift.time"
                placeholder="请输入使用时长（1-1000正整数）"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <div class="form-item-tips">
              <i class="el-icon-info"></i>
              使用时长：单位小时，1-10000正整数
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
  </div>
</template>

<script lang="ts">
import { useForm } from '@/use/useForm'
import { useGiftList } from '@/use/useGiftList'
import { numberCheck } from '@/utils/check'
import { ElMessage } from 'element-plus'
import { defineComponent, ref } from 'vue'
import { setPkUserRewarConfig } from '../../api'
import { usePkRankSetting } from '../../use/usePkRankSetting'
import ImageUpload from '@/components/ImageUpload/ImageUpload.vue'
import {
  usePkUserRewarConfig,
  UserRewarTableFormInfo,
  useTimeRules,
  useUserRewardTableForm,
} from '../use'
export default defineComponent({
  name: 'UserRewar',
  components: {
    ImageUpload,
  },

  methods: {
    objectSpanMethod({ row, column, rowIndex, columnIndex }: any) {
      if (columnIndex === 0) {
        if (rowIndex === 0) {
          return {
            rowspan: 3,
            colspan: 1,
          }
        } else if (rowIndex > 2 && (rowIndex - 1) % 2 === 0) {
          return {
            rowspan: 2,
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
    const { userReward } = usePkRankSetting(async () => {
      if (Object.keys(userReward).length) {
        Object.assign(pkUserRewarConfig, JSON.parse(JSON.stringify(userReward)))
      }
    })
    const { pkUserRewarConfig } = usePkUserRewarConfig(userReward)

    const { giftList } = useGiftList()

    const { formRef, btnLoading, onSubmit } = useForm(async () => {
      const { msg } = await setPkUserRewarConfig(pkUserRewarConfig as any)
      ElMessage.success(msg)
      visibleRef.value = false
    })

    const { userRewarTableForm } = useUserRewardTableForm(
      pkUserRewarConfig as any
    )

    function changeGift(key: string) {
      const temp = giftList.value.find((item) => {
        return item.id === pkUserRewarConfig[key].gift.id
      })
      pkUserRewarConfig[key].gift.giftname = temp?.giftname
      pkUserRewarConfig[key].gift.url = temp?.url
    }

    const type = ref('')
    const lebelKey = ref('')
    function change(info: UserRewarTableFormInfo) {
      type.value = info.type
      lebelKey.value = info.lebelKey
      visibleRef.value = true
      formRef.value?.clearValidate()
    }

    const visibleRef = ref(false)

    function close() {
      visibleRef.value = false
    }
    return {
      userRewarTableForm,
      pkUserRewarConfig,
      formRef,
      btnLoading,
      onSubmit,
      giftList,
      close,
      visibleRef,
      changeGift,
      change,
      type,
      lebelKey,
      useTimeRules,
      numberCheck,
    }
  },
})
</script>

<style lang="scss"></style>
