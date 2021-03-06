<!--
 * @Descripttion: 基础配置 
 * @Author: Zhang Yunzhong
 * @Date: 2021-03-11 09:55:12
 * @LastEditors: Zhang Yunzhong
 * @LastEditTime: 2021-04-06 14:09:46
-->
<template>
  <div style="">
    <el-form ref="formRef" :model="form" label-width="90px">
      <el-row type="flex">
        <el-col :span="8">
          <el-form-item
            label="pk有效值"
            :rules="[
              {
                required: true,
                message: '请输入pk有效值',
                trigger: 'blur',
              },
              {
                validator: numberCheck,
                required: true,
                trigger: 'blur',
              },
            ]"
            prop="effective_value"
          >
            <el-input
              v-model.number="form.effective_value"
              placeholder="请输入pk有效值"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="16">
          <span class="form-item-tips">
            <i class="el-icon-info"></i>
            1-1000正整数
          </span>
        </el-col>
      </el-row>
      <el-row type="flex">
        <el-col :span="8">
          <el-form-item
            label="首胜积分"
            prop="first_win"
            :rules="{
              required: true,
              message: '请输入首胜积分',
              trigger: 'blur',
            }"
          >
            <el-input
              v-model="form.first_win"
              placeholder="请输入首胜积分"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="16">
          <span class="form-item-tips">
            <i class="el-icon-info"></i>
            1-1000正整数
          </span>
        </el-col>
      </el-row>

      <el-row
        type="flex"
        v-for="(item, index) in winningStreakList"
        :key="index"
      >
        <el-col :span="8">
          <el-form-item
            label="连胜积分"
            :rules="[
              {
                required: true,
                message: '请输入连胜积分',
                trigger: 'blur',
              },
              {
                validator: winningStreakCheck,
                trigger: 'blur',
              },
            ]"
            :prop="`winningStreakList.${index}.value`"
          >
            <el-input
              v-model="item.value"
              placeholder="请输入连胜积分（示例：3,10）"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="16">
          <el-button
            class="ml-15"
            type="danger"
            v-if="winningStreakList.length > 1"
            @click="delWinningStreak(index)"
          >
            删除
          </el-button>
          <el-button
            class="ml-15"
            type="primary"
            v-if="winningStreakList.length === index + 1"
            @click="addWinningStreak"
          >
            添加
          </el-button>
          <span class="form-item-tips">
            <i class="el-icon-info"></i>
            格式为：场次,额外增加的积分，场次：1-50正整数；积分：1-1000正整数，中间使用英文逗号隔开
          </span>
        </el-col>
      </el-row>

      <el-row type="flex" v-for="(item, index) in singleGameList" :key="index">
        <el-col :span="8">
          <el-form-item
            label="单场积分"
            :prop="`singleGameList.${index}.value`"
            :rules="[
              {
                required: true,
                message: '请输入单场积分',
                trigger: 'blur',
              },
              {
                validator: singleGameCheck,
                trigger: 'blur',
              },
            ]"
          >
            <el-input
              v-model="item.value"
              placeholder="请输入单场积分（示例：3,10）"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="16">
          <el-button
            class="ml-15"
            type="danger"
            v-if="singleGameList.length > 1"
            @click="delSingleGame(index)"
          >
            删除
          </el-button>
          <el-button
            class="ml-15"
            type="primary"
            v-if="singleGameList.length === index + 1"
            @click="addSingleGame"
          >
            添加
          </el-button>
          <span class="form-item-tips">
            <i class="el-icon-info"></i>
            格式为：单场pk任意一方pk值,额外增加的积分，pk值：1-50000正整数；积分：1-1000正整数，中间使用英文逗号隔开
          </span>
        </el-col>
      </el-row>

      <el-form-item>
        <el-button type="primary" @click="onSubmit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { useForm } from '@/use/useForm'
import { useDynamicForm } from '@/use/useDynamicForm'
import { ElMessage } from 'element-plus'
import { defineComponent, reactive, nextTick } from 'vue'
import { setPkBaseConfig } from '../../api'
import type { PkBaseCofigData } from '../../intrface'
import { isInt } from '@/utils/validate'
import { useFormCache } from '@/use/useFormCache'
import { usePkRankSetting } from '../../use/usePkRankSetting'

interface CustomFormData extends PkBaseCofigData {
  winningStreakList: { value: string; key: number }[]
  singleGameList: { value: string; key: number }[]
}

