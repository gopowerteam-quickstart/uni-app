declare module 'virtual:icons' {
  const iconNames = [
    'weibo',
    'weixin'] as const

  export const icons: Record<typeof iconNames[number], string>
}
