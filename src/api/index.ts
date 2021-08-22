/*
* Use Remote API
* Example:
*   const data = await api.check(text)
*   response.rate = data.rate
*/

import axios from "axios";
import { message } from "../utils";
import { check } from './check'
import { ranking } from './rank'

const instance = axios.create({
  // When prod, baseURL can replace to '/'
  baseURL: 'https://asoulcnki.asia/v1/api/',
  timeout: 4000  //millsecond
})

instance.interceptors.request.use(conf => {
  // Since some string cause exception
  // When use get, use encodeURIComponent
  if (conf.method == 'get' && conf.params && conf.url) {
    let cache = []
    for (const k in conf.params) {
      cache.push(`${k}=${encodeURIComponent(conf.params[k])}`)
    }
    const params = cache.join('&')

    conf.url += conf.url.includes('?') ? '&' : '?' + params
    conf.params = {}
  }

  // When use post, add headers
  if (conf.method == 'post') {
    conf.headers['Content-Type'] = 'application/json'
  }

  return conf
})

instance.interceptors.response.use(
  (response) : any => {
    // only response.data.code == 0 success
    if (response.data.code != 0) {
      message(response.data.message, 'error')
      return undefined
    }
    return response
  },
  error => {
    message('服务器端可能发生错误,请稍后重试', 'error')
    return Promise.reject(error)
  })

const api = {
  check,
  ranking
}

export { instance }

export default api
