<!--
 * @Descripttion: 
 * @Author: Zhang Yunzhong
 * @Date: 2021-03-17 14:12:44
 * @LastEditors: Zhang Yunzhong
 * @LastEditTime: 2021-04-12 11:38:03
-->
<template>
  <el-upload
    action="#"
    :before-upload="beforeUpload"
    :show-file-list="false"
    v-if="!url"
    :disabled="loading"
  >
    <el-button
      size="small"
      type="primary"
      icon="el-icon-upload"
      :loading="loading"
    >
      点击上传
    </el-button>
  </el-upload>
  <div class="flex" v-else>
    <el-image
      class="form-image"
      :src="url"
      fit="contain"
      :preview-src-list="[url]"
    ></el-image>
    <span>
      <el-button
        class="ml-5"
        type="danger"
        icon="el-icon-delete"
        @click="delImage"
        circle
      ></el-button>
    </span>
  </div>
</template>

<script lang="ts">
import { useUploadFile } from '@/use/useUploadFile'
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'ImageUpload',
  props: {
    url: {
      required: true,
      type: String,
    },
  },
  setup(props, content) {
    const { loading, beforeUpload } = useUploadFile((value) => {
      content.emit('update:url', value)
      content.emit('change', value)
    })
    function delImage() {
      content.emit('update:url', '')
      content.emit('change', '')
    }
    return {
      loading,
      beforeUpload,
      delImage,
    }
  },
})
</script>

<style lang="scss"></style>
