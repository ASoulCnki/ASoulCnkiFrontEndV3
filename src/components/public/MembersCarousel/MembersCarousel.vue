<template>
  <ElCarousel :interval="6000" arrow="hover" indicator-position="none" :height="'11rem'">
    <ElCarouselItem class="carousel-item" v-for="member in membersData" :key="member.name">
      <a :href="member.href">
        <div class="member-info" :style="{ backgroundColor: member.color }">
          <img
            referrerpolicy="no-referrer"
            class="avatar-img"
            :src="isApplePath ? member.imgApplePath : member.imgPath"
            :alt="member.name"
          />
          <div class="member-name">{{ member.name }}</div>
        </div>
      </a>
    </ElCarouselItem>
  </ElCarousel>
</template>

<script setup lang="ts">
import { membersData } from './MembersData'
import { useUA } from '@/hooks/useUA'
import { usePlatform } from '@/hooks/usePlatform'

const { isChrome, isSafari } = useUA()
const { isWin, isLinux } = usePlatform()

const isApplePath = !isChrome && isSafari && !isWin && !isLinux
</script>

<style scoped>
.carousel-item h3 {
  @apply bg-black text-center p-0;
}

.member-info {
  @apply rounded-lg h-full m-0 w-full pt-4;
}

.avatar-img {
  @apply bg-white rounded-full m-auto border-2 h-24 w-24 overflow-hidden;
}

.member-name {
  @apply font-semibold m-4 text-center text-white text-lg;
}
</style>
