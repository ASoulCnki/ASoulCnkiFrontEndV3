<template>
  <div class="select space-x-2">
    <div class="tag">tag1 x</div>
    <div class="tag">tag1 x</div>
    <div class="tag">tag1 x</div>
    <div class="tag">tag1 x</div>
    <div class="filter">
      筛选
      <!-- <span class="iconfont icon-filter"></span> -->
    </div>
  </div>
</template>

<script>
</script>

<style>
.select {
  @apply w-full p-2 bg-white rounded-md shadow-md overflow-hidden text-sm;
}

.tag {
  @apply border border-gray-300 float-left px-2 py-1 text-gray-500 rounded-md align-middle;
}

.filter {
  @apply border float-right border-gray-300 inline p-1 text-gray-500 rounded-md align-middle;
}
</style>