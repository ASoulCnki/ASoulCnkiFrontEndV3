<template>
  <div class="article-content">
    <div class="is-marked" v-if="articleArray.length > 0">
      共找到 {{ articleArray.length }} 条结果
      <div class="float-right">
        重复区间标注
        <label for="mark" class="button">
          {{ isMarked ? '关闭' : '打开'}}
          <input id="mark" type="checkbox" class="hidden" v-model="isMarked">
        </label>
      </div>
    </div>
    <Article v-for="s in articleArray" :key="s.replyId"
      :article="s" :isMarked='isMarked' :rawText="rawText"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Article from '@/components/public/Article.vue'

defineProps({
  articleArray: Array,
  rawText:String,
})

const isMarked = ref(false)
</script>

<style scoped>

.is-marked {
  @apply w-full p-2 shadow-md rounded-md bg-gray-50 text-gray-600;
  @apply dark:text-gray-400 dark:bg-gray-700;
}

.button {
  padding-top: 2px;
  padding-bottom: 2px;
  @apply cursor-pointer bg-blue-400 px-2 text-gray-200 rounded-sm;
}
</style>