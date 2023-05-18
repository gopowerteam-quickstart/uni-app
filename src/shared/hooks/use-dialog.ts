import type { DialogConfig } from '../types'
import { events } from '@/config/event.config'

export const useDialog = () => {
  const showDialog = (config: DialogConfig) => {
    const [page] = getCurrentPages().reverse()
    const path = `/${page.$page.route}`

    const showEvent = `${path}:${events.dialog.show}`
    const selectEvent = `${path}:${events.dialog.select}`

    uni.$emit(showEvent, config)

    return new Promise((resolve) => {
      uni.$once(selectEvent, (button) => {
        resolve(button.key)
      })
    })
  }

  return {
    show: showDialog,
  }
}
