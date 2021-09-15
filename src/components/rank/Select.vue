<template>
  <div class="pb-2 filter-content">
    <div class="pt-1 overflow-hidden">
      <div
        @click="visible = !visible"
        class="border rounded-sm border-gray-400 mt-1 px-1 inline-block float-right"
      >
        <span class="iconfont icon-filter">筛选</span>
      </div>
    </div>
    <div
      class="rounded-sm space-y-2 bg-gray-100 mt-2 p-1 py-2 block overflow-hidden dark:bg-gray-800"
      v-if="visible"
    >
      <div v-for="(filter, index) in rankFilterArray" :key="filter.paramsName">
        <p class="p-2 pt-0">{{ filter.name }}</p>
        <div
          v-if="['multi', 'single'].includes(filter.type)"
          class="inline-block"
        >
          <label
            v-for="(option) in filter.options"
            :key="option.value?.toString()"
          >
            <input
              v-if="filter.type == 'single'"
              type="radio"
              class="hidden checkbox"
              :value="option.value"
              v-model="data[index]"
            />
            <input
              v-else
              type="checkbox"
              class="hidden checkbox"
              :value="option.value"
              v-model="data[index]"
            />
            <div class="label">{{ option.text }}</div>
          </label>
        </div>
        <div v-else>
          <div class="filter-input-area">
            <input
              type="text"
              v-model="data[index]"
              class="filter-input"
              placeholder="最多三个长度不超过10的关键词"
            />
            <span
              class="pl-1 w-3 iconfont icon-clean"
              @click="data[index] = ''"
            />
          </div>
        </div>
      </div>
      <div
        class="flex space-x-5 text-white pt-3 button-panel justify-center md:space-x-10"
      >
        <span class="submit" @click="reset">重置</span>
        <span class="submit" @click="submit">确认</span>
      </div>
    </div>
  </div>
  <PageChange :total="total" />
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { arrayToParams, RankFilter } from '../../utils/rank/select'
import { useStore } from 'vuex'
import PageChange from './PageChange.vue'

onMounted(() => {
  reset()
})

defineProps({
  total: Number
})

const store = useStore()

const submit = () => {
  const res = arrayToParams(data.value, rankFilterArray)
  store.commit('setParams', res)
  store.commit('setPage', 1)
  visible.value = false
}

const reset = () => {
  const tempArray = rankFilterArray.map(s => {
    switch (s.type) {
      case 'text': return ''
      case 'multi': return []
    }
    if (s.type == 'single') {
      if (s.options) {
        return s.options[0].value
      }
    }
  })
  data.value = tempArray
}

const data = ref<Array<any>>([])
const visible = ref(false)

const rankFilterArray: Array<RankFilter> = [
  {
    paramsName: 'timeRangeMode',
    name: '时间跨度',
    options: [
      { text: '全部时间', value: 0 },
      { text: '本周', value: 1 },
      { text: '三天内', value: 2 },
    ],
    type: 'single'
  },
  {
    paramsName: 'sortMode',
    name: '筛选方式',
    options: [
      { text: '累计点赞数', value: 0 },
      { text: '点赞数', value: 1 },
      { text: '引用数', value: 2 },
    ],
    type: 'single'
  },
  {
    paramsName: 'ids',
    name: '评论区[多选]',
    options: [
      { text: '向晚', value: 672346917 },
      { text: '贝拉', value: 672353429 },
      { text: '珈乐', value: 351609538 },
      { text: '嘉然', value: 672328094 },
      { text: '乃琳', value: 672342685 },
      { text: '官号', value: 703007996 },
    ],
    type: 'multi'
  },
  {
    paramsName: 'keywords',
    name: '关键词',
    type: 'text'
  }
]

</script>

<style scoped>
.filter-content {
  @apply bg-white rounded-md shadow-md mb-4 px-2 dark:(bg-gray-700 text-gray-400) ;
}

.filter-tags {
  @apply flex space-y-2 -mt-1 w-[calc(100%-60px)] overflow-hidden inline-block;
}

.filter-tag {
  @apply border rounded-sm border-gray-400 mr-1 w-auto px-1 text-gray-600 inline-block;
}

.filter-input-area {
  @apply bg-white rounded-md outline-none mx-2 p-1 box-border dark:(bg-gray-700 text-gray-300) ;
}

.filter-input {
  @apply bg-transparent font-light outline-none px-1 w-[calc(100%-1.75rem)];
}

.label {
  @apply border rounded-sm bg-gray-100 border-blue-400 my-1 mx-2 px-2 text-blue-400 inline-block;
  @apply dark:(text-gray-300 bg-gray-600 border-gray-600) ;
}

.checkbox:checked ~ .label {
  @apply bg-blue-400 text-white dark:(text-gray-200 bg-gray-500) ;
}

.submit {
  @apply rounded-md bg-blue-400 -mt-2 mb-1 py-1 px-5 dark:(bg-gray-600 text-gray-300) ;
}
</style>