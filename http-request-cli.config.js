module.exports = {
    name: 'default',
    gateway: 'http://gateway.local.xbt-dev.top/',
    swagger: 'v2/api-docs',
    model: true,
    modelDir: {
        alias: '@/http/model', // 控制器目录名别
        path: './src/http/model' // 控制器目录路径
    },
    controllerDir: {
        alias: '@/http/controller', // 控制器目录名别
        path: './src/http/controller' // 控制器目录路径
    },
    serviceDir: {
        alias: '@/http/services', // 服务目录名别
        path: './src/http/services' // 服务目录名别
    },
    services: {
        'frontend-service': 'xbt-platform-frontend-service'
    },
    controllerResolver: (_, currentTag, tags) => (
        ([tag] = currentTag),
        ({ description } = tags.find(x => x.name === tag)),
        description.replace(/\s/g, '').replace(/Controller$/g, '')
    )
}
