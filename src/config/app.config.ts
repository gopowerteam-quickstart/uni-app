export const appConfig = {
    http: {
        gateway: process.env.VUE_APP_GATEWAY as string
    },
    wechat: {
        appid: process.env.VUE_APP_WECHAT_APPID as string
    }
} as const
