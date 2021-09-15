<script lang="ts" setup>
import { linksData } from './LinksData'
</script>

<template>
  <div class="flex justify-center w-full divide-x text-sm my-6">
    <div class="footer-links" v-for="group in linksData" :key="group.groupName">
      <p>{{ group.groupName }}</p>
      <a
        v-for="link in group.links"
        :key="link.name"
        :href="link.url"
        target="_blank"
        rel="noreferrer"
      >
        <span :class="'iconfont ' + link.icon" v-if="link.icon">{{ link.name }}</span>
        <span v-else>{{ link.name }}</span>
      </a>
    </div>
  </div>
</template>

<style scoped>
.footer-links {
  @apply box-border w-1/3 text-center mb-1;
}

.footer-links a,
p {
  @apply py-1 block dark:text-gray-400 text-gray-700;
}

.footer-links a {
  @apply hover:underline;
}

.footer-links a,
span {
  @apply text-[13px] leading-relaxed;
}

.footer-links p {
  @apply font-semibold;
}
</style>