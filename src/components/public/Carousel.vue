<template>
  <el-carousel :interval="6000" arrow="hover" indicator-position="none" :height="'11rem'">
    <el-carousel-item v-for=" member in memberArray" :key="member.name" class="carousel-item">
      <a :href="'https://space.bilibili.com/' + member.href">
        <div class="member-info" :style="{backgroundColor: member.color}">
          <img referrerpolicy="no-referrer" class="avatar-img"
            :data-src="member.imgPath + '@128w_128h_1o.webp'"
            :data-apple-src="member.imgApplePath"
            :alt="member.name"
          >
          <div class="member-name">{{member.name}}</div>
        </div>
      </a>
    </el-carousel-item>
  </el-carousel>
</template>

<script setup>
import { onMounted } from "@vue/runtime-core"

const state = defineProps({
  memberArray: Array
})

// is Apple Divice
const isApple = () => {
  const [ ua, plat ] = [ navigator.userAgent, navigator.platform ]

  return (
    !(/chrome/i).test(ua) && (/safari/i).test(ua)
    && !(/(win|linux)/i).test(plat)
  )
}

// LazyLoad Images
const lazyLoad = (target) => {
  const useApple = isApple()
  const conf = { root: null, threshold: [0], rootMargin: '-50px' }

  const io = new IntersectionObserver( ( entries, observer ) => {
    entries.forEach( (entry, i) => {
      if (entry.isIntersecting) {
        const img = entry.target
        // Since Safari img tag not support img norefer
        // When Apple Divice, use local image, else Use Bili CDN image
        const src = useApple ? 
          img.getAttribute('data-apple-src') :
          img.getAttribute('data-src')
        
        img.setAttribute('src', src)
        io.unobserve(entry.target) 
      }
    })
  }, conf)

  io.observe(target)
}

onMounted(() => {
  const imgArray = [...document.querySelectorAll('.avatar-img')]
  imgArray.forEach(i => lazyLoad(i))
})
</script>

<style scoped>

.carousel-item h3 { @apply text-center bg-black p-0; }

.member-info { @apply pt-4 m-0 w-full h-full rounded-lg; }

.avatar-img {
  @apply w-24 h-24 m-auto rounded-full border-2 overflow-hidden bg-white;
}

.member-name { @apply m-4 font-bold text-center text-gray-100 text-lg; }
</style>