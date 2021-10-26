<script lang="ts" setup>
import { useWindowScroll } from '@vueuse/core';
import { computed } from 'vue';

const toTop = () => {
  scrollTo(0, 0)
}

const { y } = useWindowScroll()

const visible = computed(() => {
  return y.value > 300
})

</script>

<template>
  <div class="transition return-top" @click="toTop" v-if="visible">
    <span class="iconfont icon-top" />
  </div>
</template>
