import { appConfig } from '@/config/app.config'
import { useStore } from '@/store'
import { TokenService } from '@/http/extends/token.service'
import { RequestService } from '@/http/core'
import { LogService, LogType } from '@/shared/utils/log.service'

export function logSetup() {
    LogService.setup({
        logLevel: LogType.log,
        storageLevel: LogType.warn
    })
}
