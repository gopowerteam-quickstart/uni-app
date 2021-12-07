export class UpdateService {
    /**
     * 应用更新检测
     */
    public static checkUpdate() {
        //#ifdef MP-WEIXIN
        UpdateService.checkUpdateWeapp()
        //#endif
    }

    /**
     * 检测小程序更新
     */
    private static checkUpdateWeapp() {
        const updateManager = uni.getUpdateManager()

        updateManager.onUpdateReady(() => {
            uni.showModal({
                title: '更新提示',
                content: '新版本已经准备好，是否重启应用？',
                success: ({ confirm }) => confirm && updateManager.applyUpdate()
            })
        })

        updateManager.onUpdateFailed(res => {
            // 新的版本下载失败
        })

        updateManager.onCheckForUpdate(({ hasUpdate }) => {
            // 请求完新版本信息的回调
            hasUpdate &&
                uni.showToast({
                    title: '检测到新版本,正在准备更新'
                })
        })
    }

    /**
     *  检测App更新
     **/
    private static checkUpdateApp() {
        // TODO:App更新检测
        // wgt更新或整包更新
    }
}
