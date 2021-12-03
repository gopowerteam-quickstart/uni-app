import { UpdateService } from '@/shared/utils/update.service'

async function appUpdateCheck() {
    UpdateService.checkUpdate()
}

/**
 * 系统启动列表
 * @returns
 */
export default function appLaunch() {
    return [appUpdateCheck()]
}
