import type {
  AdapterResponse,
  ResponseInterceptor,
} from '@gopowerteam/request'
import {
  setup,
} from '@gopowerteam/request'
import { appConfig } from '@/config/app.config'
import { UniappAdapter } from '@/http/adapters/uniapp.adatper'
import { TokenService } from '@/http/extends/token.service'

const logger = useLogger()

class StatusInterceptors implements ResponseInterceptor {
  exec(respone: AdapterResponse) {
    return respone.status === 200
  }
}

class SuccessInterceptors implements ResponseInterceptor {
  exec(response: AdapterResponse) {
    return response.data
  }
}

class ErrorInterceptors implements ResponseInterceptor {
  exec(response: AdapterResponse) {
    return response.data
  }
}

class ExceptionInterceptors implements ResponseInterceptor {
  exec() {
    logger.error('发生异常')
  }
}

export function httpSetup() {
  // 配置服务端信息
  setup({
    gateway: appConfig.http.gateway,
    adapter: new UniappAdapter(),
    qs: {
      arrayFormat: 'repeat',
      skipNulls: true,
      allowDots: true,
      encodeValuesOnly: true,
      encode: true,
    },
    interceptors: {
      status: new StatusInterceptors(),
      success: new SuccessInterceptors(),
      error: new ErrorInterceptors(),
      exception: new ExceptionInterceptors(),
    },
    plugins: [new TokenService()],
  })
}
// // 添加状态拦截器
// RequestService.interceptors.status.use((respone) => {
//   return respone.statusCode === 200
// })

// // 添加成功拦截器
// RequestService.interceptors.success.use((respone) => {
//   return respone.data
// })

// // 添加失败拦截器
// RequestService.interceptors.error.use((respone) => {
//   return respone
// })

// // 网络异常处理
// RequestService.requestCatchHandle = (respone) => {
//   // TODO: 退出登陆状态
//   // TODO: 清空用户信息
//   const defaultError = '服务通讯连接失败'
//   const messageList = new Map<number, string>([
//     [400, '请求参数错误'],
//     [405, '请求服务方法错误'],
//     [500, '服务器内部错误'],
//     [403, '用户未登录'],
//     [403, '无访问权限'],
//   ])

//   // TODO:空报文情况确认
//   if (!respone) return

//   // const responseMessage = (respone.errMsg || {}).message
//   // const errorMessage =
//   //     responseMessage ||
//   //     messageList.get(respone.status) ||
//   //     defaultError
//   switch (respone.statusCode) {
//     case 401:
//       onStateCode401(respone)
//       break
//   }
// }
