import { appConfig } from '@/config/app.config'
import qs from 'qs'

const WECHAT_AUTH_URL = 'https://open.weixin.qq.com/connect/oauth2/authorize'
const DEFAULT_AUTH_PAGE = 'pages/index/index'

export class AuthService {
    /**
     * 创建认证地址
     * @param scope
     * @param page
     * @returns
     */
    private static createAuthUrl(
        scope: 'snsapi_base' | 'snsapi_userinfo',
        url = DEFAULT_AUTH_PAGE
    ) {
        const state = Math.random().toString(36).slice(2)
        // 创建跳转地址
        const redirect = encodeURI(`${location.origin}/${url}`)

        const params = qs.stringify({
            appid: appConfig.wechat.appid,
            scope,
            redirect_uri: redirect,
            response_type: 'code',
            state
        })

        return `${WECHAT_AUTH_URL}?${params}#wechat_redirect`
    }

    // private static generateRedirect(page, query) {
    //     const queryStr = encodeURIComponent(JSON.stringify(query))

    //     return encodeURIComponent(
    //         `${appConfig.host}${page || '/pages/wechat-login/wechat-login'}`
    //     )
    //     //?redirect=${queryStr}
    // }

    /**
     * 请求用户Code
     */
    public static requestUserCode() {
        const url = this.createAuthUrl('snsapi_base')
        location.href = url
    }

    /**
     * 请求用户信息
     */
    public static reqestUserInfo() {
        const url = this.createAuthUrl('snsapi_userinfo')
        location.href = url
    }
}
