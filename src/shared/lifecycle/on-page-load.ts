import { onLoad } from '@dcloudio/uni-app'

export function onPageLoad(callback: (...params) => void) {
  const store = useStore(store => store.app)

  const execPageLoad = params => (store.ready ? callback(...params) : false)

  onLoad((...params) => {
    if (execPageLoad(params) === false)
      store.$subscribe(() => execPageLoad(params))
  })
}
