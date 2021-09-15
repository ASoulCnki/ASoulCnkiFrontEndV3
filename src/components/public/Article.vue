<template>
  <div class="article">
    <div class="article-header">
      <div class="user inline">
        <span class="mr-1 iconfont icon-user"></span>
        <a :href="userLink" target="_blank" class="hover" rel="noreferrer">
          <span class="hidden sm:inline">{{ userName }}</span>
          <span class="sm:hidden">{{ userName.substr(0, 5) + '...' }}</span>
        </a>
        <span class="px-2 text-green-500" v-if="article.originId == -1">[原创|原偷]</span>
      </div>
      <div class="right-button text-blue-600 hover">
        <a :href="article.url" target="_blank" rel="noreferrer">
          <span class="iconfont icon-link" />链接
        </a>
      </div>
      <div class="right-button pr-2 hover copy" @click="copy">
        <span class="iconfont icon-copy" />复制
      </div>
    </div>
    <div class="article-text" v-if="isMarked" v-html="markedContent" />
    <div class="article-text" v-else v-html="content" />
    <div class="article-footer">
      <div class="footer-attr">
        <span class="iconfont icon-all-like" />
        {{ article.allLike }}
      </div>
      <div class="footer-attr">
        <span class="iconfont icon-like" />
        {{ article.like }}
      </div>
      <div class="footer-attr">
        <span class="iconfont icon-qoute" />
        {{ article.qoute }}
      </div>
      <div class="footer-attr">
        <span class="iconfont icon-time" />
        {{ article.createTime.substr(0, 10) }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { message, diffText } from '@/utils'
import { textToLink } from '@/utils/article/link'
import clipboard from 'clipboard'

const props = defineProps({
  article: Object,
  isMarked: Boolean,
  rawText: String
})

const copy = () => {
  const clip = new clipboard('.copy', { text: () => props.article.content })
    .on('success', () => {
      message('复制成功')
      clip.destroy()
    })
    .on('error', () => message('复制失败', 'error'))
}

const markedContent = computed(() => diffText(props.rawText, props.article.content, 4, 'strong'))
const content = computed(() => textToLink(props.article.content))

const userLink = 'https://space.bilibili.com/' + props.article.author.id
const userName = props.article.author.name
</script>

<style>
.article {
  @apply border rounded-md mx-auto shadow-md text-sm mb-4 w-full p-2;
  @apply bg-gray-50 border-gray-200 text-gray-600;
  @apply dark:(text-gray-400 bg-gray-700 border-gray-800);
}

.article-header {
  @apply divide-x px-1 pb-2;
}

.right-button {
  @apply cursor-pointer pl-2 inline float-right;
}

.hover {
  @apply cursor-pointer;
  @apply hover:(text-blue-400 dark:text-yellow-500);
}

.article-text {
  @apply rounded-md bg-gray-200 text-sm p-2;
  @apply leading-relaxed break-all whitespace-pre-wrap;
  @apply dark:(bg-gray-800 text-gray-400);
}

.article-text strong {
  @apply rounded-sm font-normal bg-gray-100 text-red-500;
  @apply dark:(text-blue-500 bg-gray-600);
}

.article-text a {
  @apply text-blue-500 dark:text-yellow-500;
}

.article-footer {
  @apply grid pt-2 grid-cols-2 md:grid-cols-4;
}

.footer-attr {
  @apply font-mono text-left text-sm;
  @apply hover:(text-gray-800 dark:text-gray-300);
}

.footer-attr .iconfont {
  @apply mx-2;
}
</style>