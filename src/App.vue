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

<style>
@import url('tailwindcss/tailwind.css');
</style>

<style lang="scss">
@import '@/assets/styles/default.scss';
@import 'uview-ui/index.scss';
</style>
