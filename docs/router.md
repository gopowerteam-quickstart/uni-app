# 路由

> 路由使用

页面跳转路由需要使用`useRouter`来进行路由操作

```
const router = useRouter()

router.navigateTo('路由页面',路由配置)
```

路由参数如下:

* mode?: 'push' | 'redirect' | 'relaunch'
* query?: { [key: string]: string | number }
* params?: { [key: string]: any }
* events?: { [key: string]: (...params: any[]) => void }

**query传递url参数**

**params传递对象参数**


> 路由回参

`router.navigateTo`会返回一个`Promise`类型,可以通过它接收下一个页面传回的参数.

`router.back`可以将参数传回给上一个页面


> 路由权限

路由可以配置页面是否需要登陆才可以进入

配置`pages.json`中对应的配置下添加`meta.needLogin:boolean`即可
