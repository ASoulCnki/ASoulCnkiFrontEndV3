<template>
  <div class="rank">
    <Select/>
    <!-- <div class="empty" v-if="articleArray.length == 0">
      搜索结果为空，请尝试重新搜索或更换搜索条件
    </div> -->
    <PageChange :total="total" @page="getPage" >
      <Article
        v-for="s in articleArray"
        :key="s.id"
        :article="s"
        v-cloak
      />
    </PageChange>
  </div>
</template>

<script setup>
  import Select from './Select.vue'
  import { watch, ref } from 'vue'

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

  const page = ref(1)

  const options = {
    sortMode: 0,
    timeRangeMode: 0,
    pageSize: 10,
    pageNum: 1
  }

  const emit = defineEmits(['select'])

  const getPage = (val) => {
    page.value = val
    return true
  }

  watch(page, () => {
    options.pageNum = page.value
    emit('select', options)
  })
</script>

<style>
.rank {
  @apply w-full;
}

.empty {
  @apply text-center py-20 px-0 bg-gray-200 my-2 rounded-md tracking-wider break-all;
  @apply text-gray-500 font-bold leading-relaxed dark:bg-gray-700 dark:text-gray-500;
}
</style>