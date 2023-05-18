import type { ToastConfig, ToastType } from '../types'
import { events } from '@/config/event.config'

export const useToast = () => {
  const showToast = (type: ToastType) => {
    return (text: string, option?: { duration: number }) => {
      uni.$emit(events.toast.show, {
        type,
        text,
        duration: option?.duration,
      } as ToastConfig)
    }
  }

  return {
    info: showToast('info'),
    error: showToast('error'),
    warn: showToast('warn'),
    success: showToast('success'),
  }
}
