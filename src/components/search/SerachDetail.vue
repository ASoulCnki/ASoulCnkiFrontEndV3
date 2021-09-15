<script lang="ts" setup>
import { ref, computed } from 'vue'
import { get } from '@vueuse/core'

const array = Array(5).fill('title')

const text = ref<string>('')

const cleanVisible = computed(() => get(text).length > 0)

</script>

<template>
  <!-- search input -->
  <div class="bg-white rounded-xl flex space-x-2 mx-3 mt-4 text-lg p-3 py-2 search-input">
    <span class="text-lg tracking-widest w-10 float-left inline-block">搜索</span>
    <div class="flex w-[calc(100%-3rem)] float-left">
      <input type="text" v-model="text" class="outline-none w-full pr-2" />
      <span class="cursor-pointer iconfont icon-clean" v-if="cleanVisible" @click="text = ''"></span>
    </div>
  </div>
  <!-- search result -->

  <div class="space-y-4 mx-3 mt-4 search-result">
    <div class="bg-white rounded-lg shadow-sm p-2 pl-3" v-for="i in array" :key="i">
      <div class="text-xl pb-1 title">{{ i }}</div>
      <details>
        <summary class="appearance-none">foo</summary>
        <div class="detail">foo bar</div>
      </details>
    </div>
  </div>

  <div class="search-footer"></div>
</template>
