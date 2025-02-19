<script setup>
import { ref } from 'vue'
import { ElMessage } from 'element-plus';
import { useRouter } from 'vue-router'

const router = useRouter()

const queryParams = ref({
  name: '',
  dess:'',
  timeRange: '',
  category: 0
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
// 店家添加分类按钮跳转到 商品分类页面
function ToRouter(){
  router.push({ name: 'GoodsCategory' })
}
</script>

<template>
  <div>
    <el-container class="content-row">
      <div class="input-tip">商品名称</div>
      <div class="input-field">
        <el-input v-model="queryParams.name"></el-input>
      </div>
    </el-container>

    <el-container class="content-row">
      <div class="input-tip">商品简介: </div>
      <div class="input-field">
        <el-input type="textarea" :row="3" v-model="queryParams.desc"></el-input>
      </div>
    </el-container>

    <el-container class="content-row">
      <div class="input-tip">商品封面: </div>
      <div class="input-field">
        <el-upload :auto-upload="false" :limit="1" list-type="picture-card">
          <el-icon><Plus /></el-icon>
        </el-upload>
      </div>
    </el-container>

    <el-container class="content-row">
      <div class="input-tip">列表图片: </div>
      <div class="input-field">
        <el-upload :auto-upload="false" :limit="5" list-type="picture-card">
          <el-icon><Plus /></el-icon>
        </el-upload>
      </div>
    </el-container>

    <el-container class="content-row">
      <div class="input-tip">上架日期: </div>
      <div class="input-field">
        <el-date-picker 
        type="daterange" 
        range-separator="至" 
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        v-model="queryParams.timeRange"
        >
      </el-date-picker>
      </div>
    </el-container>

    <el-container class="content-row">
      <div class="input-tip">商品分类: </div>
      <div class="input-field">
        <el-select v-model="queryParams.category" style="width: 100px;">
          <el-option key="0" label="男装" :value="0"></el-option>
          <el-option key="1" label="男鞋" :value="1"></el-option>
          <el-option key="2" label="围巾" :value="2"></el-option>
        </el-select>
      </div>
      <div>
        <el-button type="primary" round @click="ToRouter">添加分类</el-button>
      </div>
    </el-container>
    <el-container class="content-row">
      <el-button type="success" plain @click="submit">提交</el-button>
      <div style="margin-left: 40px;"></div>
      <el-button type="warning" plain @click="cancel">取消</el-button>
    </el-container>
  </div>
</template>

<style scoped>
  
</style>