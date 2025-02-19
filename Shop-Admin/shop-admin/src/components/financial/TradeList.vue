<script setup>
import { ref, onMounted } from 'vue'
import mock from '../../mock/mock'

const activeTab = ref("1")

let List = mock.getManagerList()

function month() {
  List.value = mock.getManagerList()
}
</script>

<template>
  <div class="content-container">
    <el-tabs v-model="activeTab" type="card">
      <el-tab-pane label="日汇总" name="1">
        <el-table :data="List">
          <el-table-column label="日期" prop="time"></el-table-column>
          <el-table-column label="收入" prop="backPrice"></el-table-column>
          <el-table-column label="支出" prop="back"></el-table-column>
          <el-table-column label="备注" prop="source"></el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="月汇总" name="2" @click="month">
        <el-table :data="List">
          <el-table-column label="日期" prop="time"></el-table-column>
          <el-table-column label="收入" prop="income"></el-table-column>
          <el-table-column label="支出" prop="backPrice"></el-table-column>
          <el-table-column label="备注" prop="people"></el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<style scoped>
  
</style>