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
  <div class="space-x-1 mt-56 text-center tracking-widest p-10 text-4xl">
    <span class="text-blue-500">枝</span>
    <span class="text-red-500">网</span>
    <span class="text-green-500">搜</span>
    <span class="text-yellow-500">索</span>
  </div>
  <div class="bg-white flex rounded-2xl shadow-sm mx-5 px-2 justify-between">
    <label class="w-[calc(100%-6.25rem)]">
      <input
        type="text"
        v-model="inputText"
        class="outline-none rounded-2xl h-12 text-xl tracking-widest w-full pl-3"
      />
    </label>
    <div class="divide-x-2 mt-2">
      <span
        class="text-xl text-eileen mr-2 iconfont icon-clean"
        v-if="isTextNotNull"
        @click="inputText = ''"
      ></span>
    </div>
  </div>
</template>
