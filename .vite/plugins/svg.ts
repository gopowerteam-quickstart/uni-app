import fs from 'fs'
import path from 'path'
import { optimize } from 'svgo'

/**
 * SVG插件
 * @param option
 * @returns
 */
function svg(option: { dir: string; dts: string }) {
  // 虚拟模块ID
  const MODULE_ID = 'virtual:icons'

  // 服务列表
  const icons: { [key: string]: string } = {}

  /**
   * 加载图标数据
   * @param dir
   */
  function loadIcons(dir: string) {
    const files = fs.readdirSync(path.resolve(dir))

    files.forEach((file) => {
      if (!file.endsWith('.svg')) return
      const filepath = path.resolve(path.join(dir, file))
      const svg = fs.readFileSync(path.resolve(path.join(dir, file)), {
        encoding: 'utf-8',
      })

      //  压缩svg
      const { data } = optimize(svg, {
        plugins: ['preset-default'],
        path: filepath,
      })

      icons[file.replace(/\.svg$/, '')] = Buffer.from(data).toString('base64')
    })
  }

  /**
   * 生成定义文件
   */
  function generateDeclaration(dts: string) {
    const declaration = `declare module '${MODULE_ID}' {
  const iconNames = [
    ${Object.keys(icons)
      .map((x) => `'${x}'`)
      .join(',\n    ')}] as const

  export const icons: Record<typeof iconNames[number], string>
}
`

    fs.writeFileSync(
      path.resolve(dts),
      declaration.replace(/\r\n/g, '\n'),
      'utf-8',
    )
  }

  function generateCode() {
    return `export const icons = ${JSON.stringify(icons)}`
  }

  return {
    name: 'vite-plugin-svg-icon',
    enforce: 'pre',
    resolveId(id: string) {
      if (id === MODULE_ID) {
        return MODULE_ID
      }
    },
    load(id: string) {
      if (id !== MODULE_ID) return

      loadIcons(option.dir)

      generateDeclaration(option.dts)

      return generateCode()
    },
  }
}

export default svg({
  dir: 'src/assets/icons',
  dts: 'typings/icons.d.ts',
})
