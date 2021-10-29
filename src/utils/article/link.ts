// add link for article content(only used in no marked text)
// for security, now only support b23.tv/ and *.bilibili.com/
import { useDuring } from '@/hooks'

const isCarolBirthday = useDuring('2021-11-2', '2021-11-3')
const redHighHeeledShoes = 'https://www.bilibili.com/video/BV1db4y117Q1'

export function textToLink(content: string): string {
  // replace before html tag
  content = content.replace(/<\/?[\S ]+>/g, '')

  const regex = /(https?:\/\/|){0,1}(b23\.tv\/(BV)?[\w\d]{0,10}|\w+\.bilibili.com\/[\w\d\/\?=&#]+)/g

  const parseLink = (url: string) => {
    //if not include http, add it
    url = url.startsWith('http') ? url : `https://${url}`
    return `<a href=${isCarolBirthday.value ? redHighHeeledShoes : url} target="_blank">${url}</a>`
  }

  // replace url in regex to a tag
  const linkedText = content.replace(regex, (s) => parseLink(s))

  return linkedText
}
