<script setup>
import{ ref } from 'vue'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'

const router = useRouter()
const queryParams = ref({
  marketPrice: 0,
  showPrice: 0,
  coin: 0,
  price: 0,
  limit: 0,
  count: 0,
  sellCount: 0,
  viewCount: 0
})
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
  <div class="title">
    <div>价格设置</div>
  </div>
  <el-container class="content-row">
    <div class="input-tip">市场价: </div>
    <div class="input-field">
      <el-input v-model="queryParams.marketPrice"></el-input>
    </div>
  </el-container>
  <el-container class="content-row">
    <div class="input-tip">展示价: </div>
    <div class="input-field">
      <el-input v-model="queryParams.showPrice"></el-input>
    </div>
  </el-container>
  <el-container class="content-row">
    <div class="input-tip">积分数: </div>
    <div class="input-field">
      <el-input v-model="queryParams.coin"></el-input>
    </div>
  </el-container>
  <el-container class="content-row">
    <div class="input-tip">成本价: </div>
    <div class="input-field">
      <el-input v-model="queryParams.price"></el-input>
    </div>
  </el-container>
  <el-container class="content-row">
    <div class="input-tip">限购数: </div>
    <div class="input-field">
      <el-input v-model="queryParams.limit"></el-input>
    </div>
  </el-container>
  <div class="title">
    <div>库存设置</div>
  </div>
  <el-container class="content-row">
    <div class="input-tip">库存数量: </div>
    <div class="input-field">
      <el-input v-model="queryParams.count"></el-input>
    </div>
  </el-container>
  <el-container class="content-row">
    <div class="input-tip">基础销量: </div>
    <div class="input-field">
      <el-input v-model="queryParams.sellCount"></el-input>
    </div>
  </el-container>
  <el-container class="content-row">
    <div class="input-tip">浏览数量: </div>
    <div class="input-field">
      <el-input v-model="queryParams.viewCount"></el-input>
    </div>
  </el-container>
  <el-container class="content-row">
    <el-button type="success" plain @click="submit">提交</el-button>
    <div style="margin-left: 40px;"></div>
    <el-button type="warning" plain @click="cancel">取消</el-button>
  </el-container>
</template>

<style scoped>
.title {
  background-color: #e1e1e1;
  height: 35px;
  line-height: 35px;
  padding-left: 20px;
  margin-bottom: 15px;
}
</style>