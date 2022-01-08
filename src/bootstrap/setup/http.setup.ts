import { appConfig } from '@/config/app.config'
import { TokenService } from '@/http/extends/token.service'
import { RequestService } from '@/http/core'
import { SignatureService } from '@/http/extends/signature.service'

export function httpSetup() {
    // 配置服务端信息
    RequestService.setConfig({
        gateway: {
            default: appConfig.http.gateway
        },
        qs: {
            arrayFormat: 'repeat',
            skipNulls: true,
            allowDots: true,
            encodeValuesOnly: true,
            encode: true
        }
    })

    // 添加状态拦截器
    RequestService.interceptors.status.use(respone => {
        return respone.statusCode === 200
    })

    // 添加成功拦截器
    RequestService.interceptors.success.use(respone => {
        return respone.data
    })

    // 添加失败拦截器
    RequestService.interceptors.error.use(respone => {
        return respone
    })

    // 网络异常处理
    RequestService.requestCatchHandle = respone => {
        // TODO: 退出登陆状态
        // TODO: 清空用户信息
        const defaultError = '服务通讯连接失败'
        const messageList = new Map<number, string>([
            [400, '请求参数错误'],
            [405, '请求服务方法错误'],
            [500, '服务器内部错误'],
            [403, '用户未登录'],
            [403, '无访问权限']
        ])

        if (respone) {
            // const responseMessage = (respone.errMsg || {}).message
            // const errorMessage =
            //     responseMessage ||
            //     messageList.get(respone.status) ||
            //     defaultError
            // if (respone.status === 401) {
            //     // TODO: 待验证
            //     // store.dispatch('updateToken', {
            //     //     access_token: '',
            //     //     refresh_token: ''
            //     // })
            //     // router.push('/login')
            // }
            //
        } else {
            // Notification.error(defaultError)
        }
    }

    // 安装Token认证服务
    RequestService.installExtendService(new TokenService())
    RequestService.installExtendService(new SignatureService())
}
