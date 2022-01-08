import { ExtendService, RequestParams } from '@/http/core'
import { md5 } from '@/shared/common'
import qs from 'qs'
import { nanoid } from 'nanoid/non-secure'

const SECRET_KEY = '‌‍﻿‌‌﻿‍‌‌‍﻿​‌‍‍‌‌‍﻿‍‌‍‌‌​﻿​‍​﻿​​​﻿​‌​﻿‍​'.replace(
    /.{4}/g,
    s => {
        const rep = {
            '\u200b': '00',
            '\u200c': '01',
            '\u200d': '10',
            '\uFEFF': '11'
        }
        return String.fromCharCode(
            parseInt(
                s.replace(/./g, a => {
                    return rep[a]
                }),
                2
            )
        )
    }
)

/**
 * 请求签名服务
 */
export class SignatureService extends ExtendService {
    public before = (params: RequestParams) => {
        const store = useStore(store => store.user)
        const token = store.token
        const key = store.key

        if (token && key) {
            const sign_timestamp = Math.floor(Date.now() / 1000)
            const sign_guid = nanoid()
            const sign_key = `${key}${sign_timestamp}${SECRET_KEY}`

            const data = qs.stringify(
                Object.assign({}, params.getData(), {
                    sign_timestamp,
                    sign_guid,
                    sign_key
                }),
                //sign_key排序在最后
                {
                    sort: (a, b) => (a === 'sign_key' ? 1 : a.localeCompare(b))
                }
            )

            // 计算签名
            const signature = md5(`${data}`)

            // 添加授权信息
            params.setData(
                Object.assign({}, params.getData(), {
                    sign: signature.toUpperCase(),
                    sign_timestamp: sign_timestamp,
                    sign_guid
                })
            )
        }
    }
}
