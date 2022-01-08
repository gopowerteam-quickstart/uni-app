import { defineConfig } from 'vite'
import { resolve } from 'path'
import proxyConfig from './proxy.config'
import autoImportLibs from './auto-import'

import uni from '@dcloudio/vite-plugin-uni'
import eslint from 'vite-plugin-eslint'
import request from './scripts/vite-plugins/request'
import router from './scripts/vite-plugins/router'
import autoImport from 'unplugin-auto-import/vite'

// https://vitejs.dev/config/
export default defineConfig({
    resolve: {
        alias: {
            '@/': `${resolve(__dirname, 'src')}/`
        }
    },
    server: {
        proxy: proxyConfig
    },
    plugins: [
        uni(),
        eslint({
            include: ['src/**/*.{vue,ts,tsx}']
        }),
        router(),
        request({
            root: resolve(process.cwd(), 'src'),
            alias: '@',
            serviceDir: 'http/services',
            serviceDeclaration: 'typings/request.d.ts'
        }),
        autoImport({
            dts: 'typings/auto-imports.d.ts',
            include: [/\.tsx?$/, /\.vue\??/],
            imports: autoImportLibs
        })
    ]
})
