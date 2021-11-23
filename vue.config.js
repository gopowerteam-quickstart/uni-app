const TransformPages = require('uni-read-pages')
const { webpack } = new TransformPages()

module.exports = {
    transpileDependencies: ['uview-ui', 'uni-simple-router'],
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
    }
}
