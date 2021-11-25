<script lang="ts" setup>
import { useDuring } from './hooks'
import { computed, ref, onMounted } from 'vue';
import ReturnTop from '@/components/public/ReturnTop/index.vue'
import Birthday from './components/activities/BirthdayDialog.vue';
const isDuring = useDuring('2021-10-28', '2021-11-3')
const isVisible = ref(true)

const visible = computed(() => isDuring.value && isVisible.value)

const hideDialog = () => {
  localStorage.setItem('useActivityOnce', 'true')
  isVisible.value = false
}

const showDialog = () => isVisible.value = true

onMounted(() => {
  if (localStorage.getItem('useActivityOnce') === 'true') {
    isVisible.value = false
  }

  const ad = `本次招新有多位小伙伴联系我们，现在招到人啦！感谢大家的关注！
联系我们的小伙伴都非常优秀，但是在技术栈/时间安排上可能不太契合目前枝网开发组，还是感谢你们的支持！

目前项目正在有序推进，请期待后续更新！`

  console.log('%c' + ad, 'color:gray; font-size:14px; font-weight: blod; line-height:1.8')
})

</script>

<template>
  <div class="main">
    <router-view v-slot="{ Component }">
      <keep-alive>
        <component :is="Component" />
      </keep-alive>
    </router-view>
    <!-- <div
      v-if="isVisible"
      class="bg-carol rounded-l-lg p-2 transition right-0 bottom-70 animate-pulse animate-repeat-2 fixed"
      @click="showDialog"
    >🎂</div>-->
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