<script setup lang="ts" name="LoginForm">
  import config from '@/config'
  import { LoginParams } from '@/api/_auth/model'
  import { useMessage } from '@/hooks/web/useMessage'
  import { useLoginByPassword } from '@/hooks/logic/useLogin'
  import type { FormInstance, FormRules } from 'element-plus'
  import { useRouter } from 'vue-router'

  const router = useRouter()
  const { $message } = useMessage()
  const loginForm = reactive<LoginParams>({
    username: '',
    password: '',
    rememberMe: false
  })
  const loginFormRef = ref<FormInstance>()
  const loginRules = reactive<FormRules>({
    username: [{ required: true, message: '请输入账号', trigger: 'blur' }],
    password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
  })
  let loginLoading = $ref<boolean>(false)

  async function doLogin(formEl: FormInstance | undefined) {
    if (!formEl) return
    await formEl.validate(async valid => {
      if (!valid) return false
      loginLoading = true
      const [success, data] = await useLoginByPassword(loginForm)
      console.log(data)
      loginLoading = false
      if (success) {
        $message.success({
          message: '登录成功'
        })
        router.push('/home/index')
      }
    })
  }
</script>

<template>
  <div w="xs" bg="white" px="8" py="6" rounded shadow-xl>
    <h1 text="5xl indigo-4 center" font="bold mono" m="t-lg b-0">
      {{ config.APP.title }}
    </h1>
    <div m="t-16 mt-11" flex="~ col">
      <el-form ref="loginFormRef" :model="loginForm" :rules="loginRules">
        <el-form-item prop="username">
          <el-input
            size="large"
            v-model="loginForm.username"
            placeholder="账号"
          />
        </el-form-item>
        <el-form-item prop="password" :style="{ marginTop: '38px' }">
          <el-input
            v-model="loginForm.password"
            type="password"
            size="large"
            placeholder="密码"
            show-password
            @keyup.enter="doLogin(loginFormRef)"
          />
        </el-form-item>
        <el-form-item>
          <div w="360px" flex justify="between" items="center">
            <el-checkbox v-model="loginForm.rememberMe">记住密码</el-checkbox>
            <span
              text="sm blue-5"
              cursor="pointer"
              @click="$message.info('敬请期待！')"
              >忘记密码？</span
            >
          </div>
        </el-form-item>
        <el-form-item :style="{ marginTop: '50px' }">
          <el-button
            auto-insert-space
            w="full"
            size="large"
            type="primary"
            :loading="loginLoading"
            class="login-btn"
            @click="doLogin(loginFormRef)"
          >
            登录</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<style scoped lang="scss">
  .login-btn {
    --el-color-primary: #818cf8;
    --el-button-hover-border-color: #a5b4fc;
    --el-button-hover-bg-color: #a5b4fc;
  }
</style>
