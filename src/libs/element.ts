/*
  部分引入Element-Plus
*/

import {
  ElCarousel,
  ElCarouselItem,
  ElDialog,
  ElMessage
} from 'element-plus'

import { App } from 'vue'

const Element = {
  install(app: App) {
    app.use(ElCarousel)
    app.use(ElCarouselItem)
    app.use(ElDialog)
    app.use(ElMessage)
  }
}

export default Element