<template>
  <div class="select">
    <div class="tag-container">
      <div class="tag">全部时间</div>
      <div class="tag">累计点赞数</div>
      <div class="tag">全部</div>
      <div class="tag">关键1111</div>
    </div>
    <div class="filter">
      <span class="iconfont icon-filter">筛选</span>
    </div>
  </div>
</template>

<script>
</script>

<style scoped>
.select {
  height: 38px;
  @apply w-full px-2 bg-white rounded-sm shadow-md overflow-hidden text-sm;
  @apply dark:bg-gray-700 dark:text-gray-400;
}

.tag-container {
  width: calc(100% - 65px);
  height: 30px;
  @apply inline-block box-border space-x-1 overflow-hidden;
}

.tag {
  @apply float-left px-2 py-1 rounded-sm;
  @apply border border-gray-300 text-gray-500;
  @apply dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400;
}

.filter {
  @apply box-border float-right inline p-1 px-2 rounded-sm;
  @apply border border-gray-300 text-gray-500;
  @apply hover:bg-blue-500 hover:text-white transition-colors;
  @apply dark:border-gray-600 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-600;
}
</style>