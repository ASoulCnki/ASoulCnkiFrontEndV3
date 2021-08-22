import { instance } from '../../api'
import { convert } from '../../utils/index'
import { parseTime } from '../../utils/time'

/**
 * 
 * @param {String} text need checked text
 * @returns response startTime, lastUpdete, rate, articleArray
 */
export async function check(text) {

  const response = {}
  const data = {text: text}
  await instance.post('check', data)
    .then( res => {
      const data = res.data.data

      response.startTime = parseTime(data.start_time)
      response.lastUpdate = parseTime(data.end_time)
      response.rate = (data.rate * 100).toFixed(2)
      response.articleArray = convert(data.related)
    })
    // .catch( err => {
    //   message('请求异常，请稍后重试', 'error')
    //   throw new Error(err)
    // })

  return response
}

