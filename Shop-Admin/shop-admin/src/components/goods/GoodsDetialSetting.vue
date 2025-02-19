<script setup>
import GoodsEdit from './GoodsEdit.vue'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus';

const router = useRouter()
const content = ref('');

// 富文本组件内容变化的回调，用 c 接收从子组件传递过来的 editorContent.value 的值
function contentChange(c) {
  // 将  editorContent.value 赋值给父组件的 content.value
  // 实现 子 --> 父数据共享
  content.value = c
}

// 提交按钮
function submit() {
  ElMessage({
    type: 'success',
    message: '提交成功'
  })
}
// 取消按钮，其实就是往后退一步,用 router.go 方法实现
function cancel() {
  router.go(-1)
  ElMessage({
    type: 'warning',
    message: '取消成功'
  })
}
</script>

<template>
  <div style="margin-bottom: 20px;">
    <!-- 绑定子组件的自定义事件相对的事件处理函数，只要子组件数据变化，则触发 contentChange 函数 -->
    <GoodsEdit @contentChange="contentChange"/>
  </div>
  <el-container class="content-row">
    <el-button type="success" plain @click="submit">提交</el-button>
    <div style="margin-left: 40px;"></div>
    <el-button type="warning" plain @click="cancel">取消</el-button>
  </el-container>
</template>

<style>
  
</style>