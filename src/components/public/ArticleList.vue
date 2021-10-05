<template>
  <div class="article-content">
    <div class="is-marked" v-if="length > 0">
      共找到 {{ length }} 条结果
      <div class="float-right">
        重复区间标注
        <label for="mark" class="button">
          {{ isMarked ? '关闭' : '打开' }}
          <input
            id="mark"
            type="checkbox"
            class="hidden"
            v-model="isMarked"
          />
        </label>
      </div>
    </div>
    <Article
      v-for="s in articleArray"
      :key="s.id"
      :article="s"
      :isMarked="isMarked"
      :rawText="rawText"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'
import Article from '@/components/public/Article.vue'
import { Article as IArticle } from '@/utils'

const props = withDefaults(
  defineProps<{
    articleArray: IArticle[],
    rawText: string,
  }>(), {
  articleArray: <any>[],
  rawText: ''
})

const length = computed(() => props.articleArray.length)

const isMarked = ref(false)
</script>

<style scoped>
.is-marked {
  @apply rounded-md bg-gray-50 shadow-md mb-4 w-full p-2 text-gray-600;
  @apply dark:(text-gray-400 bg-gray-700) ;
}

.button {
  @apply rounded-sm cursor-pointer bg-blue-400 py-[2px] px-2 text-gray-200;
}
</style>