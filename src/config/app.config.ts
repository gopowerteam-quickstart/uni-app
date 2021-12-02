export const appConfig = {
    http: {
        gateway: process.env.GATEWAY_DEFAULT as string
    }
} as const
