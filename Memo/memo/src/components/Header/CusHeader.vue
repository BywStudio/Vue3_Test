<template>
  <header class="custom-header">
    <!-- 左边标题 -->
    <div class="left-box">
      <h1>备忘录应用</h1>
    </div>
    <!-- 右边用户信息 -->
    <div class="right-box">
      <div class="userdv">
        <a target="_blank" href="http://github.com/ruidoc/vue-memo">
          <img src="@/assets/github.png" alt="用户头像" width="26">
        </a>
        <!-- element-plus 下拉框 -->
        <el-dropdown> 
          <span class="text-row">
              <el-icon class="el-icon--right">
                <arrow-down />
              </el-icon>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ArrowDown } from "@element-plus/icons-vue";
import { useRouter } from 'vue-router'
import { ElMessageBox } from "element-plus";

const router = useRouter()
// 从localStorage 获取用户的用户名
const isLogin = localStorage.getItem('user')
const username = localStorage.getItem('user')
// 退出登录
const logout = () => {
  ElMessageBox.confirm(
    '确定要退出登录吗',
    {
      confirmButtonText: '确认',
      cancelButtonText: '取消',
      type: 'warning',
    }
  ).then(() => {
      router.push('/login')
      localStorage.removeItem('user')
    })
}
</script>

<style lang="less">
.custom-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #181818;
  color: #fff;
  height: 55px;
  padding: 0 22px;
  h1 {
    font-size: 22px;
    font-weight: normal;
  }
  .right-box {
    display: flex;
    align-items: center;
    a {
      color: #fff;
      padding-right: 17px;
      // line-height: em;
      text-decoration: none;
      &:hover {
        background-color: transparent;
      }
    }
    .userdv {
      display: inline-flex;
      margin-left: 8px;
      cursor: pointer;
      color: #fff;
      span {
        padding-right: 4px;
        vertical-align: middle;
      }
      .el-icon--right {
        color: #fff;
      }
    }
    .login {
      vertical-align: middle;
      color: #000;
    }
  }
}
</style>