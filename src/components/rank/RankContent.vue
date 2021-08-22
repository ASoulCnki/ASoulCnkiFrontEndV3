<template>
  <div class="rank">
    <Select/>
    <!-- <div class="empty" v-if="articleArray.length == 0">
      搜索结果为空，请尝试重新搜索或更换搜索条件
    </div> -->
    <Article
      v-for="s in articleArray"
      :key="s.id"
      :article="s"
      v-cloak
    />
  </div>
</template>

<script setup>
import Select from './Select.vue'
import { defineProps, onMounted } from 'vue'

defineProps({
  articleArray: {
    type: Array,
    default: []
  }
})

</script>

<style>
.rank {
  @apply w-full;
}

.empty {
  @apply text-center py-20 px-0 bg-gray-200 my-2 rounded-md tracking-wider break-all;
  @apply text-gray-500 font-bold leading-relaxed dark:bg-gray-700 dark:text-gray-500;
}
</style>