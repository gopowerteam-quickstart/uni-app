export type DialogConfig = {
    title?: string
    message: string
    buttons?: { key: string | number; text: string; plain?: boolean }[]
}
