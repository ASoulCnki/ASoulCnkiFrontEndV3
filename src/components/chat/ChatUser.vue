<script lang="ts" setup>
const props = withDefaults(defineProps<{
  name: string
  description?: string
  avatar?: string
}>(), {
  description: '',
  avatar: '/assets/images/cao.jpg'
})
</script>

<template>
  <label>
    <input type="radio" name="asoul-cnki-user" class="hidden" />
    <div class="user-panel">
      <span class="close-button">x</span>
      <img :src="props.avatar" class="h-45px w-45px avatar" />
      <div class="text-dark-200 inline-block">
        <div class="font-350 pb-2px dark:(text-gray-400)">{{ props.name }}</div>
        <div
          class="text-xs text-gray-500 w-145px overflow-ellipsis"
        >{{ props.description }}</div>
      </div>
    </div>
  </label>
</template>

<style scoped>
@import url("./chat-public.css");

.user-panel {
  @apply border-b space-x-3 border-gray-100 font-320 w-full 
  grid py-3 grid-cols-[10px,55px,max-content] dark:(bg-dark-200 text-gray-300 border-gray-500 hover:(bg-dark-100)) hover:(bg-[#e5e5e5]) ;
}

.close-button {
  transform: translateX(-25px);
  @apply cursor-pointer font-mono h-full text-xl opacity-0 px-6px pt-5px
    transition text-gray-500 items-baseline block
    dark:(text-gray-300);
}

.user-panel:hover .close-button {
  transform: translateX(0);
  @apply opacity-100;
}

input[type="radio"]:checked ~ .user-panel {
  @apply bg-[#e5e5e5] dark:bg-dark-100;
}
</style>