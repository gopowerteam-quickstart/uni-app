import { ExtendService } from '@/http/core'
import { useStore } from '@/store'

export class TokenService extends ExtendService {
    public before = (params: any) => {
        const store = useStore()
        const token = store.state.user.token

        if (token) {
            params.options.header = params.options.header || {}
            params.options.header['Authorization'] = `Bearer ${token}`
        }
    }
}
