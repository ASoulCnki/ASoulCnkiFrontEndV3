<template>
  <div class="article">
    <div class="article-header">
      <div class="user inline">
        <span class="iconfont icon-user mr-1"></span>
        <a :href="userLink" target="_blank" class="hover">
          <span class="hidden sm:inline">{{ userName }}</span>
          <span class="sm:hidden">{{ userName.substr(0,5) + '...' }}</span>
        </a>
        <span class="text-green-500 px-2" v-if="article.originId == -1">[原创|原偷]</span>
      </div>
      <div class="right-button text-blue-500 hover">
        <a :href="article.url" target="_blank"><span class="iconfont icon-link" />链接</a>
      </div>
      <div class="right-button hover pr-2 copy" @click="copy">
        <span class="iconfont icon-copy" />复制
      </div>
    </div>
    <div class="article-text" v-if="isMarked" v-html="markedContent" />
    <div class="article-text" v-else v-html="content" />
    <div class="article-footer">
      <div class="footer-attr">
        <span class="iconfont icon-all-like" />{{ article.allLike }}
      </div>
      <div class="footer-attr">
        <span class="iconfont icon-like" />{{ article.like }}
      </div>
      <div class="footer-attr">
        <span class="iconfont icon-qoute" />{{ article.qoute }}
      </div>
      <div class="footer-attr">
        <span class="iconfont icon-time" />{{ article.createTime.substr(0, 10) }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, computed } from 'vue'
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
    .on('error', () => message('复制失败', 'error') )
}

const markedContent = computed( () => diffText(props.rawText, props.article.content, 4, 'strong') )
const content = computed( () => textToLink(props.article.content) )

const userLink = 'https://space.bilibili.com/' + props.article.author.id
const userName = props.article.author.name
</script>

<style>
.article {
  @apply w-full p-2 mx-auto text-sm mt-3 mb-4 border border-gray-200;
  @apply bg-gray-100 text-gray-600 rounded-md shadow-md;
  @apply dark:text-gray-400 dark:bg-gray-700 dark:border-gray-800; 
}

.article-header { @apply px-1 pb-2 divide-x; }

.right-button { @apply inline float-right pl-2 cursor-pointer; }

.hover {
  @apply cursor-pointer hover:text-blue-400 dark:hover:text-yellow-500;
}

.article-text {
  @apply p-2 rounded-md text-sm leading-relaxed break-all whitespace-pre-wrap;
  @apply bg-gray-200 dark:bg-gray-800 dark:text-gray-400;
}

.article-text strong {
  @apply font-normal text-red-400 bg-gray-100 rounded-sm;
  @apply dark:text-blue-500 dark:bg-gray-600;
}

.article-text a { @apply text-blue-500 dark:text-yellow-500; }

.article-footer { @apply grid grid-cols-2 md:grid-cols-4 pt-2; }

.footer-attr {
  @apply text-left text-sm font-mono hover:text-gray-800 dark:hover:text-gray-300;
}

.footer-attr .iconfont { @apply mx-2; }
</style>