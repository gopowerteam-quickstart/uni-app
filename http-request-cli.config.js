module.exports = {
    name: 'default',
    gateway: 'http://api.my2space.cn',
    swagger: 'docs/api-docs.json',
    model: false,
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
    tags: [
        { tag: '账号', name: 'account' },
        { tag: '广告', name: 'advert' },
        { tag: '应用', name: 'app' },
        { tag: '文章', name: 'article' },
        { tag: '资产', name: 'asset' },
        { tag: '操作', name: 'operate' },
        { tag: '空间', name: 'space' },
        { tag: '评论', name: 'comment' },
        { tag: '圈子', name: 'group' },
        { tag: '消息', name: 'message' },
        { tag: '测试', name: 'test' },
        { tag: '七牛', name: 'qiniu' },
        { tag: '我的', name: 'mine' }
    ]
}
