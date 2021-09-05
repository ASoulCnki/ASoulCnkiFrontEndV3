type Addr = `${'http' | 'https'}://${string}` | `/${string}`

interface ILink {
  name: string,
  url: Addr,
  icon?: string //icon name defined in assets/css/iconfont.css
}

interface ILinkGroup {
  groupName: string,
  links: ILink[]
}

export type ILinks = ILinkGroup[]