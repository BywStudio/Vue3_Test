<script setup lang="ts">
import { ref } from 'vue'
import { ArrowRight } from "@element-plus/icons-vue";
import { ElMessage } from "element-plus";
// 导入 Pinia 状态管理
import userStore  from '../stores/user'
// 导入路由
import { useRouter } from 'vue-router'

// 创建 store 
const store = userStore()
// 创建路由
const router = useRouter()
const isLogin = ref(true)
// 默认按钮为没有加载动画
const loading = ref(false)
// 将 store.form 对象赋值给 form
const form = store.form
const register = store.register
const login = store.login
// 点击提交按钮后的判断函数 
const submitForm = () => {
  // 判断手机号、密码是否为空
  if(form.phone === '' || form.password === '') {
    return ElMessage({
      type: 'warning',
      message: '手机号和密码不能为空'
    })
  }
  // 判断手机号(11位，必须数字)
  if(form.phone.length != 11 || isNaN(Number(form.phone))){
    return ElMessage({
      type: 'warning',
      message: '请输入正确的手机号'
    })
  }
  // 判断密码的格式
  if(form.password.length < 6){
    return ElMessage({
      type: 'warning',
      message: '密码不能小于6位'
    })
  }
  // 在注册的情况下判断两次密码是否输入一直
  if(!isLogin.value){
    if(form.password !=form.conformPassword){
      return ElMessage({
        type: 'warning',
        message: '两次密码输入不一致'
      })
    }
  }
  // 点击注册后，将用户名、手机号、密码保存在 localStorage 中
  if(!isLogin.value){
    register()
  }
  // 在登录模式下，判断用户名手机号和密码是否错误，正确则登录成功，错误则弹出提示消息
  if(isLogin.value) {
    login()
    router.push('/')
  }
}
// 点击切换登录、注册
const toogleLogin = () => {
  isLogin.value = !isLogin.value
}


</script>

<template>
  <div class="login-page">
    <el-form class="el-form">
      <!-- 1.判断是注册还是登录 -->
      <h2 class="title">{{ isLogin ? "登录" : "注册" }}</h2>
      <!-- 2.如果是登录的话，就不显示用户名、确认密码 -->
       <!-- 3.下面的用户名、手机号、密码、确认密码都需要使用 v-model 双向数据绑定 -->
      <el-form-item v-if="!isLogin">
        <el-input placeholder="用户名" v-model="form.username"/>
      </el-form-item>
      <el-form-item >
        <el-input placeholder="手机号" v-model="form.phone"/>
      </el-form-item>
      <el-form-item >
        <el-input placeholder="密码" type="password" v-model="form.password" show-password/>
      </el-form-item>
      <el-form-item v-if="!isLogin">
        <el-input placeholder="确认密码" type="password" v-model="form.conformPassword" show-password/>
      </el-form-item>
      <el-form-item>
        <!-- 在提交表单时，要判断 手机号(11位)、密码是否为空、格式是否错误，方法为 submitForm()  -->
         <!-- 空：弹出提示信息（不能为空） -->
          <!-- 错误：弹出提示信息 -->
        <el-button class="login-btn" @click="submitForm">{{ isLogin ? "登录" : "注册"}}</el-button>
        <div class="text-row">
          {{isLogin ? '还没有账号? 点击去' : '已经有账号, 点击去'}} 
          <a href="#" @click="toogleLogin">{{ isLogin ? '注册' : '登录' }}</a></div>
      </el-form-item>
    </el-form>
  </div>
</template>

<style lang="less">
.login-page {
  margin: 22vh auto;
  .el-form {
    width: 360px;
    background-color: #fff;
    padding: 30px 50px 10px 50px;
    border-radius: 7px;
    margin: 20px auto;
    box-shadow: var(--el-box-shadow);
    .title {
      text-align: center;
      margin-bottom: 18px;
    }
    .login-btn {
      margin-top: 14px;
      width: 100%;
    }
    .text-row {
      text-align: center;
      width: 100%;
      margin-top: 20px;
    }
  }
}
</style>