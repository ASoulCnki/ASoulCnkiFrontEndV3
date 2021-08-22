// add link for article content(only used in no marked text)
// for security, now only sppourt b23.tv/ and *.bilibili.com/

export function textToLink(content: string) : string {
  // repalce before html tag
  content = content.replace(/<\/?[\S ]+>/g, '')

  const regex = /(https?:\/\/|)(b23\.tv\/\S{0,8}|\S+\.bilibili.com\/\S+\d+)/g

  const parseLink = (url:string) =>  {
    //if not include http, add it
    url = url.startsWith('http') ? url : `https://${url}` 
    return `<a href=${url} target="_blank">${url}</a>`
  }

  // replace url in regex to a tag
  const linkedText = content.replace(regex, s => parseLink(s))

  return linkedText
}

