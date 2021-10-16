<template>
  <div class="right-content">
    <div class="discription">
      <h2 class="text-xl py-2">枝江作文展</h2>
      <h2 class="text-lg high">
        <span class="mr-1 -ml-1 iconfont icon-time"></span>
        上次更新时间: {{ endTime }}
      </h2>
      <p v-if="useServiceWorker()" class="px-1 text-cyan-600">
        <span class="mr-1 -ml-1 iconfont icon-right"></span>
        离线查看功能可用
      </p>
      <p class="text">
        枝网作文展旨在收录原创（原偷小作文），由于爬取评论区有限，数据不一定准确，仅供娱乐。本榜单
        <span class="high">定期刷新</span>。作文展的收录范围是
        <span class="high-red">ASoul的六个官方账号</span>
      </p>
      <h2 class="text-lg">名词解释</h2>
      <p class="text">
        <span class="iconfont icon-like"></span>
        点赞数：小作文自身的点赞数
      </p>
      <p class="text">
        <span class="iconfont icon-qoute"></span>
        引用数：被偷的次数
      </p>
      <p class="text">
        枝网
        <span class="high">鼓励原创小作文和真情实感</span>，故设置
        <span class="high">
          "
          <span class="iconfont icon-all-like"></span>累计点赞数"
        </span>
      </p>
      <p class="text">
        即:将
        <span class="high">所有重复小作文</span>的赞累计到
        <span class="high">最早</span>出现的相似
        <span class="high">[原创/原偷]</span>小作文上
      </p>
      <p class="text">当然，我们也不能忽视偷小作文对优秀原创小作文的传播作用，重振小作文荣光，我辈义不容辞！</p>
    </div>
    <div class="discription">
      <h2 class="pt-2">
        问题反馈
        <a
          href="https://t.bilibili.com/551286754984977322"
          class="text-blue-500"
          target="_blank"
          rel="noreferrer"
        >[传送门]</a>
      </h2>
      <p class="text">
        如果使用过程中发现问题，欢迎反馈动态评论或私信反馈，联系方式位于
        <b class="high">页脚</b>，包括但不限于:
      </p>
      <ol class="list">
        <li>1. 系统BUG</li>
        <li>2. 功能建议</li>
      </ol>
      <p class="text">为了能够快速定位和解决问题，反馈问题请尽可能清楚描述。</p>
      <p class="text">
        BUG问题请尽可能说明
        <span class="high-red">系统，机型，浏览器名称等。</span>
      </p>
    </div>
    <div class="discription">
      <p class="text">
        由于枝网仅收录了
        <span class="high-red">A-SOUL六个官方账号</span>下的评论，对比范围有限，且算法还比较粗略，所以使用过程中可能会遇到以下情况
      </p>
      <ol class="list">
        <li>1. 首发b站二创，贴吧，豆瓣，NGA等平台的小作文被偷后鉴定为原创/原偷</li>
        <li>2. 在ASOUL官号下发布的评论有借鉴，但仍被判断为原创/原偷。</li>
      </ol>
      <p class="text">受制于算法精度和评论数据的数量，以上问题我们目前无法解决，请期待后续技术攻关。</p>
    </div>
    <div class="discription">
      <router-link to="/" class="font-semibold tracking-wider url">返回枝网查重</router-link>
    </div>
    <Links />
  </div>
</template>

<script setup>
import Links from '@/components/public/Links/Links.vue'
import { useServiceWorker } from '@/hooks/useServiceWorker'
defineProps({
  endTime: String
})
</script>

<style scoped>
.right-content {
  @apply text-lg box-border lg:float-left;
}

.url {
  @apply dark:text-yellow-600;
}

.discription {
  @apply rounded-md shadow-md mb-5 w-full py-2 px-3 box-border;
  @apply bg-gray-50 text-gray-700;
  @apply dark:(text-gray-400 bg-gray-700) ;
}

.text {
  @apply my-1 text-sm leading-relaxed;
}

.list {
  @apply font-semibold text-sm leading-relaxed;
}

.high {
  @apply px-1 text-blue-600 dark:text-yellow-600;
}

.high-red {
  @apply font-semibold px-1 text-red-600 dark:text-red-500;
}

.right-footer {
  @apply divide-x flex text-sm mb-8 w-full text-gray-400;
}

.footer-links {
  @apply text-center grid w-1/3 grid-cols-1 box-border;
}

.footer-links a,
.footer-links p {
  @apply grid py-2;
}

.footer-links a {
  @apply text-gray-500 dark:text-gray-300 hover:underline;
}

.footer-links p {
  @apply font-semibold text-gray-600 dark:text-gray-300;
}
</style>
