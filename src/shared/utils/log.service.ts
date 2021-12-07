import { useStore } from '@/store'
import dayjs from 'dayjs'

export enum LogType {
    log = 1,
    warn = 2,
    error = 3
}

export interface LogConfig {
    logLevel?: number
    storageLevel?: number
}

const LoggerMapper = {
    [LogType.log]: {
        name: '调试',
        styles: {
            type: 'color:#17cf67;',
            date: 'color:#51a8ff;'
        }
    },
    [LogType.warn]: {
        name: '警告',
        styles: {
            type: 'color:#FFAC1D;',
            date: 'color:#51a8ff;'
        }
    },
    [LogType.error]: {
        name: '错误',
        styles: {
            type: 'color:#e51579;',
            date: 'color:#51a8ff;'
        }
    }
}

const LOG_STORAGE_KEY = '__LOG__'

/**
 * 日志操作装饰器
 * @param level
 * @returns
 */
function LogProvider(level: LogType) {
    return function (
        target: any,
        propertyKey: string,
        descriptor: PropertyDescriptor
    ) {
        descriptor.value = (...messages: string[]) => {
            // 打印日志
            if (level >= LogService.logLevel) {
                LogService.printLoggor(level, messages)
            }

            // 存储日志
            if (LogService.storageLevel && level >= LogService.storageLevel) {
                LogService.storageLoggor(level, messages)
            }
        }
    }
}

/**
 * 日志实例装饰器
 * @param target
 * @param propertyName
 */
export function Logger(target: Object, propertyName: string) {
    // 属性值
    const logger = new LogService()

    // 属性读取访问器
    const getter = () => logger

    // 删除属性
    // if (delete this[propertyName]) {
    // 创建新属性及其读取访问器、写入访问器
    Object.defineProperty(target, propertyName, {
        get: getter,
        enumerable: true,
        configurable: true
    })
}

export class LogService {
    public static logLevel: LogType
    public static storageLevel?: LogType
    private static systemInfo

    /**
     *
     * @param param0 配置日志级别
     */
    public static setup({ logLevel, storageLevel }: LogConfig) {
        this.logLevel = logLevel || LogType.warn
        this.storageLevel = storageLevel

        LogService.getSystemInfo()
    }

    /**
     * 获取系统信息
     */
    private static getSystemInfo() {
        LogService.systemInfo = uni.getSystemInfoSync()
    }

    @LogProvider(LogType.log)
    public log(...message: string[]) {}

    @LogProvider(LogType.warn)
    public warn(...message: string[]) {}

    @LogProvider(LogType.error)
    public error(...message: string[]) {}

    /**
     * 写入日志
     * @param logLevel
     * @param message
     */
    public static printLoggor(level, message) {
        const logger = LoggerMapper[level]
        const messageStyle = 'color:unset;'

        // 获取日志状态数据
        const record = LogService.formatLogger(logger)

        // 打印日志
        console.log(
            `%c[${record.type}] %c${record.date} -> %c${message.join(' ')}`,
            logger.styles.type,
            logger.styles.date,
            messageStyle
        )

        // Error状态打印堆栈信息
        if (level === LogType.error) {
            const errorStack = Error().stack?.split('\n')
            errorStack?.splice(1, 2)

            console.log(errorStack?.join('\n'))
        }
    }

    /**
     * 存储日志
     * @param logLevel
     * @param message
     */
    public static storageLoggor(level, message) {
        // 获取日志状态数据
        const logger = LoggerMapper[level]
        const record = LogService.formatLogger(logger)

        // 获取存储组
        const storgetKey = `${LOG_STORAGE_KEY}${dayjs().format('YYYY-MM-DD')}__`

        // 获取日志Storage
        const storage = uni.getStorageSync(storgetKey) || []
        // 更新日志Storage
        storage.push(Object.assign(record, { message }))
        uni.setStorageSync(storgetKey, storage)
    }

    /**
     * 获取日志相关信息
     * @param logger
     * @returns
     */
    private static formatLogger(logger) {
        // 获取日志函数
        const store = useStore()

        return {
            type: logger.name,
            date: dayjs().format('YYYY-MM-DD HH:MM:ss'),
            user: store.state.user.current,
            systemInfo: LogService.systemInfo
        }
    }

    /**
     * 服务端同步日志
     */
    public syncStorage() {
        // TODO:日志同步
    }
}
