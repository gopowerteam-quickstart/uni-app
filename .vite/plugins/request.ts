import request from '@gopowerteam/request-generate/vite-plugin'

export default request({
  alias: '@',
  dir: 'src/http',
  dts: 'typings/request.d.ts',
})
