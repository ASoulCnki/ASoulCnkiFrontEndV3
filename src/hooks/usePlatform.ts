interface usePlatformResult {
  isWin: boolean
  isLinux: boolean
}
export const usePlatform = (): usePlatformResult => {
  if (!window) {
    throw new Error('not in the browser')
  }
  const platform = navigator.platform
  const isWin = /win/i.test(platform)
  const isLinux = /linux/i.test(platform)
  return { isWin, isLinux }
}
