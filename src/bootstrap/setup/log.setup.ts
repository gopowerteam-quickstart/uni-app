import { LoggerService, LogType } from '@/shared/utils/logger.service'

export function logSetup() {
    LoggerService.setup({
        logLevel: LogType.log,
        storageLevel: LogType.warn
    })
}
