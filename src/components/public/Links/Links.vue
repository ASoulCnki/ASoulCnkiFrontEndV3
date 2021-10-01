<script lang="ts" setup>
import { linksData } from './LinksData'
</script>

<template>
  <footer class="divide-x flex my-6 text-sm w-full justify-center">
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
  </footer>
</template>

<style scoped>
.footer-links {
  @apply text-center mb-1 w-1/3 box-border;
}

.footer-links a,
p {
  @apply py-1 text-gray-700 block dark:text-gray-400;
}

.footer-links a {
  @apply hover:underline;
}

.footer-links a,
span {
  @apply leading-relaxed text-[13px];
}

.footer-links p {
  @apply font-semibold;
}
</style>