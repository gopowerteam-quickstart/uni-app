<script lang="ts">
import { LogService } from './shared/utils/log.service'

const logger = new LogService()

export default {
    mpType: 'app',
    onLaunch: function () {
        logger.log('App Launch')
    },
    onShow: function () {
        logger.log('App Show')
    },
    onHide: function () {
        logger.log('App Hide')
    }
}
</script>

<style lang="scss">
@import '@/assets/styles/default.scss';
@import 'uview-ui/index.scss';
</style>

<style lang="scss">
// 小程序不需要 'base' 'components'，里面标签是给 html 准备的
// @import 'tailwindcss/base';
// @import 'tailwindcss/components';
@import 'tailwindcss/utilities';
/*每个页面公共css */
</style>
