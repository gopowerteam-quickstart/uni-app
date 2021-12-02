import { ExtendService } from '@gopowerteam/http-request'
import { useStore } from '@/store'

export class TokenService extends ExtendService {
  public before = (params: any) => {
    const store = useStore()
    // const access_token = store.state.access_token
    // if (access_token) {
    //   params.options.header = params.options.header || {}
    //   params.options.header['Authorization'] = `Bearer ${access_token}`
    // }
  }
}
