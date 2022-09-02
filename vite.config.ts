import { defineConfig } from 'vite'
import { resolve } from 'path'
import autoImportLibs from './auto-import'
import uni from '@dcloudio/vite-plugin-uni'
import eslint from 'vite-plugin-eslint'
import request from './scripts/vite-plugins/request'
import router from './scripts/vite-plugins/router'
import component from './scripts/vite-plugins/component'
import autoImport from 'unplugin-auto-import/vite'
import svg from './scripts/vite-plugins/svg-icon'
import Unocss from 'unocss/vite'
import transformWeClass from 'unplugin-transform-we-class/vite'
import {
    defaultAttributes,
    defaultIgnoreNonValuedAttributes,
    presetAttributifyWechat
} from 'unplugin-unocss-attributify-wechat/vite'
import extractorPug from '@unocss/extractor-pug'
import { extractorSplit } from '@unocss/core'
// https://vitejs.dev/config/
export default defineConfig({
    resolve: {
        alias: {
            '@': `${resolve(__dirname, 'src')}`
        }
    },
    plugins: [
        uni(),
        process.env.UNI_COMPILER !== 'nvue'
            ? Unocss({
                  extractors: [extractorPug(), extractorSplit]
              })
            : undefined,
        // https://github.com/MellowCo/unplugin-unocss-attributify-wechat
        presetAttributifyWechat({
            // options
        }),

        // https://github.com/MellowCo/unplugin-transform-we-class
        transformWeClass({
            // options
        }),
        eslint({
            fix: true,
            include: ['src/**/*.{vue,ts,tsx}']
        }),
        svg({
            dir: 'src/assets/icons',
            dts: 'typings/icons.d.ts'
        }),
        router({
            dts: 'typings/router.d.ts'
        }),
        component({
            dts: 'typings/component.d.ts'
        }),
        request({
            alias: '@',
            dir: 'src/http/services',
            dts: 'typings/request.d.ts'
        }),
        autoImport({
            dts: 'typings/auto-imports.d.ts',
            include: [/\.tsx?$/, /\.vue\??/],
            imports: autoImportLibs
        })
    ]
})
