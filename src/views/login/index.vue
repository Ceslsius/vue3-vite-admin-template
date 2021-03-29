<template>
  <div class="login-container">
    <el-form
      ref="formRef"
      class="login-form"
      autocomplete="on"
      label-position="left"
    >
      <div class="title-container">
        <h3 class="title">TakTak活动系统</h3>
      </div>

      <el-form-item prop="username">
        <el-input
          type="text"
          autocomplete="on"
          prefix-icon="el-icon-user-solid"
          placeholder="请输入账号"
          v-model="form.username"
        />
      </el-form-item>

      <el-form-item prop="password">
        <el-input
          prefix-icon="el-icon-user-solid"
          placeholder="请输入密码"
          autocomplete="on"
          v-model="form.password"
        />
        <span class="show-pwd"> </span>
      </el-form-item>

      <el-button
        type="primary"
        :loading="btnLoading"
        @click="onSubmit"
        @keyup.enter="onSubmit"
        style="width: 100%; margin-bottom: 30px"
      >
        {{ btnLoading ? '登录中' : '登录' }}
      </el-button>
    </el-form>
  </div>
</template>

<script lang="ts">
import { login } from '@/api'
import { useForm } from '@/use/useForm'
import { adminStorage } from '@/utils'
import { defineComponent, reactive } from 'vue'
import { useRoute, useRouter } from 'vue-router'

export default defineComponent({
  name: 'App',
  data() {
    return {
      passwordType: '',
      username: '',
      password: '',
    }
  },
  methods: {},
  setup() {
    const form = reactive({
      username: '',
      password: '',
    })
    const router = useRouter()
    const route = useRoute()

    const { formRef, btnLoading, onSubmit } = useForm(async () => {
      const { data } = await login(form)
      adminStorage.setItem('token', data.user_info.token)
      adminStorage.setItem('uid', data.user_info.id)
      adminStorage.setItem('username', data.user_info.username)
      router.replace({
        path: (route.query.redirect as string) || '/',
      })
    })
    return {
      formRef,
      btnLoading,
      onSubmit,
      form,
    }
  },
})
</script>

<style lang="scss">
// References: https://www.zhangxinxu.com/wordpress/2018/01/css-caret-color-first-line/
@supports (-webkit-mask: none) and (not (cater-color: $loginCursorColor)) {
  .login-container .el-input {
    input {
      color: $loginCursorColor;
    }
    input::first-line {
      color: $lightGray;
    }
  }
}

.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      height: 47px;
      background: transparent;
      border: 0px;
      border-radius: 0px;
      color: $lightGray;
      caret-color: $loginCursorColor;
      -webkit-appearance: none;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $loginBg inset !important;
        -webkit-text-fill-color: #fff !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style lang="scss" scoped>
.login-container {
  height: 100vh;
  width: 100%;
  overflow: hidden;
  background-color: $loginBg;

  .login-form {
    position: relative;
    width: 420px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $lightGray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }
}
</style>
