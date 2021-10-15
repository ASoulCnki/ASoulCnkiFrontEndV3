<template>
  <div class="main">
    <router-view v-slot="{ Component }">
      <keep-alive>
        <component :is="Component" />
      </keep-alive>
    </router-view>
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
  @apply h-full bg-gray-100;
  @apply dark:bg-gray-900 dark:text-gray-400;
}

.main {
  min-width: 350px;

  @apply mx-auto min-h-full mb-16 w-full opacity-100 sm:w-5/6 xl:w-4/5 -xl:w-full;
}
</style>