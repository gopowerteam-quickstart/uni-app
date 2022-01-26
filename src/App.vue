<script lang="ts">
import bootstrap from './bootstrap'
import { useLogger } from './shared/hooks'

const logger = useLogger()

export default {
    onLaunch: () => {
        // 系统初始化
        bootstrap()
    },
    onShow: () => {
        logger.log('App Show')
    },
    onHide: () => {
        logger.log('App Hide')
    }
}
</script>

<style>
@tailwind components;
@tailwind utilities;
</style>

<style lang="scss">
@import '@/assets/styles/default.scss';
@import '@/assets/styles/common.scss';
@import '@/assets/styles/theme.scss';
</style>
