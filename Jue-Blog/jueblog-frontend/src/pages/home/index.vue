<script setup lang="ts">
import { articleStore, messageStore, userStore } from '@/stores'
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import NavComp from './nav.vue'
import Articles from './articles.vue'
import Others from './other.vue'
import { listener } from '@/utils'
const store = articleStore()
const ustore = userStore()
const router = useRouter()
const route = useRoute()
const filter = ref<any>({})
const loading = ref(false)
const onFilter = (json: Record<string, string>) => {
  filter.value = {
    ...filter.value,
    ...json,
  }
  if (filter.value.page) {
    delete filter.value.page
  }
  router.push({
    query: filter.value,
  })
  store.getArticles(filter.value)
}
const onScrollEnd = () => {
  let { page, per_page, total } = store.meta
  if (page * per_page >= total) {
    return false
  }
  if (loading.value) return
  // loading.value == true
  filter.value.page = page + 1
  store.getArticles(filter.value)
}
onMounted(() => {
  filter.value = route.query
  store.getCategory()
  store.getArticles(filter.value)
  if (ustore.user_info) {
    messageStore().getMessage()
  }
  listener.apply('scroll-end', onScrollEnd)
})
</script>

<template>
  <main class="main-box fxt">
    <NavComp :category="store.categories" @on-filter="onFilter" />
    <div class="main-ctx fxt">
      <Articles
        :articles="store.articles"
        :loading="store.loading"
        @on-filter="onFilter"
      />
      <Others />
    </div>
  </main>
</template>

<style lang="less">
.main-box {
  .main-ctx {
    flex: 1;
  }
}
</style>
