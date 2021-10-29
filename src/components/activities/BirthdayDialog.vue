<script lang="ts" setup>
const douyinURL = "https://www.douyin.com/user/MS4wLjABAAAAuZHC7vwqRhPzdeTb24HS7So91u9ucl9c8JjpOS2CPK-9Kg2D32Sj7-mZYvUCJCya"
const biliLiveURL = "https://live.bilibili.com/22634198"
const biliURL = "https://space.bilibili.com/351609538/"
</script>


<template>
  <div class="space-y-2">
    <div class="space-y-1 leading-relaxed tracking-wide break-all">
      <p>我们的小狼公主将在11.2日迎来17+3岁大寿，祝我们的小狼公主珈乐生日快乐！</p>
      <p>“今天 明天 每一天 我们一直在”</p>
      <p>
        为了庆祝珈乐生日，生日当天，枝网所有小作文正文的链接都会替换成
        <a
          class="font-700 text-red-500"
          target="_blank"
          href="https://www.bilibili.com/video/BV1db4y117Q1"
        >👠红色高跟鞋</a> 😈(原文传送门不受影响)
      </p>
      <p class="text-right">——🤡枝网项目组</p>
    </div>
    <div class="text-center">
      <hr class="mb-1" />
      <p class="font-bold my-2">点击下方传送门给我们的小狼公主点个关注</p>
      <div class="flex space-x-3 py-2 justify-center">
        <a target="_blank" class="bg-blue-400 button" :href="biliURL">B站</a>
        <a target="_blank" class="bg-carol button" :href="biliLiveURL">直播间</a>
        <a target="_blank" class="bg-dark-200 button" :href="douyinURL">抖音</a>
      </div>
    </div>
  </div>
</template>

<style scoped>
.button {
  @apply rounded-lg text-white p-1 px-5;
}
</style>