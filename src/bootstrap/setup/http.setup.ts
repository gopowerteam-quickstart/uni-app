import { appConfig } from '@/config/app.config'
import { TokenService } from '@/http/extends/token.service'
import { RequestService } from '@/http/core'
import { useLogin } from '@/shared/hooks'
import { pages } from '@/pages.json'

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

        // TODO:空报文情况确认
        if (!respone) return

        // const responseMessage = (respone.errMsg || {}).message
        // const errorMessage =
        //     responseMessage ||
        //     messageList.get(respone.status) ||
        //     defaultError
        switch (respone.statusCode) {
            case 401:
                onStateCode401(respone)
                break
        }
    }

    /**
     * 401错误码处理
     * 仅处理登陆过期问题
     * @param response
     */
    function onStateCode401(respone: UniApp.RequestSuccessCallbackResult) {
        const login = useLogin()
        const router = useRouter()

        const onLoginSuccess = () => {
            // 重新加载当前页面
            router.navigateTo(router.getPath(), {
                mode: 'relaunch'
            })
        }

        const onLoginCancel = () => {
            const page = pages.find(
                page => page.path === router.getPath().replace(/^\//, '')
            )

            // 预留其他情况处理
            switch (true) {
                case page?.meta?.needLogin === true:
                    router.navigateTo('/pages/index/index', {
                        mode: 'relaunch'
                    })
                    break
            }
        }

        login
            .show()
            .then(() => {
                onLoginSuccess()
            })
            .catch(() => {
                onLoginCancel()
            })
    }

    // 安装Token认证服务
    RequestService.installExtendService(new TokenService())
}
