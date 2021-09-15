type Addr = `${'http' | 'https'}://${string}` | `/${string}`
type HexColor = `#${string}`
export interface Member {
  name: string
  href: Addr
  imgPath: Addr
  imgApplePath: Addr
  color: HexColor
}
