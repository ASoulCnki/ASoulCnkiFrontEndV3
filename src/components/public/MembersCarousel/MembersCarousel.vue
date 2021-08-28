<template>
  <ElCarousel :interval="6000" arrow="hover" indicator-position="none" :height="'11rem'">
    <ElCarouselItem  class="carousel-item" v-for="member in membersData" :key="member.name">
      <a :href="member.href">
        <div class="member-info" :style="{backgroundColor: member.color}">
          <img 
            referrerpolicy="no-referrer" 
            class="avatar-img"
            :src="isApplePath ? member.imgApplePath : member.imgPath"
            :alt="member.name"
          >
          <div class="member-name">{{member.name}}</div>
        </div>
      </a>
    </ElCarouselItem>
  </ElCarousel>
</template>

<script setup lang="ts">
import { ElCarousel, ElCarouselItem } from 'element-plus'
import { membersData } from './MembersData'
import { useUA } from '@/hooks/useUA'
import { usePlatform } from '@/hooks/usePlatform'

const {isChrome, isSafari} = useUA()
const {isWin, isLinux} = usePlatform()

const isApplePath = !isChrome && isSafari && !isWin && !isLinux

</script>

<style scoped>
.carousel-item h3 { @apply text-center bg-black p-0; }

.member-info { @apply pt-4 m-0 w-full h-full rounded-lg; }

.avatar-img {
  @apply w-24 h-24 m-auto rounded-full border-2 overflow-hidden bg-white;
}

.member-name { @apply m-4 font-semibold text-center text-gray-100 text-lg; }
</style>