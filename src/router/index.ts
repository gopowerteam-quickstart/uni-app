import qs from 'qs'
import { pages } from '../pages.json'

const logger = useLogger()

/**
 * 导航类型
 */
type navigateMode = 'push' | 'redirect' | 'relaunch'

/**
 * 路由导航配置
 */
interface navigateOptions {
    mode?: navigateMode
    params?: { [key: string]: any }
    events?: (...params: any[]) => void
}

/**
 * 默认导航配置
 */
const defaultNavigateMode: navigateMode = 'push'

/**
 * 验证页面权限
 * @param page
 * @returns
 */
function validatePage(page) {
    const store = useStore(store => store.user)

    if (page?.meta?.needLogin !== true) {
        return
    }

    return !!store.current
}
/**
 * 路由导航
 * @param path
 * @param options
 * @returns
 */
function navigateTo(path: RouterPages, options: navigateOptions = {}) {
    const mode = options.mode ?? defaultNavigateMode
    const page = pages.find(page => `/${page.path}` === path)

    if (!page) {
        logger.error(`页面不存在:${path}`)
        return
    }

    if (validatePage(page) === false) {
        // TODO 用户未登录处理
        logger.warn('用户未登录')
        return
    }

    // 获取路由行为
    const navigateAction = {
        push: uni.navigateTo,
        redirect: uni.redirectTo,
        relaunch: uni.reLaunch
    }[mode]

    // 获取路由参数
    const navigateOption = Object.assign(
        {
            url: `${path}${
                options.params
                    ? qs.stringify(options.params, { addQueryPrefix: true })
                    : ''
            }`
        },
        mode === 'push' ? { events: options.events } : {}
    )

    // 触发页面导航
    navigateAction(navigateOption)
}

/**
 * 获取页面参数
 * @returns
 */
function getPageParams() {
    const [page] = getCurrentPages().reverse()
    const { fullPath } = page['$page']
    const [_, query] = fullPath.split('?')

    return qs.parse(query)
}

export const useRouter = () => {
    const router = {
        navigateTo,
        back: uni.navigateBack,
        getParams: getPageParams
    }
    return router
}
