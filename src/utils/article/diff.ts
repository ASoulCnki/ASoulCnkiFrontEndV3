interface cache {
  start: number
  end: number
}

/**
 * 合并重复区间
 * @param {Array<Object>} intervals 待去重区间
 * @returns {Array<Object>} 去重的区间
 */
const merge = function (intervals: Array<cache>) {
  if (intervals.length == 0) return []

  intervals.sort((a, b) => a.start - b.start)

  let outputs = [intervals[0]]

  intervals.forEach((s) => {
    const lastInterval = outputs[outputs.length - 1]
    const [currLeft, currRight] = [s.start, s.end]

    !!(lastInterval.end < currLeft) ? outputs.push(s) : (lastInterval.end = Math.max(lastInterval.end, currRight))
  })

  return outputs.sort((a, b) => b.start - a.start)
}

/**
 * 标记重复区间
 * @param {String} origin 待查重文本
 * @param {String} dest 返回的文本
 * @param {Number} sensitive 敏感长度
 * @returns {Array<Object>} 重复区间数组（根据开始位置逆序）
 */
function compare(origin: string, dest: string, sensitive: number) {
  const length = origin.length * dest.length
  let matrix = Array(length).fill(0)
  let cacheArray: Array<cache> = []
  let [originArr, destArr] = [[...origin], [...dest]]

  const convert = (indexY: number, indexX: number) => indexY * origin.length + indexX

  // remove obj from arr
  const remove = (arr: Array<cache>, obj: cache) => {
    const x = JSON.stringify(obj)
    return arr.filter((s) => JSON.stringify(s) != x)
  }

  // cache repeat area start index to end index
  //   start: Number, end: Number
  const newCache = (end: number, offset: number) => {
    let start = end - offset
    start = start < 0 ? 0 : start + 1
    return {
      start: start,
      end: offset + start,
    }
  }

  originArr.forEach((s, index) => {
    if (dest[0] == s) matrix[index] = 1
  })

  destArr.forEach((x, indexX) => {
    originArr.forEach((y, indexY) => {
      const index = convert(indexY, indexX)
      const preIndex = convert(indexY - 1, indexX - 1)

      if (x == y) {
        if (indexY == 0) {
          matrix[index] = 1
          return
        }

        matrix[index] = matrix[preIndex] + 1

        if (matrix[index] >= sensitive) {
          cacheArray.push(newCache(indexY, matrix[index]))
        }
        if (matrix[index] > sensitive) {
          cacheArray = remove(cacheArray, newCache(indexY - 1, matrix[preIndex]))
        }
      }
    })
  })
  return merge(cacheArray)
}

/**
 * 给重复区间加tag, 默认使用em标签
 * @param {String} s raw text
 * @param {Array} flag repeat area Array
 * @param {String} tag used tag, default em
 * @returns tagged text
 */
const render = (s: string, flag: Array<cache>, tag: string) => {
  const strArr = [...s]
  const tagName = tag.match(/\w+/)
  tag = tagName ? tagName[0].toLowerCase() : 'em'

  for (const i of flag) {
    strArr.splice(i.end, 0, `</${tag}>`)
    strArr.splice(i.start, 0, `<${tag}>`)
  }

  return strArr.join('')
}

/**
 * 对文本重复对比，给重复部分加tag
 * @param {string} origin 待查重文本
 * @param {string} dest 服务器返回的文本
 * @param {number} sensitive 敏感长度
 * @param {string} tag HTML tag, example a, em
 * @returns {string} 做好标记的文本
 */
export function diffText(origin: string, dest: string, sensitive = 4, tag = 'em') {
  const flag = compare(dest, origin, sensitive)
  return render(dest, flag, tag)
}
