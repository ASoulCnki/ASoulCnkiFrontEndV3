<template>
  <div class="main-content">
    <CheckContent class="left" />
    <CheckSideBar class="right" />
  </div>
</template>

<script setup>
  import CheckContent from '@/components/check/IndexContent.vue'
  import CheckSideBar from '@/components/check/IndexSideBar.vue'
</script>

<style>
@import url('@/assets/css/float-2col.css');
</style>