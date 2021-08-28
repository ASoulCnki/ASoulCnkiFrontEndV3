
export const useUA = () => {
  if (!window) {
    throw new Error('not in the browser')
  }
  const ua = navigator.userAgent
  const isChrome = /chrome/i.test(ua)
  const isSafari = /safari/i.test(ua)
  return { isChrome, isSafari }
}
