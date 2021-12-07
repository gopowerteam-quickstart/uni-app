import { AuthService } from '@/shared/utils/auth.service'
import { switchMap, switchMapTo } from 'rxjs/operators'

const userLoginByh5 = page => {}

const userLoginByWeapp = () => {}

const userLoginByApp = () => {}

// 认证状态检测
const checkPageAuth = page => {
    // 检测是否设置认证
    if (page && page.meta && page.meta.auth === true) {
        userLoginByh5(page)

        return false
    }

    return true
}

/**
 * 安装前置角色守卫
 */
export default {
    type: 'before',
    guard: async ({ to, from, next }) => {
        // 获取目标页面
        const page = PAGE_ROUTES.find(x => x.name === to.name)
        return checkPageAuth(page)
    }
}
