// 导入 pinia
import { defineStore } from "pinia";
import { ref, computed } from 'vue'

const store = defineStore('UserStore', () => {
  // 全局存储用户名、密码
  const userName = ref('')
  const userPassword = ref('')
  // 进行是否登录的判断，因为没有涉及到后台，所以先暂时用用户名是否大于0进行判断
  const isLogin = computed(() => {
    return userName.value.length > 0
  })

  // 注册用信息，登录使用
  const registUserInfo = (name, password) => {
    userName.value = name
    userPassword.value = password
  }
  // 清除缓存的用户信息，登出使用
  const clearUserInfo = () => {
    userName.value = ''
    userPassword.value = ''
  }
  return { userName, userPassword, isLogin, clearUserInfo, registUserInfo }
})

// 导出 store
export default store