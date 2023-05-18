<template>
  <PageContainer>
    <div>123</div>
    <HelloWorld />
    <view class="text font-bold text-center m-10" @click="onTestRouter">
      There is Page Content
    </view>
    <SvgIcon
      name="weibo"
      size="80"
      text="123123123123"
      text-color="red"
      :text-gap="2"
      text-position="bottom"
    />
  </PageContainer>
</template>

<style lang="scss" scoped></style>

<script setup lang="ts">
import HelloWorld from './components/hello-world.vue'

const logger = useLogger()

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
