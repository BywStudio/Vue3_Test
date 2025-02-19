<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import storage from '../../store/storage'

const store = storage()
const router = useRouter()

// 用户名、密码
const name = ref('')
const password = ref('')
const disabled = computed(() => {
  return name.value.length === 0 || password.value.length < 6
})
// 用户登录成功后，会有登录成功后的弹框提示，并且设置3s定时器再跳转到首页路由地址，模拟向后台请求数据延时
function login() {
  store.registUserInfo(name.value, password.value)
  ElMessage({
    type: 'success',
    message: '登录成功',
    duration: 3000
  })
  setTimeout(() => {
    router.push({ name: 'home'})
  }, 3000)
} 
</script>

<template>
  <div id="container">
    <div id="title">
      <h1>电商管理系统</h1>
    </div>
    <div class="input">
      <el-input prefix-icon="User"  v-model="name" placeholder="请输入用户名"></el-input>
    </div>
    <div class="input">
      <el-input prefix-icon="Lock" v-model="password" placeholder="请输入密码" auto-complete="new-password" show-password></el-input>
    </div>
    <div class="input">
      <el-button type="primary" style="width: 30rem" @click="login" :disabled="disabled">登录</el-button>
    </div>
  </div>
</template>

<style scoped>
#title {
  text-align: center;
  /* color: azure; */
  margin-top: 200px;
}
.input{
  width: 30rem;
  margin: 2rem auto;
}
</style>