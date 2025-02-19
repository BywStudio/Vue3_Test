<script setup>
import { ref } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'

const categoryList = ref([
  {id: 1231, name: '男装', manager: '管理员用户01'},
  {id: 1131, name: '男鞋', manager: '管理员用户01'},
  {id: 1031, name: '帽子', manager: '管理员用户01'},
])

// 添加分类按钮，向 categoryList 数组中添加新对象
function handleClick() {
  ElMessageBox.prompt('请添加分类', '新增分类',{
    confirmButtonText: 'OK',
    cancelButtonText: 'Cancel',
  }).then(({value}) => {
    categoryList.value.push({
      id: 1000,
      name: value,
      manger: '管理员用户01'
    })
  })
}
// 删除按钮, 从 categoryList 数组中删除对象
function deleteCategory() {
  ElMessageBox.alert('确认要删除吗', {
    confirmButtonText: 'OK',
    cancelButtonText: 'Cancel',
  }).then((index) => {
    categoryList.value.splice(index, 1)
  })
}
</script>

<template>
  <div class="content-container">
    <div class="content-row">
      <el-button type="primary" @click="handleClick">添加分类</el-button>
    </div>
    <div class="content-row" >
      <el-table :data="categoryList">
        <el-table-column label="分类ID" prop="id"></el-table-column>
        <el-table-column label="分类名称" prop="name"></el-table-column>
        <el-table-column label="分类负责人" prop="manager"></el-table-column>
        <el-table-column label="操作">
          <template #default="scope">
            <el-button @click="deleteCategory(scope.$index)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<style scoped>
  
</style>
