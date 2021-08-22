<template>
<div class="text-sm">
  <div class="right-item space-y-3">
    <p class="text-red-600 font-bold text-lg">新功能!枝江作文展
      <a href="/rank" class="text-blue-400">点此进入</a>
    </p>
    <p class="text-sm leading-loose dark:text-gray-300">
      枝网原班人马打造，我们自己都溜到停不下来的优秀小作文展示平台
    </p>
    <p class="text-sm leading-loose dark:text-gray-300">
      现提供多种小作文过滤器，详情请点击传送门后查看使用说明
    </p>
  </div>
  <div class="right-top-description right-item pb-6">
    <h3 class="description-title dark:text-gray-300 text-lg pb-2">
      枝网查重系统介绍
    </h3>   
    <p v-for="item in description" :key="item.key" class="text-sm">
      <b>{{item.key}}</b>
      <em v-if="item.type == 'text'" class="description-value">{{item.value}}</em>
      <em v-if="item.type == 'link'">
        <a :href="item.value.href" class="description-value">{{item.value.text}}</a>
      </em>
    </p>
  </div>
  <Carousel :memberArray="memberArray" />
  <Links/>
  <!-- <p class="footer">
    <a href="https://beian.miit.gov.cn/" target="_blank">
      琼ICP备20001476号-2
    </a>
  </p> -->
</div>
</template>

<script setup>
import Links from '@/components/public/Links.vue'
import Carousel from '@/components/public/Carousel.vue'


const description = [
  {key: '比对库范围：', value: 'b站动态、视频评论区(仅限A-Soul的六个官方账号)', type: 'text'},
  {key: '参考文献：', value: `[1]李旭.基于串匹配方法的文档复制检测系统研究[D].燕山大学.`, type: 'text'},
]

const memberArray = [
    {
    name: "贝拉kira",
    href: "672353429",
    imgPath: "https://i2.hdslb.com/bfs/face/668af440f8a8065743d3fa79cfa8f017905d0065.jpg",
    imgApplePath: "/assets/images/bella.webp",
    color:"#db7d74"
  },
  {
    name: "嘉然今天吃什么",
    href: "672328094",
    imgPath: "https://i2.hdslb.com/bfs/face/d399d6f5cf7943a996ae96999ba3e6ae2a2988de.jpg",
    imgApplePath: "/assets/images/diana.webp",
    color:"#e799b0"
  },
  {
    name: "向晚大魔王",
    href: "672346917",
    imgPath: "https://i0.hdslb.com/bfs/face/566078c52b408571d8ae5e3bcdf57b2283024c27.jpg",
    imgApplePath: "/assets/images/ava.webp",
    color:"#9ac8e2"
  },
  {
    name: "乃琳Queen",
    href: "672342685",
    imgPath: "https://i1.hdslb.com/bfs/face/8895c87082beba1355ea4bc7f91f2786ef49e354.jpg",
    imgApplePath: "/assets/images/eileen.webp",
    color:"#576690"
  },
  {
    name: "珈乐Carol",
    href: "351609538",
    imgPath: "https://i2.hdslb.com/bfs/face/a7fea00016a8d3ffb015b6ed8647cc3ed89cbc63.jpg",
    imgApplePath: "/assets/images/carol.webp",
    color:"#b8a6d9"
  },
  {
    name: "A-SOUL_Official",
    href: "703007996",
    imgPath: "https://i2.hdslb.com/bfs/face/48d65a10a2c643dddc4a51e0a60fae892393417a.jpg",
    imgApplePath: "/assets/images/cao.webp",
    color:"#595959"
  }
]
</script>

<style scoped>
.right-item {
  @apply w-full text-sm mb-4 rounded-md shadow-md p-2;
  @apply text-gray-600 bg-gray-50;
  @apply dark:text-gray-400 dark:bg-gray-800;
}

.description-value { @apply py-2 leading-relaxed block; }

.footer {
  font-size: 12px;
  @apply text-gray-500 text-center;
}
</style>