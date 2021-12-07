import { useStore } from '@/store'
import { format } from 'date-fns'

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
            date: 'color:#fcf4ca;'
        }
    },
    [LogType.warn]: {
        name: '警告',
        styles: {
            type: 'color:#FFAC1D;',
            date: 'color:#fcf4ca;'
        }
    },
    [LogType.error]: {
        name: '错误',
        styles: {
            type: 'color:#e51579;',
            date: 'color:#fcf4ca;'
        }
    }
}

const LOG_STORAGE_KEY = '__LOG__'

function Logger(level: LogType) {
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

    @Logger(LogType.log)
    public log(...message: string[]) {}

    @Logger(LogType.warn)
    public warn(...message: string[]) {}

    @Logger(LogType.error)
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
        const storgetKey = `${LOG_STORAGE_KEY}${format(
            Date.now(),
            'yyyy-MM-dd'
        )}__`

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
            date: format(Date.now(), 'yyyy-MM-dd HH:MM:ss'),
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
