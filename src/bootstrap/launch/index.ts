import getAppLaunchTasks from '../launch/app.launch'
import getUserLaunchTasks from '../launch/user.launch'

/**
 * 业务启动逻辑
 */
async function appLaunch() {
  // 同步并获取应用
  await Promise.all(getAppLaunchTasks())
}

/**
 * 业务启动逻辑
 */
async function userLaunch() {
  const store = useStore(store => store.user)
  // 同步并获取应用
  if (store.current)
    return Promise.all(getUserLaunchTasks())
}

/**
 * 系统初始化
 */
export default async function () {
  const store = useStore(store => store.app)
  // 检测系统启动状态
  if (store.ready) return

  // 系统启动逻辑
  await appLaunch()

  // 用户启动逻辑
  await userLaunch()

  // 系统初始化完成
  store.updateReady()
}
