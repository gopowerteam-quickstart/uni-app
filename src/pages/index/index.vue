<template lang="pug">
PageContainer
  uni-card
    .a 12312
  view.content
      image.logo(src='/static/logo.png')
      view.text-area
          text.text-red-500(@click="updateTitle") 123
</template>

<script setup lang="ts">
const router = useRouter()
const logger = useLogger()

const userStore = useStore(store => store.user)

function updateTitle() {
    userStore.updateToken(userStore.token + '1')

    router.navigateTo('/pages/loading/index', {
        params: {
            a: 1
        }
    })
}

onPageLoad(() => {
    logger.log('12312')
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
