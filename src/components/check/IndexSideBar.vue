<template>
  <div class="text-sm">
    <div class="space-y-3 right-item">
      <div v-for="event in eventLinks" :key="event.title">
        <p :class="`font-bold text-base ${event.extraClassName}`">
          <a :href="event.path">{{ event.title }}</a>
        </p>
        <p>{{ event.detail }}</p>
        <br />
      </div>
    </div>
    <div class="right-item pb-6">
      <h3 class="text-lg pb-2 dark:text-gray-300">枝网查重系统介绍</h3>
      <p class="font-bold leading-loose mb-2 pl-3">
        “我看到了你们搞的什么枝江查重，好厉害！怎么做到的？” ——向晚大魔王
      </p>
      <p v-for="item in description" :key="item.key" class="text-sm">
        <b>{{ item.key }}</b>
        <em v-if="item.type == 'text'" class="description-value">{{ item.value }}</em>
      </p>
    </div>
    <MembersCarousel />
    <Links />
    <p class="footer">
      <a href="https://beian.miit.gov.cn/" target="_blank" rel="noreferrer">琼ICP备20001476号-2</a>
    </p>
  </div>
</template>

<script setup lang="ts">
import Links from '@/components/public/Links/Links.vue'
import MembersCarousel from '@/components/public/MembersCarousel/MembersCarousel.vue'

const description = [
  { key: '比对库范围：', value: 'b站动态、视频评论区(仅限A-Soul的六个官方账号)', type: 'text' },
]

const eventLinks = [
  {
    title: '📄 枝江作文展: 小作文素材库',
    detail: '收集评论区优秀小作文，现已支持条件筛选和一键复制',
    path: '/rank',
    extraClassName: 'text-teal-500',
  },
  {
    title: '🧎‍♂️←🏃‍♂️ 阿草的太极教室[测试版]',
    detail: '模仿阿草的语气生成QA，和阿草学习打太极。目前尚在测试阶段，欢迎反馈bug',
    path: '/qa',
    extraClassName: 'text-blue-600',
  },
  {
    title: '📰 枝网年度报告',
    detail: '2021年ASoul个人数据年度报告',
    path: 'https://2021.asoulcnki.asia',
    extraClassName: 'text-red-600',
  },
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