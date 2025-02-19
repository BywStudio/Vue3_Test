<script setup>
import { ref, onMounted } from 'vue'
import mock from '../../mock/mock'
import { ElMessage } from 'element-plus';

const getManagerList = ref([])

// 组件加载时渲染 mockjs 随机生成的数据
onMounted(() => {
  getManagerList.value = mock.getManagerList()
});

// 定义筛选条件
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
    state: ''
  },
  getManagerList.value = mock.getManagerList()
  ElMessage({
    type: 'warning',
    message: '清空成功'
  })
}
</script>

<template>
  <div class="content-container" direction="vertical">
    <div>
      <el-container class="content-row">
        <div class="input-tip">店长手机 : </div>
        <div class="input-field">
          <el-input v-model="queryParams.phone"></el-input>
        </div>
        <div class="input-tip">店长昵称 : </div>
        <div class="input-field">
          <el-input v-model="queryParams.name"></el-input>
        </div>
        <div class="input-tip">店长状态 : </div>
        <div class="input-field">
          <el-select style="width: 150px;" placeholder="请选择" v-model="queryParams.state">
            <el-option label="后台开通" :value="1" key="1"></el-option>
            <el-option label="站外申请" :value="2" key="2"></el-option>
          </el-select>
        </div>
      </el-container>
      <el-container class="content-row">
        <el-button type="primary" @click="search">搜索</el-button>
        <el-button type="warning" @click="clear">清空搜索条件</el-button>
      </el-container>
    </div>
    <div>
      <el-table :data="getManagerList">
        <el-table-column label="分销人信息" prop="people"></el-table-column>
        <el-table-column label="微信信息" prop="weixin"></el-table-column>
        <el-table-column label="状态">
          <template #default="scope">
            <el-tag 
            :type="scope.row.state ? 'success' : 'primary'">
            {{ scope.row.state ? '激活' : '审核中' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="收入总额" prop="income"></el-table-column>
        <el-table-column label="退款" prop="backPrice"></el-table-column>
        <el-table-column label="来源">
          <template #default="scope">
            <el-tag type="primary">
              {{ scope.row.source }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="客户数量" prop="customer"></el-table-column>
        <el-table-column label="更新时间" prop="time"></el-table-column>
      </el-table>
    </div>
  </div>
</template>

<style scoped>
  
</style>