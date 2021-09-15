<template>
  <div class="page-sm fixed-area">
    <div class="fixed-button bottom-64" @click="sub">
      <div class="iconfont icon-top icon-left" />
    </div>
    <div class="fixed-element">
      <label>
        <input type="text" class="page-input" v-model.number.lazy="currPage" />
      </label>
    </div>
    <div class="fixed-button bottom-40" @click="add">
      <div class="iconfont icon-top icon-right" />
    </div>
  </div>
  <slot></slot>
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
  @apply bottom-24 space-y-3 pb-2;
}

/* wide screen use page changer at bottom
.page-lg { @apply box-border hidden lg:flex justify-center space-x-5 mt-4; } */

/* [废案]另一种宽屏悬浮的页面切换,存在样式问题
.page-lg { @apply box-border w-4/5 bottom-16 absolute flex space-x-5 justify-center;} */

.page-input {
  @apply outline-none w-10 h-10 p-2 text-sm text-center text-gray-600 opacity-75;
  @apply box-border overflow-hidden rounded-xl font-mono focus:opacity-100;
  @apply dark:(bg-gray-500 text-gray-300);
}
</style>