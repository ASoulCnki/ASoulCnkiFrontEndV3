import { RankFilter } from '@/utils/rank/select'

export const rankFilterArray: Array<RankFilter> = [
  {
    paramsName: 'timeRangeMode',
    name: '时间跨度',
    options: [
      { text: '全部时间', value: 0 },
      { text: '本周', value: 1 },
      { text: '三天内', value: 2 },
    ],
    type: 'single',
  },
  {
    paramsName: 'sortMode',
    name: '筛选方式',
    options: [
      { text: '累计点赞数', value: 0 },
      { text: '点赞数', value: 1 },
      { text: '引用数', value: 2 },
    ],
    type: 'single',
  },
  {
    paramsName: 'ids',
    name: '评论区[多选]',
    options: [
      { text: '向晚', value: 672346917 },
      { text: '贝拉', value: 672353429 },
      { text: '珈乐', value: 351609538 },
      { text: '嘉然', value: 672328094 },
      { text: '乃琳', value: 672342685 },
      { text: '官号', value: 703007996 },
    ],
    type: 'multi',
  },
  {
    paramsName: 'keywords',
    name: '关键词',
    type: 'text',
  },
]
