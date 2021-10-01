<script lang="ts" setup>
import { useTitle } from '@vueuse/core'
import { onMounted } from 'vue';

onMounted(() => {
  useTitle('枝网时光机')
})

</script>

<template>
  <div class="main">查看你的历史</div>
</template>
