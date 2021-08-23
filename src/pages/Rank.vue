<template>
  <div class="main-content">
    <RankContent class="left"
      :articleArray="response.articleArray"
      :total="response.total"
      @select="getSelect"
    />
    <SideBar class="right" :endTime="response.LastUpdate" />
  </div>
</template>

<script setup>
  import RankContent from '@/components/rank/RankContent.vue'
  import SideBar from '@/components/rank/SideBar.vue'

  import { reactive, onMounted } from 'vue'
  import api from '@/api'

  let response = reactive({
    total: 0
  })

  onMounted(async () => {    
    const params = { sortMode : 0, timeRangeMode: 0, pageSize: 10, pageNum: 1 }
    await getRanking(params)
  })

  // get ranking from remote
  const getRanking = async (params) => {
    // All params see API Doc
    // https://github.com/ASoulCnki/ASoulCnkiBackend/blob/master/api.md

    const data = await api.ranking(params)
    // returned articleArray, lastUpdate, total and startTime

    response.articleArray = data.articleArray
    response.LastUpdate = data.lastUpdate
    response.total = data.total
  }

  // get ranking by emit select params
  const getSelect = async (select) => {
    const params = select
    await getRanking(params)
    scrollTo(0, 0)
    return true
  }

</script>

<style scoped>
@import url('@/assets/css/float-2col.css');
</style>