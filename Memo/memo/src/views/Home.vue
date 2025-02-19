<template>
  <main class="home-ponit">
    <CusHeader />
    <router-view></router-view>
  </main>
</template>
<script setup>
import { onMounted } from "vue";
import userStore  from "@/stores/user";
import indexStore from "@/stores/index"
import CusHeader from "@/components/Header/CusHeader.vue";
const user_store = userStore();
const index_store = indexStore();
onMounted(() => {
  user_store.getUser();
  index_store.getCatalogs();
  index_store.getMenos();
  index_store.getActiveId();
});
</script>
<style lang="less" scoped>
  
</style>