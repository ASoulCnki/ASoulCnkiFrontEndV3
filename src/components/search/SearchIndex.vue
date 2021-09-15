<script lang="ts" setup>
import { ref, computed } from 'vue'
import { onKeyUp } from '@vueuse/core'

const inputText = ref('')

const isTextNotNull = computed(() => {
  return inputText.value != ''
})

const search = () => {
  let value = inputText.value
  if (value == '') return
  alert('search')
}

onKeyUp('Enter', search)
</script>

<template>
  <div class="text-4xl text-center mt-56 p-10 tracking-widest space-x-1">
    <span class="text-blue-500">枝</span>
    <span class="text-red-500">网</span>
    <span class="text-green-500">搜</span>
    <span class="text-yellow-500">索</span>
  </div>
  <div class="flex justify-between rounded-2xl bg-white mx-5 px-2 shadow-sm">
    <label class="w-[calc(100%-6.25rem)]">
      <input
        type="text"
        v-model="inputText"
        class="w-full h-12 text-xl outline-none rounded-2xl pl-3 tracking-widest"
      />
    </label>
    <div class="mt-2 divide-x-2">
      <span
        class="iconfont icon-clean text-xl text-eileen mr-2"
        v-if="isTextNotNull"
        @click="inputText = ''"
      ></span>
    </div>
  </div>
</template>
