<template>
  <div class="main">
    <router-view/>
    <div class="return-top" @click="toTop">
      <span class="iconfont icon-top"/>
    </div>
  </div>
</template>

<script setup>
const toTop = () => scrollTo(0, 0)
</script>

<style>
body {
  @apply bg-gray-100 h-full;
  @apply dark:bg-gray-900 dark:text-gray-400;
}

.main {
  min-width: 350px;
  @apply min-h-full w-full sm:w-5/6 md:w-4/5 mx-auto opacity-100;
}

.return-top {
  @apply fixed bottom-14 right-6 opacity-60 text-white bg-gray-400 p-3 py-2;
  @apply rounded-xl shadow-xl md:right-10 mr-3 my-2;
  @apply hover:shadow-inner hover:bg-gray-500;
}
</style>