<template lang="pug">
PageContainer
  view.content
      image.logo(src='/static/logo.png')
      view.text-area
          text.text-red-500(@click="updateTitle") loading
</template>

<script setup lang="ts">
const logger = useLogger()
const router = useRouter()
const title = ref('Hello')

function updateTitle() {
    logger.log(router.getParams())
}

onPageLoad((...a) => {
    logger.log(router.getParams())
})
</script>

<style>
.content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.logo {
    height: 200rpx;
    width: 200rpx;
    margin-top: 200rpx;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 50rpx;
}

.text-area {
    display: flex;
    justify-content: center;
}

.title {
    font-size: 36rpx;
    color: #8f8f94;
}
</style>
