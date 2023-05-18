import type { PluginOption } from 'vite'
import request from './request'
import unocss from './unocss'
import autoImport from './auto-import'
import svg from './svg'
import assets from './assets'
import components from './components'
import router from './router'

/**
 * DefineVitePlugins
 * @param plugins
 * @returns
 */
export function defineVitePlugins(
  plugins: PluginOption[] = [],
): Record<'plugins', PluginOption[]> {
  return {
    plugins: [
      autoImport,
      unocss,
      request,
      svg,
      assets,
      components,
      router,
      ...plugins,
    ],
  }
}
