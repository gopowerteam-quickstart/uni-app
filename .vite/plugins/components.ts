import fs from 'fs'
import path from 'path'
import hjson from 'hjson'

function components(options: { dts: string }) {
  const PAGE_FILE_PATH = 'src/pages.json'

  /**
   * 生成定义文件
   */
  function generateComponentDeclaration(easycom, dts) {
    const { custom } = easycom

    if (!custom) return

    const components = Object.entries(custom as Record<string, string>)
      .map(([name, url]) => [name.replace('^', ''), url])
      .filter(([name, _]) => !name.startsWith('fui-'))

    const importCode = generateImport(components)
    const interfaceCode = generateInterface(components)

    const declaration = `${importCode}

declare module 'vue' {
    export interface GlobalComponents {
        ${interfaceCode}
    }
}
`
    fs.writeFileSync(
      path.resolve(dts),
      declaration.replace(/\r\n/g, '\n'),
      'utf-8',
    )
  }

  function generateImport(components) {
    return components
      .map(([key, url]) => `import ${key} from '${url}'`)
      .join('\n')
  }

  function generateInterface(components) {
    return components
      .map(([key, _]) => `${key}: typeof ${key}`)
      .join('\n        ')
  }

  return {
    name: 'vite-plugin-component-declare',
    enforce: 'pre',
    buildStart() {
      const json = fs.readFileSync(path.resolve(PAGE_FILE_PATH), {
        encoding: 'utf-8',
      })

      const { easycom } = hjson.parse(json)

      generateComponentDeclaration(easycom, options.dts)
    },
  }
}

export default components({
  dts: 'typings/component.d.ts',
})
