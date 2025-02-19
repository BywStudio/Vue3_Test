<script setup>
import { ref, onMounted } from 'vue'
import mock from '../../mock/mock'
import { ElMessage } from 'element-plus'
// 导入 导出 JSON 数据的方法
import tools from '../../tools/tools'

const getManagerList = ref([])

// 组件加载时渲染 mockjs 随机生成的数据
onMounted(() => {
  getManagerList.value = mock.getManagerList()
});


const queryParams = ref({
    state:"",
    user:"",
    name:"",
    sendTime:"",
    payTime:""
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
    state:"",
    user:"",
    name:"",
    sendTime:"",
    payTime:""
  },
  getManagerList.value = mock.getManagerList()
  ElMessage({
    type: 'warning',
    message: '清空成功'
  })
}
// 导出按钮
function exportData() {
  tools.exportJson('订单.Json', JSON.stringify(getManagerList.value))
}
</script>

<template>
  <div class="content-container">
    <div>
      <el-container class="content-row">
        <div class="input-tip">订单状态</div>
        <div class="input-field">
          <el-input v-model="queryParams.state"></el-input>
        </div>
        <div class="input-tip">订单名称</div>
        <div class="input-field">
          <el-input v-model="queryParams.name"></el-input>
        </div>
        <div class="input-tip">用户名称</div>
        <div class="input-field">
          <el-input v-model="queryParams.user"></el-input>
        </div>
      </el-container>
      <el-container class="content-row">
        <div class="input-tip">发货时间</div>
        <div class="input-field">
        <el-date-picker v-model="queryParams.sendTime"></el-date-picker>
        </div>
        <div class="input-tip">支付时间</div>
        <div class="input-field">
        <el-date-picker v-model="queryParams.payTime"></el-date-picker>
        </div>
      </el-container>
      <el-container class="content-row">
        <el-button type="primary" @click="search">搜索</el-button>
        <el-button type="primary" @click="clear">清空搜索条件</el-button>
        <el-button type="primary" @click="exportData">导出</el-button>
      </el-container>
    </div>
  </div>
  <div>
    <el-table :data="getManagerList">
      <el-table-column label="类型" prop="source"></el-table-column>
      <el-table-column label="名称" prop="weixin"></el-table-column>
      <el-table-column label="订单号" prop="weixin"></el-table-column>
      <el-table-column label="店长信息" prop="people"></el-table-column>
      <el-table-column label="件数" prop="customer"></el-table-column>
      <el-table-column label="价格" prop="backPrice"></el-table-column>
      <el-table-column label="佣金" prop="back"></el-table-column>
      <el-table-column label="支付时间" prop="time"></el-table-column>
      <el-table-column label="发货时间" prop="time"></el-table-column>
    </el-table>
  </div>
</template>

<style scoped>
  
</style>