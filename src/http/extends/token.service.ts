import type { RequestPlugin, RequestSendOptions } from '@gopowerteam/request'

export class TokenService implements RequestPlugin {
  public before = (options: RequestSendOptions) => {
    const store = useStore(store => store.user)

    const token = store.accessToken

    if (token) {
      options.headers = {
        Authorization: `Bearer ${token}`,
        ...(options.headers || {}),
      }
    }
  }
}
