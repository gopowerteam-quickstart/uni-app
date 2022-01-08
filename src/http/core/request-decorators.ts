import { RequestObject } from './request-object'
import { RequestParams } from './request-params'
import { IRequestServerConfig } from './interfaces'
/**
 * 网络请求行为装饰器
 */
export function RequestAction({
    server,
    force
}: {
    server: IRequestServerConfig
    force?: boolean
}) {
    return (target: any, name: string, descriptor: PropertyDescriptor) => {
        const generateRequestObject = () => {
            // 请求对象
            const object = new RequestObject(server)

            return object
        }

        const requestObject = generateRequestObject()

        // 存储历史方法
        const _value = descriptor.value

        function getRequestObject(requestParams: RequestParams) {
            if (force || requestParams.getOptions('force') === true) {
                return generateRequestObject()
            } else {
                return requestObject
            }
        }

        // 传入请求方法
        descriptor.value = (
            params?: RequestParams | { [key: string]: any }
        ) => {
            const requestParams = RequestParams.create(params)

            // 设置请求对象
            requestParams.setRequestObject(getRequestObject(requestParams))

            // 传入更新后的请求对象
            return _value.call(target, requestParams)
        }

        return descriptor
    }
}
