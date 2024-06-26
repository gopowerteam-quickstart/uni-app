import AutoImport from '../plugins/auto-import'
import ReactivityTransform from '../plugins/reactivity-transform'
import UniApp from '../plugins/uni-app'
import UniComponents from '../plugins/uni-components'
import UniLayouts from '../plugins/uni-layouts'
import UniPages from '../plugins/uni-pages'
import UnoCSS from '../plugins/unocss'

/**
 * DefineVitePlugins
 */
export async function defineVitePlugins() {
  return {
    plugins: [
      UniComponents,
      UniPages,
      UniLayouts,
      UniApp,
      AutoImport,
      ReactivityTransform,
      UnoCSS(),
    ],
  }
}
