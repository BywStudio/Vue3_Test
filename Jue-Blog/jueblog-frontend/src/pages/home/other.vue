<script setup lang="ts">
import { onMounted } from 'vue'
const toGithub = () => {
  window.open('https://github.com/BywStudio/Vue3_Test/tree/main/Jue-Blog')
}
onMounted(() => {})
</script>

<template>
  <div class="main-writer">
    <div class="box-wrap fx-b">
      <div>
        <h4>项目已开源</h4>
        <p>前端、接口完整源码</p>
      </div>
      <el-button @click="toGithub">去Star</el-button>
    </div>
    <div class="box-wrap">
      <h4>文章榜</h4>
      <p><a href="#">失踪人口回归</a></p>
      <p><a href="#">失踪人口回归</a></p>
      <p><a href="#">失踪人口回归</a></p>
      <p><a href="#">失踪人口回归</a></p>
    </div>
    <div class="book-dv box-wrap">
      <h4>作者榜</h4>
      <p><a href="#">BywStudio</a></p>
      <p><a href="#">BywStudio</a></p>
      <p><a href="#">BywStudio</a></p>
      <p><a href="#">BywStudio</a></p>
    </div>
  </div>
</template>

<style lang="less">
.main-writer {
  width: 260px;
  margin-left: 20px;
  position: sticky;
  top: 80px;
  .box-wrap {
    background: #fff;
    border-radius: 4px;
    padding: 20px;
    margin-bottom: 16px;
    h4 {
      font-size: 16px;
      line-height: 22px;
      margin-bottom: 4px;
    }
    img {
      display: block;
      max-width: 100%;
      margin: 0 auto;
    }
  }
  .book-dv {
    .link {
      display: flex;
      margin-top: 10px;
      img {
        width: 90%;
      }
    }
  }
}
</style>
