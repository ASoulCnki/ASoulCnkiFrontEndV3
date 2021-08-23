<template>
  <div class="page-sm">
    <div class="fixed-button bottom-64" @click="sub">
      <div class="iconfont icon-top icon-left"/>
    </div>
    <div class="fixed-element">
      <input type="text" class="page-input" v-model.number.lazy="currPage">
    </div>
    <div class="fixed-button bottom-40" @click="add">
      <div class="iconfont icon-top icon-right"/>
    </div>
  </div>
  <slot></slot>
  <div class="page-lg">
    <div class="nofix-button inline-block" @click="sub">
      <div class="iconfont icon-top icon-left"/>
    </div>
    <div class="inline-block tracking-wider text-gray-600 dark:text-gray-400">
      第<input type="text" class="page-input mx-2" v-model.number.lazy="currPage">页 / 共
      <span class="font-mono"> {{ totalPage }} </span> 页
    </div>
    <div class="nofix-button inline-block" @click="add">
      <div class="iconfont icon-top icon-right"/>
    </div>
  </div>
</template>

<script setup>
  import { ref, watch, computed, onMounted } from 'vue'

  onMounted(() => {
    // support arrow key change page
    document.addEventListener('keydown', e => {
      // out of range handle in watch()
      if (e.key == "ArrowRight") add()
      if (e.key == "ArrowLeft") sub()
    })
  })

  const pageSize = 10 // default pageSize

  const props = defineProps({
    total: Number // Total num of all articles
  })
  const emit = defineEmits(['page'])

  const currPage = ref(1)
  const totalPage = computed(() => Math.ceil(props.total / pageSize) )

  // handled index out of range here ( has debounced )
  const sub = () => debounce(() => { if (currPage.value > 1) currPage.value-- }, debounceDelay)
  const add = () => debounce(() => { if (currPage.value < totalPage.value) currPage.value++ }, debounceDelay)

  let timer
  const debounceDelay = 600 // mill seconds
  const debounce = (cb, delay) => { // delay: mill seconds
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => cb(), delay)
  }

  watch(currPage, (newVal, oldVal) => {
    if (newVal < 1 || newVal > totalPage.value) {
      currPage.value = oldVal
      return
    }
    emit('page', currPage.value)
  })

</script>

<style scoped>
@import url('@/assets/css/unit-fixed.css');

/* moblie fixed page changer */
.page-sm { @apply fixed-area bottom-24 space-y-3 pb-2 lg:hidden; }

/* wide screen use page changer at bottom */
.page-lg { @apply box-border hidden lg:flex justify-center space-x-5 mt-4; }

/* [废案]另一种宽屏悬浮的页面切换,存在样式问题 */
/* .page-lg { @apply box-border w-4/5 bottom-16 absolute flex space-x-5 justify-center;} */

.page-input {
  @apply outline-none w-10 h-10 p-2 text-sm text-center text-gray-600 opacity-75;
  @apply box-border overflow-hidden rounded-xl font-mono focus:opacity-100;
  @apply dark:bg-gray-500 dark:text-gray-300;
}
</style>