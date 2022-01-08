/**
 * 请求拦截器
 */
export class RequestInterceptor<T> {
    /**
     * 拦截器状态
     */
    public defined = false

    /**
     * 拦截器
     */
    public interceptor!: (response) => T

    /**
     * 注册拦截器
     */
    public use(callback: (response) => T) {
        this.defined = true
        this.interceptor = callback
    }
}
