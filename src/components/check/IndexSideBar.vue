<template>
  <div class="text-sm">
    <div class="space-y-3 right-item">
      <p class="font-bold text-lg text-red-600">
        新功能!枝江作文展
        <a href="/rank" class="text-blue-400">点此进入</a>
      </p>
      <p class="top-p">枝网原班人马打造，我们自己都溜到停不下来的优秀小作文展示平台</p>
      <p class="top-p">现提供多种小作文过滤器，详情请点击传送门后查看使用说明</p>
    </div>
    <div class="right-top-description right-item pb-6">
      <h3 class="text-lg pb-2 dark:text-gray-300">枝网查重系统介绍</h3>
      <p v-for="item in description" :key="item.key" class="text-sm">
        <b>{{ item.key }}</b>
        <em
          v-if="item.type == 'text'"
          class="description-value"
        >{{ item.value }}</em>
      </p>
    </div>
    <MembersCarousel />
    <Links />
    <p class="footer">
      <a
        href="https://beian.miit.gov.cn/"
        target="_blank"
        rel="noreferrer"
      >琼ICP备20001476号-2</a>
    </p>
  </div>
</template>

<script setup lang="ts">
import Links from '@/components/public/Links/Links.vue'
import MembersCarousel from '@/components/public/MembersCarousel/MembersCarousel.vue'

const description = [
  { key: '比对库范围：', value: 'b站动态、视频评论区(仅限A-Soul的六个官方账号)', type: 'text' },
  { key: '参考文献：', value: `[1]李旭.基于串匹配方法的文档复制检测系统研究[D].燕山大学.`, type: 'text' },
]

</script>

<style lang="css" scoped>
.right-item {
  @apply rounded-md shadow-md text-sm mb-4 w-full p-2 pl-3;
  @apply bg-white text-gray-600;
  @apply dark:bg-gray-800 dark:text-gray-400;
}

.top-p {
  @apply text-sm leading-loose dark:text-gray-400;
}

.description-value {
  @apply leading-normal py-2 block;
}

.footer {
  @apply text-center text-xs mb-4 text-gray-500;
}
</style>