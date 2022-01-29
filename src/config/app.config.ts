export const appConfig = {
    http: {
        gateway: import.meta.env.VITE_APP_GATEWAY as string
    },
    wechat: {
        appid: import.meta.env.VITE_APP_WECHAT_APPID as string
    },
    storage: {
        public: 'cos',
        private: 'cos'
    } as const
} as const
