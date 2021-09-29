<template>
  <div class="w-full">
    <Select />
    <div class="empty" v-if="articleArray.length == 0" v-cloak>
      <span class="pb-3 text-[3rem] iconfont icon-null block"></span>
      搜索结果为空，请尝试重新搜索或更换搜索条件
    </div>
    <Article v-for="s in articleArray" :key="s.id" :article="s" v-cloak />
  </div>
</template>

<script setup>
defineProps({
  articleArray: {
    type: Array,
    default: []
  }
})
</script>

<style>
.empty {
  @apply rounded-md bg-gray-200 my-4 text-center tracking-wider py-20 px-5 break-all;
  @apply font-semibold leading-loose text-gray-400;
  @apply dark:(bg-gray-700 text-gray-500) ;
}
</style>