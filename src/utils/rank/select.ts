export interface RankFilter {
  name: string
  paramsName: string
  type: 'text' | 'single' | 'multi'
  options?: Array<FilterOptions>
}

interface FilterOptions {
  text: string
  value: number | string | undefined | Array<any>
}

export interface RankParams {
  sortMode: number
  timeRangeMode: number
  pageSize: number
  pageNum: number
  ids?: string
  keywords?: string
}

export function reset(filters: Array<RankFilter>): Array<Array<number> | number | string> {
  return filters.map((s) => {
    switch (s.type) {
      case 'multi':
        return []
      case 'single':
        return 0
      case 'text':
        return ''
    }
  })
}

/**
 * get KeyWords Array
 * @param s input Text
 * @returns keywords Array (most 3 keywords(length <= 10) )
 */
export function handleKeywords(s: string) {
  let tempArray = s.split(' ').filter((s: string) => {
    const pureStr = s.trim()
    return pureStr.length < 10 && pureStr != ''
  })

  return [...new Set(tempArray)].splice(0, 3)
}

export function arrayToParams(data: Array<any>, filters: Array<RankFilter>) {
  let cacheParams: any = {}

  filters.forEach((s, index) => {
    let value: string | number = 0

    if (s.type == 'multi') {
      value = data[index].length == s.options!.length ? '' : data[index].join(',')
    }
    if (s.type == 'text') {
      value = handleKeywords(data[index]).join(',')
    }
    if (s.type == 'single') {
      value = data[index]
    }
    cacheParams[s.paramsName] = value
  })

  return cacheParams
}
