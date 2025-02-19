<script setup>
import { ref, onMounted } from 'vue'
import mock from '../../mock/mock'
import { ElMessage } from 'element-plus'

const getManagerList = ref([])

// 组件加载时渲染 mockjs 随机生成的数据
onMounted(() => {
  getManagerList.value = mock.getManagerList()
});


const queryParams = ref({
  phone: '',
  name: '',
  state: ''
})

// 定义搜索函数
function search (){
  ElMessage({
    type: 'success',
    message: '搜索成功'
  })
  getManagerList.value = mock.getManagerList()
}
// 清空搜索按钮
function clear() {
  queryParams.value = {
    phone: '',
    name: '',
  },
  getManagerList.value = mock.getManagerList()
  ElMessage({
    type: 'warning',
    message: '清空成功'
  })
}
</script>

<template>
  <div class="content-container">
    <div>
      <el-container class="content-row">
        <div class="input-tip">用户状态</div>
        <div class="input-field">
          <el-input v-model="queryParams.name"></el-input>
        </div>
        <div class="input-tip">用户信息</div>
        <div class="input-field">
          <el-input v-model="queryParams.state"></el-input>
        </div>
      </el-container>
      <el-container class="content-row">
        <el-button type="primary" @click="search">搜索</el-button>
        <el-button type="primary" @click="clear">清空搜索条件</el-button>
      </el-container>
    </div>
  </div>
  <div>
    <el-table :data="getManagerList">
      <el-table-column label="用户信息" prop="people"></el-table-column>
      <el-table-column label="状态">
        <template #default="scope">
          <el-tag :type="scope.row.state ? 'success' : 'warning'">
            {{ scope.row.state ? '通过' : '待审核'}}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="更新时间"></el-table-column>
      <el-table-column label="添加时间"></el-table-column>
      <el-table-column label="操作">
        <template #default="scope">
          <el-button 
          :type="scope.row.state ? 'warning' : 'success'"
          @click="scope.row.state = !scope.row.state "
          size="small"
          >
          {{ scope.row.state ? '下线' : '通过' }}</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<style scoped>
  
</style>