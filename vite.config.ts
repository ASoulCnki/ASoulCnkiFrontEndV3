import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import VitePluginComponents, { ElementPlusResolver } from 'vite-plugin-components'
import styleImport from 'vite-plugin-style-import'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    VitePluginComponents({
      customComponentResolvers: [ElementPlusResolver()],
    }),
    styleImport({
      libs: [
        {
          libraryName: 'element-plus',
          esModule: true,
          resolveStyle: name => {
            return `element-plus/lib/theme-chalk/${name}.css`
          }
        }
      ]
    })
  ],
  server: {
    fs: {
      allow: ['..']
    }
  },
  resolve: {
    alias: [
      {find:'@', replacement:'/src'}
    ]
  }
})
