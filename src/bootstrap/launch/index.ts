import { useStore } from '@/store'
import getAppLaunchTasks from '../launch/app.launch'
import getUserLaunchTasks from '../launch/user.launch'
import { registerGuard } from '@/router'
import authGuard from '@/bootstrap/guards/auth.guard'

/**
 * 业务启动逻辑
 */
async function appLaunch() {
    const store = useStore()
    // 同步并获取应用
    await Promise.all(getAppLaunchTasks())
    // 更新系统状态
    store.commit('app/updateReady')
}

/**
 * 获取用户信息
 * @returns
 */
async function updateUserData() {}

/**
 * 业务启动逻辑
 */
async function userLaunch() {
    // TODO:更新用户信息
    await updateUserData()
    // 同步并获取应用
    await Promise.all(getUserLaunchTasks())
}

export default function () {
    const store = useStore()
    // 安装启动守卫
    registerGuard({
        type: 'before',
        guard: async ({ to }) => {
            // 检测系统启动状态
            if (store.state.app.ready) return true

            // 系统启动逻辑
            await appLaunch()
            // 用户启动逻辑
            await userLaunch()

            // 系统初始化完成
            store.commit('app/updateReady')

            return true
        }
    })

    // 安装认证守卫
    registerGuard(authGuard)
}
