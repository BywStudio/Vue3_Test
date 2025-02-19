import { defineStore } from 'pinia'
import { ElMessage } from "element-plus";
import { localGetItem, localSetItem } from '@/utils';

const userStore = defineStore('user', {
  state: () => ({
    form: {
      username: '',
      phone: '',
      password: '',
      conformPassword: ''
    }
  }),
  actions: {
    // 用户注册函数
    register (){
      localStorage.setItem('user', this.form.username)
      localStorage.setItem('phone', this.form.phone)
      localStorage.setItem('password', this.form.password)
      ElMessage({
        type: 'success',
        message: '注册成功'
      })
    },
    // 用户登录函数
    login() {
      let regis_phone = localGetItem('phone')
      let regis_password = localGetItem('password')
      if(!regis_phone) {
        return ElMessage({
          type: 'error',
          message: '请先注册'
        })
      }else {
        if(localStorage.getItem('phone') === regis_phone && localStorage.getItem('password') === regis_password ){
          ElMessage({
            type: 'success',
            message: '登录成功'
          })
        }else {
          ElMessage({
            type: 'error',
            message: '手机或密码错误'
          })
        }
      }
    },
    getUser() {
      let data = localGetItem("login_user");
      if (data) {
        this.form = data;
      }
    },
  }
})

export default userStore
