<template>
  <div class="notify bg-blue-400">
    <div class="notify-left"><span class="iconfont icon-message"/></div>
    <div class="notify-right" ref="boxRef">
      <div class="notify-text" ref="textRef">
        <span v-for="(notice, index) in content" :key="index">
          <a v-if="notice.url" :href="notice.url" ><span>{{ notice.message }}</span></a>
          <span v-else>{{ notice.message }}</span>
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>

import { onMounted, ref } from 'vue'

defineProps({
  content: Array
})

const isScrolling = ref(false)
const animate = ref(null)

// Mounted on Dom
const [ boxRef, textRef ] = [ ref(null), ref(null) ]

onMounted(() => {
  window.onresize = () => {
    // if scrolling pass
    if (isScrolling.value) return
    start()
  }
  // init scroll
  window.onload = () => { setTimeout(() => start(), 0) }
})

const start = () => {
  // get element and offsetwidth
  const [ box, text ] = [ boxRef.value, textRef.value ]
  let [textWidth, boxWidth] = [ text.offsetWidth, box.offsetWidth ]

  // apply animate
  const toScrollLeft = () => {
    const oldVal = box.scrollLeft
    if (textWidth > boxWidth) {
      box.scrollLeft++
      // return right
      if (oldVal == box.scrollLeft) { box.scrollLeft = 0 }
    }
    if (isScrolling.value) {
      animate.value = requestAnimationFrame(toScrollLeft)
    } else {
      box.scrollLeft = 0
      cancelAnimationFrame(animate.value)
    }
  }
  // when text width short, stop scroll
  if (textWidth < boxWidth) {
    isScrolling.value = false
  }

  text.classList.add('notify-text-padding')
  textWidth = text.offsetWidth
  isScrolling.value = true
  animate.value = requestAnimationFrame(toScrollLeft)
}
</script>

<style scoped>
  .notify {
    @apply w-full h-9 pl-2 text-white text-lg leading-loose;
    @apply rounded-md overflow-hidden bg-carol;
  }

  .notify-left, .notify-right { @apply float-left box-border leading-loose; }

  .notify-left { @apply w-8; }

  .notify-right {
    width: calc(100% - 2.25rem);
    @apply tracking-widest overflow-hidden whitespace-nowrap font-medium;
  }
  
  .notify-text { @apply inline; }

  .notify-text-padding {
    @apply w-full;
    padding: 0 100%;
  }

  .notify-text-padding span {
    margin: 0 20%;
    @apply text-left m-auto;
  }

  .iconfont { @apply text-2xl; }
</style>