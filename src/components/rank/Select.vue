<template>
  <div class="filter-content">
    <div class="grid pt-2 grid-cols-[auto,30px]">
      <div class="filter overflow-y-hidden">
        <span
          v-for="tag in tagTextArray"
          :key="tag"
          class="border rounded-md mr-2 mb-2 px-2 inline-block dark:(border-gray-400)"
        >{{ tag }}</span>
      </div>
      <div
        @click="visible = !visible"
        class="border rounded-md border-gray-500 h-7 text-center"
      >
        <span class="iconfont icon-filter"></span>
      </div>
    </div>
    <div
      class="rounded-sm space-y-2 p-1 py-2 block overflow-hidden dark:bg-gray-700"
      v-if="visible"
    >
      <div v-for="(filter, index) in rankFilterArray" :key="filter.paramsName">
        <p
          class="text-sm px-2 text-gray-500 dark:(text-gray-400)"
        >{{ filter.name }}</p>
        <hr class="my-1 w-full dark:(bg-gray-600)" />
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
              :value="option"
              v-model="data[index]"
            />
            <input
              v-else
              type="checkbox"
              class="hidden checkbox"
              :value="option"
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
              v-if="data[index].length > 0"
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
</template>

<script lang="ts" setup>
import { ref, onMounted, computed } from 'vue'
import { arrayToParams } from '../../utils/rank/select'
import { rankFilterArray } from '.'
import { useStore } from 'vuex'

onMounted(() => { reset() })

const data = ref<Array<any>>([])
const visible = ref(false)
const store = useStore()


const submit = () => {
  let emitData = data.value.map(s => {
    return (Array.isArray(s)) ? s.map(x => x.value) :
      (s.value == undefined) ? s || '' : s.value
  })
  const res = arrayToParams(emitData, rankFilterArray)
  store.commit('setParams', res)
  visible.value = false
}

const reset = () => {
  const tempArray = rankFilterArray.map(s => {
    switch (s.type) {
      case 'text': return ''
      case 'multi': return []
      case 'single': return s.options![0]
    }
  })
  data.value = tempArray
}

const tagTextArray = computed(() => {
  return data.value.flat()
    .filter((s: string) => s != "")
    .map(s => (s.text == undefined) ? s : s.text)
})

</script>

<style scoped>
.filter-content {
  @apply bg-white rounded-md shadow-md mb-3 px-2 dark:(bg-gray-700 text-gray-400) ;
}

.filter-input-area {
  @apply bg-white border rounded-md outline-none border-gray-400
    m-2 p-1 box-border dark:(bg-gray-700 text-gray-300) ;
}

.filter-input {
  @apply bg-transparent font-light outline-none px-1 w-[calc(100%-1.75rem)];
}

.label {
  @apply border rounded-md border-blue-400 my-1 mx-2 tracking-wide
    px-3 text-blue-500 inline-block
    dark:(text-gray-400 bg-gray-800 border-gray-700) ;
}

.checkbox:checked ~ .label {
  @apply bg-blue-400 text-white dark:(text-gray-200 bg-gray-500) ;
}

.submit {
  @apply rounded-md -mt-2 mb-1 py-1 px-5 !bg-blue-400 dark:(bg-gray-600 text-gray-300) ;
}
</style>