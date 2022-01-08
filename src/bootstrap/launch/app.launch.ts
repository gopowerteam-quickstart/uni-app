import { UpdateService } from '@/shared/utils/update.service'

/**
 * 检测App更新
 */
async function appUpdateCheck() {
    UpdateService.checkUpdate()
}

/**
 * 获取键盘信息
 */
async function appKeyboardListener() {
    const HeaderHight = 100
    const store = useStore(store => store.app)

    uni.onWindowResize(({ size }) => {
        const { screenHeight, windowHeight } = size as any
        const visiable = screenHeight - windowHeight > HeaderHight

        store.updateKeyboard({
            visiable,
            height: windowHeight
        })
    })
}

/**
 * 系统启动列表
 * @returns
 */
export default function appLaunch() {
    return [
        // #ifndef MP-WEIXIN
        appUpdateCheck(),
        appKeyboardListener()
        // #endif
    ]
}
