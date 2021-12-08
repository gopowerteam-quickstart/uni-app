import { LogService } from '../utils/log.service'

type Constructor<T> = new (...args: any[]) => T

/**
 * 注入实例装饰器
 * 因与VUE的Inject易冲突故提供其他具名注入器
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

/**
 * 日志实例装饰器
 * @param target
 * @param propertyName
 */
export const Logger = Inject(LogService)

/**
 * 请求实例装饰器
 * @param target
 * @param propertyName
 */
export function Request<T>(Service: Constructor<T>) {
    return Inject(Service)
}
