import { data } from './constant'

export function getReply(keyword: string) {
  // 看来 60% 左右的时间都是在道歉呢
  const isHumble = () => Math.random() > 0.4

  let fix: string
  if (isHumble()) {
    fix = randomGet(data.humble) + randomGet(data.apology) + randomGet(data.end)
  } else {
    fix = randomGet(data.straightforward)
  }

  keyword = keyword.trim()
  fix = fix.replace(/q/g, keyword)

  return `${data.always_start_with}\n${fix}`
}

export function useChatHistory() {
  const STORAGE_KRY = 'asoulcnki-chat-history'

  return {
    set(data: any) {
      if (typeof data != 'string') data = JSON.stringify(data)
      localStorage.setItem(STORAGE_KRY, data)
    },
    get() {
      return JSON.parse(localStorage.getItem(STORAGE_KRY) || '[]')
    },
  }
}

function randomGet(arr: any[]) {
  const length = arr.length
  const random = Math.floor(Math.random() * length)
  return arr[random]
}
