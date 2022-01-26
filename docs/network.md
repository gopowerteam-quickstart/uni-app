# 网络请求

> 网络请求配置生成

网络请求使用的请求文件自动生成，使用`scripts/generate-request`根据`swagger-api`来生成对应的接口请求文件。

请求生成文件为

* src/http/controller/*
* src/http/service/*


`controller`为请求配置信息,`service`为请求服务封装


> 网络请求使用

`scripts/vite-plugins/request`插件会生成网络请求调用方法以及网络请求类型支持.

```
const {useRequest} from 'virtual:http-request'

const service = useRequest(service=>service.XXXService)

service.action()...
```

`action`为具体的操作函数，其返回值为`Observable`类型

请求参数类型分为

* 简单请求
* 复杂请求

`简单请求`直接传递需要发送的数据参数即可

```
service.action({
  a:1
})
```

请求会安装接口对应类型(GET|POST|...)发送数据

`复杂请求`支持传递扩展服务

```
service.action(new RequestParams({
  data:{a:1},
  append:{b:2},
  pageService,
  sortService
}))
```

**`data`会转换为对应发送数据**

**`append`会转换为`URL PARAMS`**

如: http://gateway/2?a=1

**扩展服务会对请求发送与接收数据进行修改,来实现如分页，排序处理, 全局Token，全局扩展服务在`http.setup`中进行配置**







