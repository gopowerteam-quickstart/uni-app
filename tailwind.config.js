module.exports = {
    purge: ['./public/index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
    darkMode: false,
    separator: '__', // 兼容小程序，将 : 替换成 __
    theme: {
        extend: {}
    },
    variants: {},
    plugins: [],
    corePlugins: {
        // 兼容小程序，将带有 * 选择器的插件禁用
        preflight: false,
        space: false,
        divideColor: false,
        divideOpacity: false,
        divideStyle: false,
        divideWidth: false
    }
}
