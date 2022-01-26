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

// https://vitejs.dev/config/
export default defineConfig({
    resolve: {
        alias: {
            '@/': `${resolve(__dirname, 'src')}/`
        }
    },
    plugins: [
        uni(),

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
