type Addr = `${ 'http' | 'https' }://${string}` | `/${string}`

export interface serverInfo {
  name: string,
  url: Addr,
  include?: string[]
}