export type ToastType = 'success' | 'warn' | 'info' | 'error'

export type ToastConfig = {
    type: ToastType
    text: string
    duration?: number
}
