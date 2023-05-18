import autoImport from 'unplugin-auto-import/vite'

export default autoImport({
  dts: 'typings/auto-imports.d.ts',
  include: [/\.tsx?$/, /\.vue\??/],
  imports: [
    'vue',
    'vue/macros',
    {
      '@/router': ['useRouter'],
      '@/store': ['useStore'],
      '@/shared/common': ['get', 'set'],
      '@/shared/hooks': [
        'useInstance',
        'useLogger',
        'useToast',
        'useMedia',
        'useUploader',
      ],
      '@/shared/lifecycle': ['onPageLoad'],
    },
  ],
  vueTemplate: true,
  eslintrc: {
    enabled: true,
  },
})
