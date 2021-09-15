const session: any = {}
const SESSION_KEY = 'client_session'

session.get = () => {
  const data = sessionStorage.getItem(SESSION_KEY) || localStorage.getItem(SESSION_KEY) || '{}'
  const session = JSON.parse(data)
  const now = new Date().getTime()

  if (!session || !session.expire || session.expire > now) {
    return {}
  }
  return session.payload || {}
}

session.set = (payload: string, rememberMe: boolean = false) => {
  const session: ISession = {
    // 过期时间，毫秒
    expire: new Date().getTime() + 86400000,
    payload,
  }

  const sessionString = JSON.stringify(session)

  rememberMe ? localStorage.setItem(SESSION_KEY, sessionString) : sessionStorage.setItem(SESSION_KEY, sessionString)
}

session.remove = () => {
  localStorage.removeItem(SESSION_KEY)
  sessionStorage.removeItem(SESSION_KEY)
}

session.exist = () => {
  return !!(localStorage.getItem(SESSION_KEY) || sessionStorage.getItem(SESSION_KEY))
}

export default session
