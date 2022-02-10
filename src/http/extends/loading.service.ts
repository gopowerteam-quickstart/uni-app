import { Observable, Subscriber } from 'rxjs'
import { ExtendService } from '../core'

export class LoadingService extends ExtendService {
    private statusRx = new Observable<boolean>(
        subscriber => (this.subscriber = subscriber)
    )

    public status = ref(false)

    public timeout

    public subscriber!: Subscriber<boolean>

    constructor() {
        super()

        this.statusRx.subscribe(value => {
            set(this.status, value)
        })
    }

    /**
     * 请求前置操作
     */
    public before = () => {
        this.subscriber.next(true)

        // 清除超时操作
        if (this.timeout) {
            clearTimeout(this.timeout)
        }

        // 超时重置状态
        this.timeout = setTimeout(() => {
            this.subscriber.next(true)
        }, 3000)
    }

    /**
     * 请求后置操作
     */
    public after = () => {
        this.subscriber.next(false)

        if (this.timeout) {
            clearTimeout(this.timeout)
        }
    }
}