export default defineComponent({
  name: '',
  data() {
    const winningStreakCheck = (
      rule: any,
      value: string,
      callback: (error?: Error) => void
    ) => {
      const tempArr = value.split(',')
      if (tempArr.length !== 2) {
        return callback(
          new Error('格式错误,请输入两个数字,中间使用英文逗号隔开')
        )
      } else {
        const session = Number(tempArr[0])
        if (session < 1 || session > 50 || !isInt(session)) {
          return callback(new Error('场次为1-50的正整数'))
        }
        const integral = Number(tempArr[1])
        if (integral < 1 || integral > 1000 || !isInt(integral)) {
          return callback(new Error('积分为1-1000的正整数'))
        }
      }
      return callback()
    }

    const singleGameCheck = (
      rule: any,
      value: string,
      callback: (error?: Error) => void
    ) => {
      const tempArr = value.split(',')
      if (tempArr.length !== 2) {
        return callback(
          new Error('格式错误,请输入两个数字,中间使用英文逗号隔开')
        )
      } else {
        const pkValue = Number(tempArr[0])
        if (pkValue < 1 || pkValue > 50000 || !isInt(pkValue)) {
          return callback(new Error('场次为1-50000的正整数'))
        }
        const integral = Number(tempArr[1])
        if (integral < 1 || integral > 1000 || !isInt(integral)) {
          return callback(new Error('积分为1-1000的正整数'))
        }
      }
      return callback()
    }

    const numberCheck = (
      rule: any,
      value: number,
      callback: (error?: Error) => void
    ) => {
      if (value < 1 || value > 1000 || !isInt(value)) {
        return callback(new Error('请输入1-1000的正整数'))
      }
      return callback()
    }
    return {
      winningStreakCheck,
      numberCheck,
      singleGameCheck,
    }
  },
  setup() {
    const {
      list: winningStreakList,
      addList: addWinningStreak,
      delList: delWinningStreak,
    } = useDynamicForm({
      value: '',
    })
    const {
      list: singleGameList,
      addList: addSingleGame,
      delList: delSingleGame,
    } = useDynamicForm({
      value: '',
    })
    const { baseConfig } = usePkRankSetting(async () => {
      if (Object.keys(baseConfig).length) {
        canCache.value = false
        Object.assign(form, JSON.parse(JSON.stringify(baseConfig)))
        initList(1)
        await nextTick()
        canCache.value = true
      }
    })

    const form = reactive<CustomFormData>({
      effective_value: baseConfig.effective_value,
      first_win: baseConfig.first_win,
      winning_streak: baseConfig.winning_streak || [],
      single_game: baseConfig.single_game || [],
      winningStreakList,
      singleGameList,
    })

    function initList(type?: 1) {
      canCache.value = false
      form.winningStreakList = Object.assign(
        winningStreakList,
        form.winningStreakList
      )
      type &&
        form.winning_streak.forEach((item, index) => {
          winningStreakList[index] = {
            key: index,
            value: `${item.session},${item.integral}`,
          }
        })
      form.singleGameList = Object.assign(singleGameList, form.singleGameList)
      type &&
        form.single_game.forEach((item, index) => {
          singleGameList[index] = {
            key: index,
            value: `${item.pk_value},${item.integral}`,
          }
        })
    }

    const { clearFormCache, canCache } = useFormCache(form, {
      key: 'PkBaseConfig',
      onRecovery() {
        initList()
      },
    })

    const { btnLoading, formRef, onSubmit } = useForm(async () => {
      form.winning_streak = winningStreakList.map((item) => {
        const temp = item.value.split(',')
        return {
          session: Number(temp[0]),
          integral: Number(temp[1]),
        }
      })
      form.single_game = singleGameList.map((item) => {
        const temp = item.value.split(',')
        return {
          pk_value: Number(temp[0]),
          integral: Number(temp[1]),
        }
      })
      const { effective_value, first_win, winning_streak, single_game } = form
      const { msg } = await setPkBaseConfig({
        effective_value,
        first_win,
        winning_streak,
        single_game,
      })
      ElMessage.success(msg)
      clearFormCache()
    })
    initList(1)
    return {
      btnLoading,
      formRef,
      onSubmit,
      form,
      winningStreakList,
      addWinningStreak,
      delWinningStreak,
      singleGameList,
      addSingleGame,
      delSingleGame,
    }
  },
})
</script>

<style></style>
