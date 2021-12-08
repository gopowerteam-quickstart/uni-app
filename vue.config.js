const TransformPages = require('uni-read-pages')
const { webpack } = new TransformPages()

module.exports = {
    indexPath: 'index.h5.html',
    devServer: {
        host: '0.0.0.0',
        port: 80,
        disableHostCheck: true
    },
    transpileDependencies: [
        '@dcloudio/uni-ui',
        'uview-ui',
        'uni-simple-router'
    ],
    configureWebpack: {
        plugins: [
            new webpack.DefinePlugin({
                PAGE_ROUTES: webpack.DefinePlugin.runtimeValue(() => {
                    const tfPages = new TransformPages({
                        includes: ['path', 'name', 'aliasPath']
                    })
                    return JSON.stringify(tfPages.routes)
                }, true)
            })
        ]
    },
    chainWebpack: config => {
        if (process.env.use_analyzer) {
            // 分析
            config
                .plugin('webpack-bundle-analyzer')
                .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin)
        }
    }
}
