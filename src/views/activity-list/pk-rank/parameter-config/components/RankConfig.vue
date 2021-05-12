<!--
 * @Descripttion: 
 * @Author: Zhang Yunzhong
 * @Date: 2021-03-11 09:55:12
 * @LastEditors: Zhang Yunzhong
 * @LastEditTime: 2021-04-06 14:14:33
-->
<template>
  <div>
    <div class="ml-15 mb-15 text-12">
      <div class="form-item-tips">
        <i class="el-icon-info"></i>
        段位名： 1-10字符；
      </div>
      <div class="form-item-tips">
        <i class="el-icon-info"></i>
        积分上限： 正整数，
        且当前段位积分上限需大于前一段位,小于后任一段位，-1表示无上限；
      </div>
      <div class="form-item-tips">
        <i class="el-icon-info"></i>
        段位图： 文件仅支持png/jpg/gif/svga/pag格式，大小不超过200kb。
      </div>
      <div class="form-item-tips">
        <i class="el-icon-info"></i>
        段位记录: 至少存在1条记录，上限100条
      </div>
    </div>
  </div>
  <div>
    <el-form ref="formRef" :model="rankArr" label-width="90px">
      <el-row type="flex" v-for="(item, index) in rankArr" :key="item.key">
        <el-col :span="5">
          <el-form-item
            label="段位名"
            :rules="{
              required: true,
              message: `请输入段位名`,
              trigger: 'blur',
            }"
            :prop="`[${index}].name`"
          >
            <el-input placeholder="段位名" v-model="item.name"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item
            label="积分下限"
            :rules="[
              {
                required: true,
                message: `请输入积分下限`,
                trigger: 'blur',
              },
              {
                validator: numberCheck,
                trigger: 'blur',
                min: 0,
                max: 9999999,
                isInt: true,
              },
              {
                validator: integralCheck,
                type: 'under',
                index,
                trigger: 'blur',
              },
            ]"
            :prop="`[${index}].under`"
          >
            <el-input
              type="number"
              placeholder="积分下限"
              v-model.number="item.under"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item
            label="积分上限"
            :rules="[
              {
                required: true,
                message: `请输入积分上限`,
                trigger: 'blur',
              },
              {
                validator: numberCheck,
                trigger: 'blur',
                min: 1,
                max: 9999999,
                isInt: true,
                includeArr: [-1],
              },
              {
                validator: integralCheck,
                type: 'upper',
                index,
              },
            ]"
            :prop="`[${index}].upper`"
          >
            <el-input
              type="number"
              placeholder="积分上限"
              v-model.number="item.upper"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item
            label="段位图"
            :rules="{
              required: true,
              message: `请上传段位图`,
              trigger: 'blur',
            }"
            :prop="`[${index}].url`"
          >
            <ImageUpload v-model:url="rankArr[index].url" />
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item>
            <el-button
              class="ml-15"
              type="danger"
              v-if="rankArr.length > 1"
              @click="splitRankArr(index)"
              >删除</el-button
            >
            <el-button
              class="ml-15"
              type="primary"
              v-if="index === rankArr.length - 1"
              @click="addRank"
              >添加</el-button
            >
          </el-form-item>
        </el-col>
      </el-row>

      <el-form-item>
        <el-button type="primary" @click="onSubmit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { useDynamicForm } from '@/use/useDynamicForm'
import { useForm } from '@/use/useForm'
import { ElMessage } from 'element-plus'
import { defineComponent, nextTick, reactive, Ref } from 'vue'
import { setPkRankConfig } from '../../api'
import { RankConfigInfo } from '../../intrface'
import { useFormCache } from '@/use/useFormCache'
import { usePkRankSetting } from '../../use/usePkRankSetting'
import ImageUpload from '@/components/ImageUpload/ImageUpload.vue'
import { numberCheck } from '@/utils/check'

const baseInfo: RankConfigInfo = {
  name: '',
  under: undefined,
  upper: undefined,
  url: '',
}

interface IntegralCheckRule {
  type: 'upper' | 'under'
  index: number
}
export default defineComponent({
  name: '',
  components: {
    ImageUpload,
  },
  setup() {
    const {
      list: rankArr,
      addList: addRank,
      delList: splitRankArr,
    } = useDynamicForm(baseInfo)

    const { rankConfig } = usePkRankSetting(async () => {
      if (Object.keys(rankConfig).length) {
        await nextTick()
        Object.assign(
          rankArr,
          JSON.parse(JSON.stringify(rankConfig.rank || []))
        )
      }
    })

    const { formRef, btnLoading, onSubmit } = useForm(async () => {
      const rank = JSON.parse(JSON.stringify(rankArr)) as Array<any>
      rank.forEach((item) => {
        delete item.key
      })
      const { msg } = await setPkRankConfig({
        rank,
      })
      ElMessage.success(msg)
    })
    function integralCheck(
      rule: IntegralCheckRule,
      value: number,
      callback: (error?: Error) => void
    ) {
      if (value === -1) {
        return callback()
      }
      const temp = rankArr[rule.index]
      const pretemp = rankArr[rule.index - 1]
      const nexttemp = rankArr[rule.index + 1]
      if (
        temp.upper != -1 &&
        temp.under &&
        temp.upper &&
        temp.under >= temp.upper
      ) {
        return callback(new Error('积分下限不得大于等于积分上限'))
      }
      if (
        pretemp &&
        pretemp.upper &&
        temp.under &&
        pretemp.upper >= temp.under &&
        rule.type === 'under'
      ) {
        return callback(new Error('积分下限不得小于等于上条数据积分上限'))
      }
      if (
        nexttemp &&
        nexttemp.under &&
        temp.upper &&
        temp.upper >= nexttemp.under &&
        rule.type === 'upper'
      ) {
        return callback(new Error('积分下限不得小于等于上条数据积分上限'))
      }
      return callback()
    }
    return {
      formRef,
      btnLoading,
      onSubmit,
      addRank,
      rankArr,
      splitRankArr,
      numberCheck,
      integralCheck,
    }
  },
})
</script>

<style lang="scss" scoped>
.rank-image {
  min-width: 100px;
  width: 100px;
  height: 100px;
  background: #ddd;
}
</style>
