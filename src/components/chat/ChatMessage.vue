<script lang="ts" setup>
const props = withDefaults(
  defineProps<{
    message: string,
    avatar?: string,
    isMe?: boolean
  }>(), {
  isMe: false,
  avatar: '/assets/images/cao.jpg'
})
</script>

<template>
  <div class="flex w-full py-2" :style="{ direction: isMe ? 'rtl' : 'ltr' }">
    <img :src="props.avatar" class="h-30px w-30px avatar" />
    <div
      :class="{ 'is-me': isMe }"
      style="direction: ltr;"
      class="bg-white border rounded-tl-none rounded-xl border-gray-100 max-w-5/7 p-1 px-3 break-all whitespace-pre-line dark:(bg-dark-100 border-dark-50 text-gray-400) "
    >{{ props.message }}</div>
  </div>
</template>

<style scoped>
@import url("./chat-public.css");
.is-me {
  @apply rounded-tl-xl rounded-tr-none bg-[#80B9F2]
  border-blue-300 text-white
  dark:(bg-gray-600 text-gray-300 border-dark-50) ;
}
</style>