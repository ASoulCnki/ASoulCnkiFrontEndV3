import { computed, ref, Ref } from 'vue'
import { useTimestamp, useLocalStorage } from '@vueuse/core'

type ActiveStatus = {
  isActive: Ref<boolean>
  isDuring: Ref<boolean>
}

type UseFakeLinkType = {
  data: string
  use: (start: DateInputType, end: DateInputType, link?: string) => UseFakeLinkType
}

type MaybeRef<T> = T | Ref<T>

// return if time between start and end
type DateInputType = string | number | Date

export function useDuring(start: DateInputType, end: DateInputType): Ref<boolean> {
  const parseTimestamp = (s: DateInputType) => {
    if (typeof s !== 'object') {
      s = new Date(s)
    }
    return s.getTime()
  }

  const startTime = parseTimestamp(start)
  const endTime = parseTimestamp(end)

  return computed(() => {
    return useTimestamp().value > startTime && useTimestamp().value < endTime
  })
}

export function useActivity(start: DateInputType, end: DateInputType): Ref<boolean> {
  const isDuring = useDuring(start, end)
  useLocalStorage('useActivity', false)
  if (!isDuring.value) {
    localStorage.removeItem('useActivity')
    return ref(false)
  }
  return isDuring
}

export function useActivityOnce(start: DateInputType, end: DateInputType): ActiveStatus {
  const isDuring = useDuring(start, end)
  if (!isDuring.value) {
    localStorage.removeItem('useActivityOnce')
    return {
      isActive: ref(false),
      isDuring: ref(false),
    }
  }
  return {
    isActive: useLocalStorage('useActivityOnce', false),
    isDuring: isDuring,
  }
}
