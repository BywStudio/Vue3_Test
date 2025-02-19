<script setup>
import BaseSetting from './GoodsBaseSettings.vue'
import PriceSetting from './GoodsPriceSetting.vue'
import DetailSetting from './GoodsDetialSetting.vue'
import { ref } from 'vue'

const activeTab = ref("1")
function handleClick(idx) {

}
</script>

<template>
  <div class="content-container">
    <el-tabs v-model="activeTab" type="card">
      <el-tab-pane label="基础设置" name="1">
        <BaseSetting />
      </el-tab-pane>
      <el-tab-pane label="价格库存" name="2">
        <PriceSetting />
      </el-tab-pane>
      <el-tab-pane label="商品详情" name="3">
        <DetailSetting />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<style>
  
</style>