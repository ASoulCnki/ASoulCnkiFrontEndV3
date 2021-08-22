import { instance } from '@/api'
import { parseTime, handleRelated, message } from '../../utils'

/**
 * request ranking
 * @param {*} params request params 
 * @returns res.data
 */
export async function ranking(params) {

  let response = {}

  // All params see API Doc
  // https://github.com/ASoulCnki/ASoulCnkiBackend/blob/master/api.md
  await instance.get('ranking/', {params})
    .then( res => {
      const data = res.data.data
      console.log(res.data);
      response.startTime = parseTime(data.start_time)
      response.lastUpdate = parseTime(data.end_time)
      response.articleArray = handleArticles(data.replies)
      response.total = data.all_count
    })
    .catch( err => {
      message('服务器异常', 'error')
      throw new Error(err)
    })

  return response
}

/**
 * Rename params in data.data.replies
 * @param {Array<Object>} articles  
 * @returns {Array<Object>} renamed Array
 */
function handleArticles(articles) {

  if ( !Array.isArray(articles) || articles.length == 0 ) {
    return []
  }
  articles = [... new Set(articles)]

  return articles.map(s => handleRelated(s))
}