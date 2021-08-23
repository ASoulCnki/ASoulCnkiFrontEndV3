import { instance } from '..'
import { Article, convert } from '../../utils/index'
import { parseTime, message } from '../../utils/'

interface CheckResponse {
  articleArray: Array<Article>
  startTime: string,
  lastUpdate: string,
  rate: string
}

/**
 * Use Remote check API 
 * @param {String} text need checked text (10 < text.length < 1000)
 * @returns response startTime, lastUpdete, rate, articleArray
 */
export async function check(text: string) {

  const response: CheckResponse = {
    startTime: '',
    lastUpdate: '',
    articleArray: [],
    rate: '0.00'
  }
  const data = {text: text}
  await instance.post('check', data)
    .then( res => {
      const data = res.data.data

      response.startTime = parseTime(data.start_time)
      response.lastUpdate = parseTime(data.end_time)
      response.rate = (data.rate * 100).toFixed(2)
      response.articleArray = convert(data.related)
    })
    .catch( err => {
      message('请求异常，请稍后重试', 'error')
      throw new Error(err)
    })

  return response
}
