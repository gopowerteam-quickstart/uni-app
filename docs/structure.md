# 项目结构

>   根目录结构如下

```
├── auto-import.ts                    自动导入配置
├── dist                              编译输出目录
├── docs                              文档目录
├── http-request-cli.config.js        接口生成配置
├── index.html
├── node_modules                      依赖文件
├── package.json
├── postcss.config.js                 postcss配置
├── project.config.json               小程序项目配置
├── scripts                           扩展脚本
| ├── generate-request                接口文件生成脚本
| ├── qiniu                           七牛测试
| ├── uni-upgrade                     uni依赖升级
| └── vite-plugins                    自定义vite插件
├── src
├── tailwind.config.js                tailwind配置
├── tsconfig.json                     tsconfig配置
├── typings                           全局类型目录
├── vite.config.ts                    vite配置
└── yarn.lock
```


> `src`目录结构如下

```
├── assets                            资源目录
|  ├── icons
|  └── styles
├── bootstrap                         基础框架逻辑
|  ├── guards
|  ├── launch
|  └── setup
├── components                        全局业务组件
├── config                            全局配置
├── http                              网络请求配置
|  ├── controller                     (自动生成)
|  ├── core                           网络请求核心代码
|  ├── extends                        网络请求扩展
|  └── services                       (自动生成)
├── pages                             页面文件目录

├── router                            路由工具
├── shared                            共享模块
|  ├── common                         基础共享模块
|  ├── components                     组件共享模块
|  ├── hooks                          hooks工具
|  ├── lifecycle                      生命周期支持
|  ├── sdk                            外部SDK相关
|  ├── types                          自定义类型
|  └── utils                          扩展工具
├── static                            静态文件
|  ├── icons
|  └── images
├── store                             数据存储相关
└── uni-modules
```

> 页面目录`pages`内, 目录按路由单层排列，入口文件为index.vue,页面内组件放置于目录下`components`内
