<template>
  <div class="right-footer">
    <div class="footer-links">
      <p>关于项目</p>
      <a href="https://github.com/ASoulCnki/ASoulCnki" target="_blank">爬虫</a>
      <a href="https://github.com/ASoulCnki/ASoulCnkiBackEnd" target="_blank">后端</a>
      <a href="https://github.com/ASoulCnki/ASoulCnkiFrontEndV3" target="_blank">前端</a>
      <a href="https://github.com/ASoulCnki/ASoulCnkiBackend/blob/master/api.md" target="_blank">API文档</a>
    </div>
    <div class="footer-links">
      <p>联系我们</p>
      <a href="https://space.bilibili.com/1809170490/" target="_blank">
        <span class="iconfont icon-bilibili">BiliBili</span>
      </a>
      <a href="https://github.com/ASoulCnki" target="_blank">
        <span class="iconfont icon-github">GitHub</span>
      </a>
      <a href="https://t.bilibili.com/542031663106174238" target="_blank">主站反馈</a>
      <a href="https://t.bilibili.com/551286754984977322" target="_blank">作文展反馈</a>
    </div>
    <div class="footer-links">
      <p>友情链接</p>
      <a href="https://asoul.cloud/" target="_blank">一个魂的二创</a>
      <a href="https://asoulbook.top/" target="_blank">枝江方言词典</a>
      <a href="https://asoulwiki.com/" target="_blank">一个魂WIKI</a>
      <a href="https://asoulfan.com/" target="_blank">ASoulFan</a>
    </div>
  </div>
</template>

<style scoped>
.right-footer { @apply flex justify-center w-full divide-x text-sm my-6; }

.footer-links { @apply box-border w-1/3 text-center mb-1; }

.footer-links a, p { @apply py-1 block dark:text-gray-400 text-gray-500; }

.footer-links a { @apply hover:underline; }

.footer-links a, span { @apply text-[13px] leading-relaxed }

.footer-links p { @apply font-semibold; }
</style>