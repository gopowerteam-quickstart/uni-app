type Constructor<T> = new (...args: any[]) => T

/**
 * 日志实例装饰器
 * @param target
 * @param propertyName
 */
export function Inject<T>(Service: Constructor<T>) {
    return (target: Object, propertyName: string) => {
        // 属性值
        const instance = new Service()

        // 属性读取访问器
        const getter = () => instance

        // 创建新属性及其读取访问器、写入访问器
        Object.defineProperty(target, propertyName, {
            get: getter,
            enumerable: true,
            configurable: true
        })
    }
}
