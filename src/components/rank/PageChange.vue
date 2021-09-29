<template>
  <div class="page-sm fixed-area">
    <div class="bottom-64 fixed-button" @click="sub">
      <div class="iconfont icon-top icon-left" />
    </div>
    <div class="fixed-element">
      <label>
        <input type="text" class="page-input" v-model.number.lazy="currPage" />
      </label>
    </div>
    <div class="bottom-40 fixed-button" @click="add">
      <div class="iconfont icon-top icon-right" />
    </div>
  </div>
</template>

<script setup>
import { ref, watch, computed } from 'vue'
import { useStore } from 'vuex'
import { useDebounceFn, get, onKeyUp } from '@vueuse/core'

const props = defineProps({
  total: Number // Total num of all articles
})

const pageSize = 10 // default pageSize
const currPage = ref(1)
const totalPage = computed(() => Math.ceil(props.total / pageSize))

const debounceDelay = 600 // mill seconds

// handled index out of range here ( has debounced )
const sub = useDebounceFn(() => {
  if (get(currPage) > 1) currPage.value--
}, debounceDelay)
const add = useDebounceFn(() => {
  if (get(currPage) < get(totalPage)) currPage.value++
}, debounceDelay)

// add KeyboardEvent
onKeyUp('ArrowRight', add)
onKeyUp('ArrowLeft', sub)

const store = useStore()

watch(currPage, (newVal, oldVal) => {
  if (newVal < 1 || newVal > totalPage.value) {
    currPage.value = oldVal
    return
  }
  store.commit('setPage', newVal)
})

</script>

<style scoped>
@import url("@/assets/css/unit-fixed.css");

/* moblie fixed page changer */
.page-sm {
  @apply space-y-3 pb-2 bottom-24;
}

/* wide screen use page changer at bottom
.page-lg { @apply space-x-5 mt-4 box-border hidden justify-center lg:flex; } */

/* [废案]另一种宽屏悬浮的页面切换,存在样式问题
.page-lg { @apply flex space-x-5 bottom-16 w-4/5 box-border absolute justify-center;} */

.page-input {
  @apply outline-none h-10 text-sm text-center opacity-75 p-2 text-gray-600 w-10;
  @apply rounded-xl font-mono box-border overflow-hidden focus:opacity-100;
  @apply dark:(bg-gray-500 text-gray-300) ;
}
</style>