<template>
  <div>
    <Notice :content="notice" />
    <div class="text-container">
      <ul class="text-header">
        <li :class="rateColor + ' text-sm'">
          总复制比
          <span class="font-mono tracking-wide">{{ response.rate }}%</span>
        </li>
        <li class="active" @click="text = ''" :disabled="!reportable">
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
        ref="input"
        class="text-input"
      />
      <div class="text-status">
        <div class="text-status-item float-left">
          <label>
            <input
              type="checkbox"
              class="h-3 w-4 inline-block"
              v-model="isAgreed"
            />
          </label>
          我已同意
          <a @click="isProtocolVisible = true" class="url">用户协议</a>
        </div>
        <div class="text-status-item float-right">{{ typeofText }}</div>
        <div
          class="text-status-item float-right"
        >{{ text.length }}/{{ maxlength }}</div>
      </div>
    </div>
    <el-dialog
      v-model="isProtocolVisible"
      title="枝网查重用户协议"
      :width="null"
      :lock-scroll="false"
    >
      <Protocol />
    </el-dialog>
    <ArticleList :articleArray="response.articleArray" :rawText="text" />
  </div>
</template>

<script lang="ts" setup>
import ArticleList from '@/components/public/ArticleList.vue'
import Protocol from '@/components/public/Protocol.vue'
import Notice from '@/components/public/Notice.vue'

import { ref, reactive, computed, onMounted, watch } from 'vue'
import { message, isCharacterDraw, copyContent, storage } from '@/utils'
import { onStartTyping } from '@vueuse/core'
import api from '@/api'
import clipboard from 'clipboard'

// max textarea length
const maxlength = 1000

const notice = ref([
  { message: '查重过程中遇到的问题可以向B站@查重姬Official反馈，反馈地址在页脚 ——枝网项目组' }
])

let response = reactive<any>({
  rate: (0).toFixed(2),
  articleArray: [],
})
const text = ref('')

const isComplete = ref(true)
const isProtocolVisible = ref(false)
const isAgreed = ref(true)
const input = ref<HTMLInputElement | null>(null)

onStartTyping(() => {
  // @ts-ignore
  if (!input.value?.active)
    input.value!.focus()
})

const reportable = computed(() => response.startTime)
const typeofText = computed(() => isCharacterDraw(text) ? '字符画' : '普通小作文')
const rateColor = computed(() => {
  const percent = Number(response.rate)
  let color = 'green'
  if (percent > 25) color = 'blue'
  if (percent > 50) color = 'yellow'
  if (percent > 75) color = 'red'
  return color
})

const check = async () => {
  if (!isComplete.value) {
    message('还没找完，请等一等捏', 'warning')
    return
  }

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

  // const serverInfo: serverInfo[] = [
  //   {
  //     name: '枝网查重',
  //     url: 'https://asoulcnki.asia/v1/api/check'
  //   }
  // ]

  isComplete.value = false

  try {
    const data = await api.check(text.value)
    // const data = await api.allCheck(serverInfo, { data: { text: text.value }, method: 'post' })
    response.rate = data.rate
    response.articleArray = data.articleArray
    response.startTime = data.startTime
    response.lastUpdate = data.lastUpdate

    const tipMessage = (data.articleArray!.length == 0)
      ? '没有找到重复的小作文捏'
      : '点击复制以获取查重报告'
    message(tipMessage)
  } catch (err) {
    message('网络错误或服务器异常,请稍后重试', 'error')
  }

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
  @apply cursor-pointer text-blue-400;
  @apply hover:text-blue-500 hover:underline;
}

.text-container {
  @apply bg-white rounded-md shadow-md my-4 px-2 overflow-hidden;
  @apply dark:bg-gray-800 dark:text-gray-400;
}

.text-header {
  @apply divide-x py-2 px-0 text-gray-500 dark:divide-gray-400;
}

.text-header li {
  @apply outline-none px-2 inline;
}

.text-header li:first-child {
  @apply text-sm pl-0;
}

.green {
  @apply text-green-500;
}

.blue {
  @apply text-blue-500;
}

.yellow {
  @apply text-yellow-500;
}

.red {
  @apply text-red-500;
}

.active {
  @apply cursor-pointer dark:(hover:text-yellow-500 text-gray-400) hover:text-blue-500 ;
}

.active:disabled {
  @apply cursor-not-allowed hover:text-gray-500;
}

.check {
  @apply rounded cursor-pointer bg-blue-500 text-white px-6 float-right;
  @apply hover:bg-blue-600 hover:text-gray-100;
}

.text-input {
  @apply border-none rounded-sm outline-none w-full box-border resize-none block;
  @apply h-80 text-sm leading-relaxed tracking-widest p-2 py-1 break-all;
  @apply dark:bg-gray-700 dark:text-gray-400;
}

.text-status {
  @apply divide-x-2 w-full py-2 pl-1 overflow-hidden dark:divide-gray-500;
}

.text-status-item {
  min-width: 85px;

  @apply text-sm text-center text-gray-500 inline dark:text-gray-400;
}
</style>