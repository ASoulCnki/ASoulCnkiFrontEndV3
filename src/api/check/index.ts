import { instance } from '..'
import { Article, convert } from '../../utils/index'
import { parseTime, message } from '../../utils/'
import { allCheck } from './multi'

interface CheckResponse {
  articleArray: Array<Article>
  startTime: string
  lastUpdate: string
  rate: string
}

/**
 * Use Remote check API
 * @param {String} text need checked text (10 < text.length < 1000)
 * @returns response startTime, lastUpdate, rate, articleArray
 */
export async function check(text: string) {
  let response = {}
  const data = { text: text }
  await instance
    .post('check', data)
    .then((res) => {
      const data = res.data.data
      response = convertCheck(data)
    })
    .catch((err) => {
      message('请求异常，请稍后重试', 'error')
      throw new Error(err)
    })

  return response
}

export function convertCheck(data: any) {
  let response: CheckResponse = {
    startTime: '',
    lastUpdate: '',
    articleArray: [],
    rate: '0.00',
  }

  response.startTime = parseTime(data.start_time)
  response.lastUpdate = parseTime(data.end_time)
  response.rate = (data.rate * 100).toFixed(2)
  response.articleArray = convert(data.related)

  return response
}

export { allCheck }
