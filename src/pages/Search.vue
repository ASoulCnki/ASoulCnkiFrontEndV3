<script lang="ts" setup>
// import SearchIndex from '@/components/search/SearchIndex.vue'
import SearchDetail from '@/components/search/SerachDetail.vue'
import { onMounted } from 'vue'
import { useTitle } from '@vueuse/core'

onMounted(() => {
  useTitle('枝网搜索')
  scrollTo(0, 0)
})

</script>

<template>
  <SearchDetail />
</template>