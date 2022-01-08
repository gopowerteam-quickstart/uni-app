import fs from 'fs'
import path from 'path'
import hjson from 'hjson'
// 默认定义文件名
const DECLARATION_DIR = 'typings'
const DECLARATION_FILE = 'router.d.ts'

export default () => {
    return {
        name: 'vite-plugin--request',
        enforce: 'pre',
        buildStart() {
            const json = fs.readFileSync(path.resolve('src/pages.json'), {
                encoding: 'utf-8'
            })

            const { pages } = hjson.parse(json)
            generatePagesDeclaration(pages)
        }
    }
}

/**
 * 生成定义文件
 */
function generatePagesDeclaration(pages) {
    const declaration = `declare type RouterPages = ${pages
        .map(x => '"/' + x.path + '"')
        .join(' | ')}`

    fs.writeFileSync(
        path.resolve(`${DECLARATION_DIR}/${DECLARATION_FILE}`),
        declaration,
        'utf-8'
    )
}
