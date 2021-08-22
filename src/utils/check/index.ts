import { Article, handleRelated, parseTime, reply } from '../index'
import { ref, Ref } from 'vue'

/**
* 判别当前小作文是否为字符画, 目前仅在check页面使用
* @param {Ref|String} s 
* @returns {boolean}
*/
export function isChracterDraw(s: Ref|String) {
  const str = ref(s)

  //统计常规符号：汉字 字母 数字
  const percentOfNormal = (s: string) => {

    if (s.length == 0) return 0
    // 去除b站表情对较短小作文的影响，将其作为特殊符号统计
    s = s.replace(/\[[\u4e00-\u9fa5_a-z0-9]{3,14}\]+/gi, ' ')
  
    const regex = /([0-9a-z\u4e00-\u9fa5)]+)/i
    const percentage = [...s].filter(s => s.match(regex)).length / s.length
    
    return percentage
  }
  
  // 统计出现的字符种类
  const numOfSymbol = (s: string) =>  [... new Set(s)].length

  const [ percentage, num ] = [ percentOfNormal(str.value), numOfSymbol(str.value) ]

	return (percentage < 0.15 || num < 7) ? true : false
}

/**
* Change Format of response article Arrays
* @param {Array} arr
* @returns {Array}
*/
export function convert(arr:reply) {
  return ( Array.isArray(arr) && arr.length > 0 ) ?
    arr.map(s => {
      const article:Article = handleRelated(s.reply)
      article.rate = s.rate.toFixed(2)
      return article
    }) : []
}

/**
 * get Check report for clipboard
 * @param {Ref|Object} response check response 
 * @returns {String} check report
 */
export function copyContent(response: any) {
  const time = parseTime(new Date())
  let content = '枝网文本复制检测报告(简洁)\n'
  content += `查重时间: ${time}\n`
  content += `总文字复制比: ${response.rate}%\n`

  if (response.articleArray.length > 0) {
    content += `相似小作文: ${response.articleArray[0].url}\n`
    content += `作者: ${response.articleArray[0].author.name}\n`
    content += `发表时间: ${response.articleArray[0].createTime}\n`  
  }

  content += `\n查重结果仅作参考，请注意辨别是否为原创`

  return content
}
