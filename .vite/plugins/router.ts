import fs from 'fs'
import path from 'path'
import hjson from 'hjson'
// 默认定义文件名

/**
 * Router插件
 * @param options
 * @returns
 */
function router(options: { dts: string }) {
  /**
   * 生成定义文件
   */
  function generatePagesDeclaration(pages, dts) {
    const declaration = `declare type RouterPages =
      ${pages.map((x) => `| \'/${x.path}\'\n`).join('    ')}`

    fs.writeFileSync(
      path.resolve(dts),
      declaration.replace(/\r\n/g, '\n'),
      'utf-8',
    )
  }

  return {
    name: 'vite-plugin-request-declare',
    enforce: 'pre',
    buildStart() {
      const json = fs.readFileSync(path.resolve('src/pages.json'), {
        encoding: 'utf-8',
      })

      const { pages } = hjson.parse(json)

      generatePagesDeclaration(pages, options.dts)
    },
  }
}

export default router({
  dts: 'typings/router.d.ts',
})
