<script lang="ts" setup>
import ChatPC from '@/components/chat/ChatPC.vue'

import { shallowRef, ref, onMounted } from 'vue'
import { useEventListener, useTitle } from '@vueuse/core'
import { getReply, useChatHistory } from '@/api/qa'

type ChatMessageType = {
  message: string
  time: string | number
  isMe: boolean
}

const chatHistory = shallowRef<ChatMessageType[]>([])
const chatNow = ref<ChatMessageType[]>([])

const { set, get } = useChatHistory()

const sendMessage = (content: string) => {
  chatNow.value.push({
    message: content,
    time: Date.parse(new Date().toString()),
    isMe: true
  })

  setTimeout(() => {
    chatNow.value.push({
      message: getReply(content),
      time: Date.parse(new Date().toString()),
      isMe: false
    })
  }, 1000)
}

function clearHistory () {
  chatHistory.value = []
  chatNow.value = []
}

onMounted(() => {
  useTitle('阿草的太极教室')
  chatHistory.value = get() || []
})

useEventListener('beforeunload', () => {
  set([...chatHistory.value, ...chatNow.value])
})
</script>

<template>
  <ChatPC
    :chat-history="chatHistory"
    :chat-now="chatNow"
    @send="sendMessage"
    @clear-history="clearHistory"
  />
</template>
