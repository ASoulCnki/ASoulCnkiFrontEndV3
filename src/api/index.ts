/*
 * Use Remote API
 * Example:
 *   const data = await api.check(text)
 *   response.rate = data.rate
 */

import axios from 'axios'
import { message } from '../utils'
import { check, allCheck } from './check'
import { ranking } from './rank'

const instance = axios.create({
  // dev server proxy in vite.config.ts
  baseURL: '/v1/api/',
  timeout: 12000, // 12 sec
})

instance.interceptors.request.use((conf) => {
  // Since some string cause exception
  // When use get, use encodeURIComponent
  if (conf.method == 'get' && conf.params && conf.url) {
    let cache = []
    for (const k in conf.params) {
      if (conf.params[k].toString() != '') cache.push(`${k}=${encodeURIComponent(conf.params[k])}`)
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
  (response): any => {
    // only response.data.code == 0 success
    if (response.data.code != 0) {
      message(response.data.message, 'error')
      return undefined
    }
    return response
  },
  (error) => {
    return Promise.reject(error)
  }
)

const api = {
  check,
  allCheck,
  ranking,
}

export { instance }

export default api
