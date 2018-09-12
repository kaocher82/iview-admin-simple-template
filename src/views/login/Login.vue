<template>
  <div class="login" @keydown.enter="handleSubmit">
    <div class="login-con">
      <Card icon="log-in" title="欢迎登录" :bordered="false">
        <div class="form-con">
          <LoginForm @on-success-valid="handleSubmit"></LoginForm>
          <p class="login-tip">输入任意用户名和密码即可</p>
        </div>
      </Card>
    </div>
  </div>
</template>

<script>
import LoginForm from '../../components/login-form/LoginForm'

export default {
  components: {
    LoginForm
  },
  methods: {
    handleSubmit () {
      this.$router.push('/')
    }
  }
}
</script>

<style lang="less" scoped>
.login {
  width: 100%;
  height: 100%;
  background-size: cover;
  background: url('https://file.iviewui.com/iview-admin/login_bg.jpg') center;
  position: relative;
  &-con {
    position: absolute;
    right: 160px;
    top: 50%;
    transform: translateY(-60%);
    width: 300px;
    &-header {
      font-size: 16px;
      font-weight: 300;
      text-align: center;
      padding: 30px 0;
    }
    .form-con {
      padding: 10px 0 0;
    }
    .login-tip {
      font-size: 10px;
      text-align: center;
      color: #c3c3c3;
    }
  }
}
</style>