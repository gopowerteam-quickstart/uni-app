import getAppLaunchTasks from '../launch/app.launch'
import getUserLaunchTasks from '../launch/user.launch'
import qs from 'qs'
import { useRequest } from 'virtual:http-request'

/**
 * 业务启动逻辑
 */
async function appLaunch() {
    // 同步并获取应用
    await Promise.all(getAppLaunchTasks())
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
    const store = useStore(store => store.user)
    // TODO: 通过TOKEN更新用户数据
}

/**
 * 业务启动逻辑
 */
async function userLaunch() {
    const store = useStore(store => store.user)
    // 获取用户Token
    await updateUserToken()
    // TODO:更新用户信息
    await updateUserData()
    // 同步并获取应用
    if (store.current) {
        await Promise.all(getUserLaunchTasks())
    }
}

/**
 * 用户初始状态检测
 * @returns
 */
async function userStateCheck() {
    const store = useStore(store => store.user)

    // 用户存在登录记录
    if (store.token) {
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
    const store = useStore(store => store.user)

    // 读取用户CODE
    const { code } =
        qs.parse(location.search, { ignoreQueryPrefix: true }) || {}

    // 验证用户CODE
    if (!code || code === store.code) {
        // AuthService.requestUserCode()
    } else {
        store.updateCode(code as string)
        return true
    }
}

/**
 * 小程序用户CODE验证
 * @returns
 */
function weappCodeCheck(): Promise<boolean> {
    const store = useStore(store => store.user)

    // 读取用户CODE
    return new Promise((resolve, reject) => {
        uni.login({
            provider: 'weixin',
            success: ({ code }) => {
                store.updateCode(code)
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
export default async function() {
    const store = useStore(store => store.app)
    // 检测系统启动状态
    if (store.ready) return
    // 系统启动逻辑
    await appLaunch()
    // 用户启动逻辑
    await userLaunch()

    // 用户初始状态检测
    // if (!userStateCheck()) {
    //     return false
    // }

    // 系统初始化完成
    store.updateReady()

    // // 安装认证守卫
    // registerGuard(authGuard)
}
