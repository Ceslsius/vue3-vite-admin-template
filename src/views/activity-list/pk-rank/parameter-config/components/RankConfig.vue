<!--
 * @Descripttion: 
 * @Author: Yi Yunwan
 * @Date: 2021-03-11 09:55:12
 * @LastEditors: Yi Yunwan
 * @LastEditTime: 2021-03-22 09:44:58
-->
<template>
  <div>
    <div>段位：</div>
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
    <el-form ref="formRef" :model="rankArr" label-width="80px">
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
            :rules="{
              required: true,
              message: `请输入积分下限`,
              trigger: 'blur',
            }"
            :prop="`[${index}].under`"
          >
            <el-input
              placeholder="积分下限"
              v-model.number="item.under"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item
            label="积分上限"
            :rules="{
              required: true,
              message: `请输入积分上限`,
              trigger: 'blur',
            }"
            :prop="`[${index}].upper`"
          >
            <el-input
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
            <el-upload
              action="#"
              :before-upload="uploadList[index].beforeUpload"
              :show-file-list="false"
              v-if="!item.url"
            >
              <el-button
                size="small"
                type="primary"
                icon="el-icon-upload"
                :loading="uploadList[index].loading"
              >
                点击上传
              </el-button>
            </el-upload>
            <div class="flex" v-else>
              <el-image
                class="rank-image"
                :src="item.url"
                fit="contain"
                :preview-src-list="[item.url]"
              ></el-image>
              <span>
                <el-button
                  class="ml-5"
                  type="danger"
                  icon="el-icon-delete"
                  @click="delImage(index)"
                  circle
                ></el-button>
              </span>
            </div>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item>
            <el-button
              class="ml-15"
              type="danger"
              icon="el-icon-minus"
              v-if="rankArr.length > 1"
              @click="splitRankArr(index)"
              circle
            ></el-button>
            <el-button
              class="ml-15"
              type="primary"
              icon="el-icon-plus"
              v-if="index === rankArr.length - 1"
              @click="addRank"
              circle
            ></el-button>
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
import { defineComponent, reactive, Ref } from 'vue'
import { setPkRankConfig } from '../../api'
import { RankConfigInfo } from '../../intrface'
import { UploadFileRes, useUploadFile } from '@/use/useUploadFile'
import { useFormCache } from '@/use/useFormCache'

interface RankConfigInfoRecord extends RankConfigInfo {
  key: number
}

const baseInfo: RankConfigInfo = {
  name: '',
  under: '',
  upper: '',
  url: '',
}
export default defineComponent({
  name: '',
  setup() {
    const uploadList = reactive<UploadFileRes[]>([])

    const {
      list: rankArr,
      addList: addRank,
      delList: splitRankArr,
    } = useDynamicForm(baseInfo, {
      init() {
        const { loading, beforeUpload } = useUploadFile((value) => {
          rankArr[0].url = value
        })
        uploadList.push({
          loading,
          beforeUpload,
        } as any)
      },
      onAdd(index) {
        const { loading, beforeUpload } = useUploadFile((value) => {
          rankArr[index].url = value
        })
        uploadList.push({
          loading,
          beforeUpload,
        } as any)
      },
      onDel(index) {
        uploadList.splice(index, 1)
      },
    })

    function delImage(index: number) {
      rankArr[index].url = ''
    }
    const { clearFormCache } = useFormCache(rankArr, {
      key: 'PkRankConfig',
      baseIsArray: true,
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
      clearFormCache()
    })
    return {
      formRef,
      btnLoading,
      onSubmit,
      addRank,
      rankArr,
      splitRankArr,
      uploadList,
      delImage,
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
