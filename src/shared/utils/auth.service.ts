// import { appConfig } from '@/config/app.config'
// import qs from 'qs'
// const WECHAT_AUTH_URL = 'https://open.weixin.qq.com/connect/oauth2/authorize'

// export class AuthService {
//     /**
//      * 创建认证地址
//      * @param scope
//      * @param page
//      * @returns
//      */
//     private static createAuthUrl(
//         scope: 'snsapi_base' | 'snsapi_userinfo',
//         url
//     ) {
//         const state = Math.random()
//             .toString(36)
//             .slice(2)
//         // 创建跳转地址

//         const params = qs.stringify({
//             appid: appConfig.wechat.appid,
//             scope,
//             redirect_uri: url,
//             response_type: 'code',
//             state
//         })

//         return `${WECHAT_AUTH_URL}?${params}#wechat_redirect`
//     }

//     /**
//      * 创建跳转地址
//      * @param page
//      * @param query
//      * @returns
//      */
//     private static generateURL(
//         page = router.currentRoute.path.replace(/^\//, ''),
//         query = router.currentRoute.query || {}
//     ) {
//         delete query.code
//         delete query.state

//         const params = query
//             ? qs.stringify(query, { addQueryPrefix: true })
//             : ''

//         return encodeURI(`${location.origin}/${page}${params}`)
//     }

//     /**
//      * 请求用户Code
//      */
//     public static requestUserCode() {
//         const url = this.createAuthUrl('snsapi_base', this.generateURL())
//         location.href = url
//     }

//     /**
//      * 请求用户信息
//      */
//     public static reqestUserInfo(page?, query?) {
//         const url = this.createAuthUrl(
//             'snsapi_userinfo',
//             this.generateURL(page, query)
//         )
//         location.href = url
//     }
// }
