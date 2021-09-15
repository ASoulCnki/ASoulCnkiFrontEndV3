import axios, { AxiosPromise, AxiosRequestConfig } from 'axios'
import { serverInfo } from './types'

// set axios defalut config
axios.defaults.timeout = 4000 // mill seconds

axios.interceptors.request.use((conf) => {
  // When use get, replace encodeURI with encodeURIComponent
  if (conf.method == 'get' && conf.url && conf.data) {
    let paramsCache: string[] = []

    for (const k in conf.data) {
      let v = conf.data[k]
      // 当参数不为空，添加到URL
      if (v.toString() != '') paramsCache.push(`${k}=${encodeURIComponent(v)}`)
    }

    conf.url = (conf.url.includes('?') ? '&' : '?') + paramsCache.join('&')
  }

  return conf
})

axios.interceptors.response.use(
  (response) => response,
  () => Promise.resolve({ data: { code: -1 } }) // When request error, Ignore it
)

// param 'data' can be used for GET 'params'
function subRequest(conf: AxiosRequestConfig): AxiosPromise {
  return axios(conf).catch((err) => err)
}

// 默认合并数据函数
// return response[0] or {}
// 每个接口需要单独编写对应和合并数据函数
function mergeResponse(responses: any[]) {
  return responses.length > 1 ? responses[0] : {}
}

// create async allRequest function
export function allRequestFactory(mergeFn?: Function) {
  const mergeFunction = mergeFn || mergeResponse

  return async (servers: serverInfo[], conf: AxiosRequestConfig) => {
    const axiosPendingArray: AxiosPromise[] = []
    // returned response
    let response: any
    // from servers get axios peomise array

    servers.map((server) => {
      conf.url = server.url
      axiosPendingArray.push(subRequest(conf))
    })

    await axios
      .all(axiosPendingArray)
      .then(
        axios.spread((...args: any[]) => {
          response = mergeFunction(args)
        })
      )
      .catch((err) => err)

    return response
  }
}
