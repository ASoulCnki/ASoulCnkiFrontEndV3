import { convertCheck } from './index'
import { allRequestFactory } from '../mulltiServer/index'

// handle
function handleCheck(responses: any[]) {
  let response: any = {}
  let related: any[] = []
  let [start_time, end_time]: Array<Array<any>> = [[], []]
  let rate: any[] = []

  responses = responses
    .map((s: any) => s.data)
    .filter((s: any) => s.code != undefined && s.code == 0) // remove error response (code != 0)

  responses.map((s: any) => {
    related = related.concat(s.data.related)
    start_time.push(s.data.start_time)
    end_time.push(s.data.end_time)
    rate.push(s.data.rate)
  })

  // related 去重 按时间排序
  related = [...new Set(related.map((s) => JSON.stringify(s)))]
    .map((s) => JSON.parse(s))
    .sort((a, b) => a.start_time - b.start_time)

  response = {
    rate: Math.max(...rate, 0),
    // 最早的开始时间和最晚的结束时间
    start_time: Math.min(...start_time, Date.parse(new Date().toString()) / 1000),
    end_time: Math.max(...end_time, 0),
    related,
  }

  return convertCheck(response)
}

export const allCheck = allRequestFactory(handleCheck)
