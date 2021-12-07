import { useStore } from '@/store'
import getAppLaunchTasks from '../launch/app.launch'
import getUserLaunchTasks from '../launch/user.launch'
import { registerGuard } from '@/router'
import authGuard from '@/bootstrap/guards/auth.guard'
import qs from 'qs'
import { AuthService } from '@/shared/utils/auth.service'

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
async function updateUserToken() {
    // TODO: 通过Code更新TOKEN
}

/**
 * 获取用户信息
 * @returns
 */
async function updateUserData() {
    // TODO: 通过TOKEN更新用户数据
}

/**
 * 业务启动逻辑
 */
async function userLaunch() {
    const store = useStore()
    // 获取用户Token
    await updateUserToken()
    // TODO:更新用户信息
    await updateUserData()
    // 同步并获取应用
    if (store.state.user.current) {
        await Promise.all(getUserLaunchTasks())
    }
}

/**
 * 用户初始状态检测
 * @returns
 */
async function userStateCheck() {
    const store = useStore()

    // 用户存在登录记录
    if (store.state.user.token) {
        return true
    }

    // 获取用户Code状态
    let result: boolean | undefined = true

    // #ifdef H5
    result = await h5CodeCheck()
    // #endif
    // #ifdef MP-WEIXIN
    result = await weappCodeCheck()
    // #endif
    // #ifdef APP-PLUS
    result = true
    // #endif

    return result
}

/**
 * H5用户CODE验证
 */
function h5CodeCheck() {
    const store = useStore()

    // 读取用户CODE
    const { code } =
        qs.parse(location.search, { ignoreQueryPrefix: true }) || {}

    // 验证用户CODE
    if (!code || code === store.state.user.code) {
        AuthService.requestUserCode()
    } else {
        store.commit('user/updateUserCode', code)
        return true
    }
}

/**
 * 小程序用户CODE验证
 * @returns
 */
function weappCodeCheck(): Promise<boolean> {
    const store = useStore()

    // 读取用户CODE
    return new Promise((resolve, reject) => {
        uni.login({
            provider: 'weixin',
            success: ({ code }) => {
                store.commit('user/updateUserCode', code)
                resolve(true)
            },
            fail: () => {
                reject(false)
            }
        })
    })
}

/**
 * 系统初始化
 */
export default function () {
    const store = useStore()
    // 安装启动守卫
    registerGuard({
        type: 'before',
        guard: async ({ to }) => {
            // 检测系统启动状态
            if (store.state.app.ready) return true

            // 用户初始状态检测
            if (!userStateCheck()) {
                return false
            }

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
