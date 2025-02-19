<script setup>
import Cataloge from '@/views/index/Cataloge.vue'
import Menos from '@/views/index/Menos.vue'
import indexStore from '@/stores/index/index'
import CusEditor from '@/components/Editor/CusEditor.vue';
const store = indexStore()
</script>

<template>
  <div class="index-page">
    <!-- 文件夹区域 -->
    <div class="catalogs">
      <Cataloge />
    </div>
    <!-- 备忘录文件夹区域 -->
    <div class="menos">
      <Menos />
    </div>
    <!-- 编辑器区域 -->
    <div class="details">
      <CusEditor />
    </div>
  </div>
</template>

<style lang="less" scoped>
.index-page {
  display: flex;
  align-items: stretch;
  height: calc(100vh - 55px);
  .catalogs {
    width: 20%;
    background-color: #f9f9f9;
  }
  .menos {
    width: 25%;
  }
  .details {
    flex: 1;
  }
}
</style>