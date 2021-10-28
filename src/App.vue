<script lang="ts" setup>
import { useActivityOnce } from './hooks'
import { computed, ref, onMounted } from 'vue';
import ReturnTop from '@/components/public/ReturnTop/index.vue'
import Birthday from './components/activities/Birthday.vue';
const { isDuring } = useActivityOnce('2021-10-28', '2021-11-3')
const isVisible = ref(true)

const visible = computed(() => {
  return isDuring.value && isVisible.value
})

const hideDialog = () => {
  localStorage.setItem('useActivityOnce', 'true')
  isVisible.value = false
}

onMounted(() => {
  if (localStorage.getItem('useActivityOnce') === 'true') {
    isVisible.value = false
  }
})

</script>

<template>
  <div class="main">
    <router-view v-slot="{ Component }">
      <keep-alive>
        <component :is="Component" />
      </keep-alive>
    </router-view>
    <ReturnTop />
    <el-dialog
      v-model="visible"
      title="🎉祝我们的小狼公主珈乐生日快乐"
      :width="null"
      :before-close="hideDialog"
      :lock-scroll="false"
    >
      <div class="px-5">
        <Birthday />
      </div>
    </el-dialog>
  </div>
</template>

<style>
@import url("@/assets/css/unit-fixed.css");
@import url("@/assets/css/fix-element.css");
body {
  @apply h-full bg-gray-100;
  @apply dark:bg-gray-900 dark:text-gray-400;
}

.main {
  min-width: 350px;

  @apply mx-auto min-h-full mb-16 w-full opacity-100 sm:w-5/6 xl:w-4/5 -xl:w-full;
}
</style>