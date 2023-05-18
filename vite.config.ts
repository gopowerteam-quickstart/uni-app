import { defineConfig } from 'vite'
import uni from '@dcloudio/vite-plugin-uni'
import { defineVitePlugins } from './.vite/plugins'
import { defineViteResolve } from './.vite/resolve'
import { defineViteCSS } from './.vite/css'

export default defineConfig({
  ...defineViteResolve(),
  ...defineViteCSS(),
  ...defineVitePlugins([uni({ vueOptions: { reactivityTransform: true } })]),
})
