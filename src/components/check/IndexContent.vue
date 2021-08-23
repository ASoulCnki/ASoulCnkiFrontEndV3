<template>
<div>
  <Notice :content="notice" />
  <div class="text-container">
    <ul class="text-header">
      <li :class="rateColor + ' text-sm'">
        总复制比 <span class="font-mono tracking-wide">{{ response.rate }}%</span>
      </li>
      <li class="active" @click="text=''" :disabled="!reportable">
        <span class="iconfont icon-clean">清空</span>
      </li>
      <li class="active copy" @click="copy" :disabled="!reportable">
        <span class="iconfont icon-copy">复制</span>
      </li>
      <li @click="check" class="check">
        <span class="iconfont icon-upload">{{ isComplete ? '提交' : '查重中' }}</span>   
      </li>
    </ul>
    <textarea
      placeholder="内容字数不少于10个字，不多于1000字。输入信息后，点击下方「提交小作文」进行查重 !"
      :maxlength="maxlength"
      v-model="text"
      class="text-input"
    />
    <div class="text-status">
      <div class="text-status-item float-left">
        <el-checkbox v-model="isAgreed" />
        我已同意<a @click="isProtocolVisible=true" class="url">用户协议</a>
      </div>
      <div class="text-status-item float-right">{{ typeofText }}</div>
      <div class="text-status-item float-right">{{ text.length }}/{{ maxlength }}</div>
    </div>
  </div>
  <el-dialog v-model="isProtocolVisible" title="枝网查重用户协议" width="none" :lock-scroll="false">
    <Protocol/>
  </el-dialog>
  <ArticleList :articleArray="response.articleArray" :rawText="text"/>
</div>
</template>

<script setup>
import ArticleList from '@/components/public/ArticleList.vue'
import Protocol from '@/components/public/Protocol.vue'
import Notice from '@/components/public/Notice.vue'

import { ref, reactive, computed, onMounted, watch } from 'vue'
import { message, isChracterDraw, copyContent, storage } from '@/utils'
import api from '@/api'
import clipboard from 'clipboard'

// max textarea length
const maxlength = 1000

const notice = ref([
  {message: '查重过程中遇到的问题可以向B站@查重姬Official反馈，反馈地址在页脚 ——枝网项目组'}
])

let response = reactive({
  rate: (0).toFixed(2),
  articleArray: []
})
const text = ref('')

let isComplete = ref(true)
let isProtocolVisible = ref(false)
let isAgreed = ref(true)

const reportable = computed(() => response.startTime != null)
const typeofText = computed(() => isChracterDraw(text) ? '字符画' : '普通小作文')
const rateColor = computed(() => {
  const percent = Number(response.rate)
  let color = 'green'
  if (percent > 25) color = 'blue' 
  if (percent > 50) color = 'yellow'
  if (percent > 75) color = 'red'
  return color
})

const check = async () => {
  if (!isAgreed.value) {
    message('请先阅读并同意用户协议', 'warning')
    setTimeout(() => isProtocolVisible.value = true, 500)
    return
  }

  const checkText = text.value
  const cond = !(checkText.length >= 10 && checkText.length <= maxlength)

  // if invaild length, return
  if (cond) {
    message('小作文字数太少了捏', 'warning')
    return
  }

  const data = await api.check(text.value)
  response.rate = data.rate
  response.articleArray = data.articleArray
  response.startTime = data.startTime
  response.lastUpdate = data.lastUpdate

  message('点击复制以复制查重报告')
  isComplete.value = true
}


onMounted(() => {
  // agree state from localStorage
  isAgreed.value = storage.agree.get()
})

watch(isAgreed, () => {
  storage.agree.set(isAgreed.value)
})

// copy compare report to clipboard
const copy = () => {
  const clip = new clipboard('.copy', {
    text: () => copyContent(response)
  })
    .on('success', () => {
      message('复制成功,适度玩梗捏')
      clip.destroy()
    })
    .on('error', () => message('复制失败', 'error'))
}
</script>

<style scoped>
.url {
  @apply text-blue-400 cursor-pointer;
  @apply hover:underline hover:text-blue-500;
}

.text-container {
  @apply rounded-md shadow-md overflow-hidden px-2 my-4 bg-white;
  @apply dark:text-gray-400 dark:bg-gray-800;
}

.text-header { @apply divide-x py-2 px-0 text-gray-500 dark:divide-gray-400; }

.text-header li { @apply inline px-2 outline-none; }
.text-header li:first-child { @apply pl-0 text-sm; }
.green { @apply text-green-500; }
.blue { @apply text-blue-500; }
.yellow { @apply text-yellow-500; }
.red { @apply text-red-500;}

.active { @apply hover:text-blue-500 dark:hover:text-yellow-500  cursor-pointer; }
.active:disabled { @apply hover:text-gray-500 cursor-not-allowed; }

.check {
  @apply float-right px-6 bg-blue-500 cursor-pointer rounded-sm text-gray-200;
  @apply hover:bg-blue-600 hover:text-gray-100;
}

.text-input {
  @apply box-border w-full resize-none outline-none border-none block rounded-sm;
  @apply p-2 py-1 break-all h-80 text-sm leading-relaxed tracking-widest;
  @apply dark:bg-gray-700 dark:text-gray-400;
}

.text-status { @apply py-2 w-full overflow-hidden divide-x-2 pl-1 dark:divide-gray-500; }

.text-status-item {
  min-width: 85px;
  @apply inline text-sm text-gray-500 text-center;
}
</style>