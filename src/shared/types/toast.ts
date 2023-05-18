export type ToastType = 'success' | 'warn' | 'info' | 'error'

export interface ToastConfig {
  type: ToastType
  text: string
  duration?: number
}
