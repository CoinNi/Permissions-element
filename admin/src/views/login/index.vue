<template>
<div class="login-container">
  <el-form :model="login" :rules="rules" ref="login" class="demo-ruleForm">
    <el-form-item prop="user">
      <span class="svg-container svg-container_login">
        <svg-icon icon-class="user" />
      </span>
      <el-input type="text" v-model="login.user" auto-complete="on" placeholder="请输入用户名" clearable></el-input>
    </el-form-item>
    <el-form-item prop="pass">
      <span class="svg-container svg-container_login">
        <svg-icon icon-class="user" />
      </span>
      <el-input :type="pwdType" v-model="login.pass" auto-complete="on" placeholder="请输入登录密码" clearable @keyup.enter.native="submitForm('login')"></el-input>
      <span class="show-pwd" @click="showPwd"><svg-icon icon-class="eye" /></span>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" :loading="loading" style="width: 100%" @click.native.prevent="submitForm('login')">提交</el-button>
    </el-form-item>
  </el-form>
</div>
</template>

<script>
import { isvalidUsername } from '@/utils/validate'
export default {
  data() {
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      }
      callback()
    }
    const validateUser = (rule, value, callback) => {
      if (!isvalidUsername(value)) {
        callback(new Error('请输入正确的用户名'))
      }
      callback()
    }
    return {
      pwdType: 'password',
      loading: false,
      login: {
        pass: '',
        user: ''
      },
      rules: {
        pass: [
          { validator: validatePass, trigger: 'blur' },
          { min: 3, max: 10, message: '长度在3--10之间', trigger: 'blur' }
        ],
        user: [
          { validator: validateUser, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('Login', this.login).then(() => {
            this.loading = false
            this.$router.push({ path: '/' })
          }).catch(() => {
            this.loading = false
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    showPwd() {
      if (this.pwdType === 'password') {
        this.pwdType = ''
      } else {
        this.pwdType = 'password'
      }
    }
  }
}
</script>
<style lang="scss">
$dark_gray:#382929;
$light_gray: rgb(10, 0, 0);
.login-container{
  width: 400px;
  margin: 0 auto;
  input {
    background: transparent;
    border: 0px;
    -webkit-appearance: none;
    border-radius: 0px;
    color: $light_gray;
    height: 47px;
  }
  .el-form-item{
    border: 1px solid hsla(0,0%,100%,.1);
    background: rgba(0,0,0,.1);
    border-radius: 5px;
    color: #130202;
    .svg-container {
      color: $dark_gray;
      vertical-align: middle;
      width: 20px;
      padding: 0 5px;
      display: inline-block;
      &_login {
        font-size: 20px;
        .svg-icon {
          width: 20px;
          height: 20px;
        }
      }
    }
    .el-input{
      width: 80%;
      color: black;
      .login-container input {
        background: transparent;
        border: 0;
        -webkit-appearance: none;
        border-radius: 0;
        color: #eee;
        height: 47px;
      }
      .el-input__inner{
        padding: 0;
      }
    }
  }
}
</style>
