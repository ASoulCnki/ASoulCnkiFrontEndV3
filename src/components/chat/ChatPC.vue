<script lang="ts" setup>
import ChatMessage from '@/components/chat/ChatMessage.vue'
import ChatUser from '@/components/chat/ChatUser.vue'

import { shallowRef, ref, watch, onMounted, computed } from 'vue'
import { onKeyUp, useTitle } from '@vueuse/core'
import { formatTime } from '@/utils/time'

type ChatMessageType = {
  message: string
  time: string | number
  isMe: boolean
}

const props = withDefaults(defineProps<{
  chatHistory?: ChatMessageType[],
  chatNow: ChatMessageType[]
}>(), {
})

const emit = defineEmits(['send', 'clearHistory'])

const message = shallowRef<string>('')

const textLength = computed(() => message.value.length)
const chat = ref<HTMLElement>()
const time = ref<string>()

const sendMessage = () => {
  const content = message.value.trim()
  if (content.length > 0) {
    message.value = ''
    emit('send', content)
  }
}

const clearHistory = () => {
  emit('clearHistory')
}

watch(props.chatNow, () => {
  setTimeout(() => chat.value!.scrollTop = chat.value!.scrollHeight, 0)
})

onKeyUp('Enter', () => sendMessage())

onMounted(() => {
  useTitle('阿草的太极教室')
  const t = new Date()
  time.value = formatTime(t, '{y}-{m}-{d} {h}:{i}')
  setTimeout(() => chat.value!.scrollTop = chat.value!.scrollHeight, 0)
})
</script>

<template>
  <div class="w-full top-0 left-0 main fixed">
    <div class="mx-auto space-y-2 mb-10 w-full pt-2 sm:w-4/5 md:w-min">
      <div
        class="bg-white rounded-md flex h-40px shadow p-2 px-4 text-gray-600 justify-between dark"
      >
        <span>我的消息</span>
        <span class="cursor-pointer space-x-2">
          <router-link to="/">枝网查重</router-link>
          <router-link to="/rank">枝江作文展</router-link>
        </span>
      </div>
      <div class="border rounded-md flex shadow-md overflow-hidden dark">
        <div
          class="bg-white border-r min-h-[300px] w-240px dark overflow-auto hidden lg:block"
        >
          <div
            class="border-b h-33px text-sm py-5px px-3 text-gray-600 dark"
          >近期消息</div>
          <ChatUser :name="'阿草 Bot'" :description="'非官方 仅供娱乐'" />
        </div>
        <div class="bg-[#f5f5f5] right mb-0 w-full px-0 dark md:w-640px">
          <div class="bg-white border-b text-center py-1 dark">阿草 Bot</div>
          <div class="message-list dark" ref="chat">
            <ChatMessage
              v-for="i in chatHistory"
              :key="i.time"
              :is-me="i.isMe"
              :message="i.message"
            />
            <div
              class="font-400 text-center text-xs py-3 text-gray-400"
            >{{ time }}</div>
            <ChatMessage
              v-for="i in chatNow"
              :key="i.time"
              :is-me="i.isMe"
              :message="i.message"
            />
          </div>

          <div class="border-t w-full bottom-0 dark">
            <div class="flex space-x-3 h-42px p-2 px-4">
              <img
                v-for="i in ['img', 'emoji']"
                class="cursor-pointer h-22px mt-2px text-gray-300 w-22px"
                :src="`/assets/images/${i}.svg`"
              />
              <span
                class="border rounded-lg cursor-pointer text-base px-3 text-gray-500 dark:border-dark-50"
                @click="clearHistory"
              >清空</span>
            </div>
            <textarea v-model="message" maxlength="500" class="text-area"></textarea>
            <div
              class="space-x-2 bg-opacity-0 p-2 pt-0"
              style="direction: rtl;"
            >
              <span @click="sendMessage" class="send-botton">发送</span>
              <span
                class="px-3 text-13px text-gray-400 select-none"
              >{{ textLength }}/500</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.dark {
  @apply border-gray-300 dark:(bg-dark-200 text-gray-400 border-dark-50) ;
}

.main {
  background: url("/assets/images/bg.jpg") top/cover fixed no-repeat;
  @apply h-full;
}

.message-list {
  @apply h-420px w-full pt-5 pb-100px overflow-y-scroll;
}
.message-list::after {
  content: "仅供娱乐，请勿当真";
  transform: translateX(-50%);
  @apply font-bold text-black opacity-30 pb-16 top-1/6
    left-1/2 text-2xl relative inline-block
    dark:(text-gray-200);
}

.text-area {
  @apply outline-none bg-[#f5f5f5] h-140px text-sm leading-relaxed 
    tracking-wider w-full p-1 px-2 text-gray-600 resize-none
    dark:(bg-dark-200 text-gray-400) ;
}

.send-botton {
  @apply rounded-md cursor-pointer outline-none bg-[#1389bf]
    h-28px text-white text-sm text-center pt-1 w-86px inline-block
    hover:(bg-[#2FAEE3]);
}

.send-button:disabled {
  @apply bg-white;
}
</style>
