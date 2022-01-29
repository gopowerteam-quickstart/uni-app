import { ExtendService } from '@/http/core'

export class TokenService extends ExtendService {
    public before = (params: any) => {
        const store = useStore(store => store.user)

        if (store.token) {
            // params.options.header = params.options.header || {}
            // params.options.header['Authorization'] = `Bearer ${store.token}`
        }
    }
}
