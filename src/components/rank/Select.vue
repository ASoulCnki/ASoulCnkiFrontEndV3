<template>
  <div class="filter-content pb-2">
    <div class="overflow-hidden pt-1">
      <div
        @click="visible = !visible"
        class="inline-block float-right border rounded-sm px-1 mt-1 border-gray-400"
      >
        <span class="iconfont icon-filter">筛选</span>
      </div>
    </div>
    <div
      class="block bg-gray-100 rounded-sm p-1 space-y-2 mt-2 py-2 overflow-hidden dark:bg-gray-800"
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
              class="iconfont icon-clean pl-1 w-3"
              @click="data[index] = ''"
            />
          </div>
        </div>
      </div>
      <div
        class="button-panel pt-3 flex justify-center space-x-5 md:space-x-10 text-white"
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
  @apply bg-white shadow-md rounded-md px-2 mb-4 dark:(bg-gray-700 text-gray-400);
}

.filter-tags {
  @apply w-[calc(100%-60px)] flex overflow-hidden inline-block space-y-2 -mt-1;
}

.filter-tag {
  @apply border inline-block border-gray-400 text-gray-600 w-auto rounded-sm mr-1 px-1;
}

.filter-input-area {
  @apply outline-none rounded-md p-1 mx-2 box-border bg-white dark:(bg-gray-700 text-gray-300);
}

.filter-input {
  @apply outline-none font-light px-1 w-[calc(100%-1.75rem)] bg-transparent;
}

.label {
  @apply inline-block px-2 border border-blue-400 bg-gray-100 mx-2 my-1 rounded-sm text-blue-400;
  @apply dark:(text-gray-300 bg-gray-600 border-gray-600);
}

.checkbox:checked ~ .label {
  @apply bg-blue-400 text-white dark:(text-gray-200 bg-gray-500);
}

.submit {
  @apply px-5 py-1 -mt-2 mb-1 rounded-md bg-blue-400 dark:(bg-gray-600 text-gray-300);
}
</style>