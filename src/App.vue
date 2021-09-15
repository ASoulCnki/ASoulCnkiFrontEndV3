<template>
  <div class="main">
    <keep-alive>
      <router-view />
    </keep-alive>
    <div class="return-top" @click="toTop">
      <span class="iconfont icon-top" />
    </div>
  </div>
</template>

<script setup>
const toTop = () => scrollTo(0, 0)
</script>

<style>
@import url("@/assets/css/unit-fixed.css");

body {
  @apply bg-gray-100 h-full;
  @apply dark:bg-gray-900 dark:text-gray-400;
}

.main {
  min-width: 350px;

  @apply min-h-full w-full sm:w-5/6 -xl:w-full xl:w-4/5 mx-auto opacity-100 mb-16;
}
</style>