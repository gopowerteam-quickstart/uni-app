import { RouterMount, createRouter } from 'uni-simple-router'

// 路由守卫列表
const RouterGuards: any[] = []

const router = createRouter({
    // debugger: true,
    encodeURI: false,
    h5: {
        mode: 'history'
    },
    platform: process.env.VUE_APP_PLATFORM,
    routes: [...PAGE_ROUTES]
})

function getRouterGuards(type: 'before' | 'after') {
    return RouterGuards.filter(x => x && x.type === type).map(
        x => x.guard
    ) as ((state) => Promise<boolean>)[]
}
/**
 * 前置路由解析守卫
 */
async function routerBeforeEach(to, from, next) {
    const guards = getRouterGuards('before')

    // 无路由守卫直接通过
    if (!guards || guards.length === 0) {
        return next()
    }

    try {
        // 执行所有守卫
        for (const guard of guards) {
            // 执行守卫
            const result: any = await guard({
                to,
                from,
                next
            })

            // 检测守卫执行状态
            if (result !== undefined && result !== true) {
                throw result
            }
        }

        return next()
    } catch (redirect) {
        if (redirect !== false) {
            next(redirect) // 被守卫拦截执行守卫返回地址
        }
    }
}

/**
 * 前置路由解析守卫
 */
async function routerAfterEach(to, from) {
    const guards = getRouterGuards('after')

    // 无路由守卫直接通过
    if (!guards || guards.length === 0) {
        return
    }

    // 执行所有守卫
    for (const guard of guards) {
        // 执行守卫
        await guard({
            to,
            from
        })
    }
}

// 全局路由前置守卫
router.beforeEach(routerBeforeEach.bind(this))
// 全局路由后置守卫
router.afterEach(routerAfterEach.bind(this))

/**
 * 守卫注册
 * @param param0
 */
export function registerGuard({ guard, type }) {
    RouterGuards.push({
        type,
        guard
    })
}

export { router, RouterMount }
