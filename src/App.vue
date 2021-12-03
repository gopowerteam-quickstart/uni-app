<script lang="ts">
export default {
    mpType: 'app',
    onLaunch: function () {
        console.log('App Launch')
    },
    onShow: function () {
        console.log('App Show')
    },
    onHide: function () {
        console.log('App Hide')
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
