<template lang="pug">
PageContainer
    HelloWorld
    view.text.font-bold.text-center.m-10(@click='onTestRouter') There is Page Content
    SvgIcon(
        :textGap='2'
        name='weibo'
        size='80'
        text='123123123123'
        text-position='bottom'
        textColor='red'
    )
</template>

<script setup lang="ts">
import HelloWorld from './components/hello-world.vue'

const logger = useLogger()
const router = useRouter()
const media = useMedia()
const uploader = useUploader('public')
// const logger = useLogger()

function onTestRouter() {
    // router.navigateTo('/pages/test-01/index')
    // media.chooseMedia({ type: 'image' }).then(data => {
    //     const tasks = uploader.upload(data)
    //     tasks.forEach(x => {
    //         x.onComplete(a => console.log(x.url))
    //     })
    // })
}

onPageLoad(() => {
    logger.info('页面启动')
})
</script>

<style lang="scss" scoped></style>
