import { instance } from '../index'
import { parseTime, handleRelated, reply, Article } from '../../utils'
import { AxiosResponse } from 'axios'

interface RankResponse {
  startTime: string
  lastUpdate: string
  articleArray: Array<Article>
  total: number
}

export interface RankParams {
  sortMode: number
  timeRangeMode: number
  pageSize: number
  pageNum: number
  keywords?: string
  ids?: string
}

/**
 * request ranking
 * @param {*} params request params
 * @returns res.data
 */
export async function ranking(params: RankParams) {
  let response: RankResponse = {
    startTime: '',
    lastUpdate: '',
    articleArray: [],
    total: 0,
  }

  // All params see API Doc
  // https://github.com/ASoulCnki/ASoulCnkiBackend/blob/master/api.md
  await instance
    .get('ranking/', { params })
    .then((res: AxiosResponse) => {
      const data = res.data.data
      response.startTime = parseTime(data.start_time)
      response.lastUpdate = parseTime(data.end_time)
      response.articleArray = handleArticles(data.replies)
      response.total = data.all_count
    })
    .catch((err: AxiosResponse) => {
      throw new Error(err.toString())
    })

  return response
}

/**
 * Rename params in data.data.replies
 * @param {Array<Object>} articles
 * @returns {Array<Object>} renamed Array
 */
function handleArticles(articles: Array<reply>) {
  if (!Array.isArray(articles) || articles.length == 0) {
    return []
  }
  articles = [...new Set(articles)]

  return articles.map((s) => handleRelated(s))
}
