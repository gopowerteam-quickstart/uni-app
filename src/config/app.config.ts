export const appConfig = {
    http: {
        gateway: process.env.VUE_APP_GATEWAY as string
    }
} as const
