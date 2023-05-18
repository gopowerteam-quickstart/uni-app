import eslint from 'vite-plugin-eslint'

export default eslint({
  fix: true,
  include: ['src/**/*.{vue,ts,tsx}'],
})
