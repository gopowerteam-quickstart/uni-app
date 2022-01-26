<template lang="pug">
PageContainer
    HelloWorld
    view.text.font-bold.text-center.m-10(@click='onTestRouter') There is Page Content
</template>

<script setup lang="ts">
import HelloWorld from './components/hello-world.vue'

const logger = useLogger()
const router = useRouter()
// const logger = useLogger()

function onTestRouter() {
    router.navigateTo('/pages/test-01/index')
}

onPageLoad(() => {
    logger.info('页面启动')
})
</script>

<style lang="scss" scoped></style>
