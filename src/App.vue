<script lang="ts">
import bootstrap from './bootstrap'
import { useLogger } from './shared/hooks'

const logger = useLogger()

export default {
    onLaunch: () => {
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
