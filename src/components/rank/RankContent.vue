<template>
  <div class="w-full">
    <Select :total="total"/>
    <div class="empty" v-if="articleArray.length == 0" v-cloak>
      <span class="iconfont icon-null text-[3rem] block pb-3"></span>
      搜索结果为空，请尝试重新搜索或更换搜索条件
    </div>
    <Article v-for="s in articleArray"
      :key="s.id" :article="s" v-cloak
    />
  </div>
</template>

<script setup>
  import { watch, ref, computed } from 'vue'
import { useStore } from 'vuex'

  defineProps({
    articleArray: {
      type: Array,
      default: []
    },
    total: {
      type: Number,
      default: 0
    }
  })

  const store = useStore()
  const page = computed(() => store.state.page)

  const options = {
    sortMode: 0,
    timeRangeMode: 0,
    pageSize: 10,
    pageNum: 1
  }

  const emit = defineEmits(['select'])

  watch(page, () => {
    options.pageNum = page.value
  })
</script>

<style>
.empty {
  @apply text-center py-20 px-5 bg-gray-200 my-4 rounded-md tracking-wider break-all;
  @apply text-gray-400 font-semibold leading-loose;
  @apply dark:(bg-gray-700 text-gray-500)
}
</style>