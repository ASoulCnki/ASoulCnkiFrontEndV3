<template>
  <div class="main-content">
    <RankContent class="left" :articleArray="response.articleArray" />
    <SideBar class="right" :endTime="response.lastUpdate" />
  </div>
  <div class="page-sm fixed-area">
    <div class="bottom-64 fixed-button" @click="sub">
      <div class="iconfont icon-top icon-left" />
    </div>
    <div class="fixed-element">
      <label>
        <input type="text" class="page-input" v-model.number.lazy="currPage" />
      </label>
    </div>
    <div class="bottom-40 fixed-button" @click="add">
      <div class="iconfont icon-top icon-right" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import RankContent from '@/components/rank/RankContent.vue'
import SideBar from '@/components/rank/SideBar.vue'

import { ref, reactive, onMounted, watch, computed } from 'vue'
import { useTitle, useDebounceFn, onKeyUp, get } from '@vueuse/core'
import { useStore } from 'vuex'
import api from '@/api'

let response = reactive({
  total: 0,
  articleArray: <any>[],
  lastUpdate: '',
})

onMounted(async () => {
  useTitle('枝江作文展')
  scrollTo(0, 0)
  const params = { sortMode: 0, timeRangeMode: 0, pageSize: 10, pageNum: 1 }
  await getRanking(params)
})

// get ranking from remote
const getRanking = async (params: any) => {
  // All params see API Doc
  // https://github.com/ASoulCnki/ASoulCnkiBackend/blob/master/api.md

  const data = await api.ranking(params)
  // returned articleArray, lastUpdate, total and startTime

  response.articleArray = data.articleArray as any[]
  response.lastUpdate = data.lastUpdate
  response.total = data.total
}

const store = useStore()

const currPage = ref(1)
const page = computed(() => store.state.page)
const params = computed(() => store.state.params)

watch(page, async () => watchGet())

watch(params, async () => {
  if (page.value == 1) {
    watchGet()
  } else {
    currPage.value = 1
  }
})

const watchGet = async () => {
  const rankParams = params.value
  rankParams.pageNum = page.value
  rankParams.pageSize = 10
  await getRanking(rankParams)
  scrollTo(0, 0)
}

const debounceDelay = 600
const pageSize = 10
const totalPage = computed(() => Math.ceil(response.total / pageSize))

const sub = useDebounceFn(() => {
  if (get(currPage) > 1) currPage.value--
}, debounceDelay)
const add = useDebounceFn(() => {
  if (get(currPage) < get(totalPage)) currPage.value++
}, debounceDelay)

watch(currPage, (newVal, oldVal) => {
  if (newVal == oldVal) return
  if (newVal > 0 && newVal <= totalPage.value) {
    store.commit('setPage', newVal)
  } else {
    currPage.value = oldVal
  }
})


// add KeyboardEvent
onKeyUp('ArrowRight', add)
onKeyUp('ArrowLeft', sub)

</script>

<style scoped>
@import url("@/assets/css/float-2col.css");
@import url("@/assets/css/unit-fixed.css");

/* moblie fixed page changer */
.page-sm {
  @apply space-y-3 pb-2 bottom-24;
}

.page-input {
  @apply outline-none h-10 text-sm text-center opacity-75 p-2 text-gray-600 w-10;
  @apply rounded-xl font-mono box-border overflow-hidden focus:opacity-100;
  @apply dark:(bg-gray-500 text-gray-300) ;
}
</style>