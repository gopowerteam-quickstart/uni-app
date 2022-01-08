import { ProxyOptions } from 'vite'

const proxyConfig: Record<string, string | ProxyOptions> = {
    '/api': {
        target: 'http://api.my2space.cn/',
        ws: true,
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/, '')
    }
}

export default proxyConfig
