<template lang="pug">
PageContainer
    .text-editor-container
        textarea.text-editor(
            :placeholder='placeholder'
            :show-confirm-bar='false'
            auto-height
            maxlength='2000'
            v-model='content'
        )
    .mx-10.mt-5
        fui-button(@click='onSubmit' height='80rpx' radius='60rpx') 完成
</template>

<style lang="scss" scoped>
.text-editor-container {
    background-color: #fff;
    padding: 20rpx;
    .text-editor {
        width: 100%;
        min-height: 300rpx;
    }
}
</style>

<script lang="ts" setup>
// TODO: 小程序上文字截断效果显示错误
const router = useRouter()

const placeholder = ref('')
const content = ref('')
const toast = useToast()

watch(content, value => {
    const eventChannel = router.getOpenerEventChannel()

    if (eventChannel) {
        eventChannel.emit('onTextChange', value)
    }
})

onPageLoad(() => {
    set(placeholder, router.getParams('placeholder') || '请输入文本内容')
    set(content, router.getParams('text') || '')
})

function onSubmit() {
    const text = get(content)

    if (!text.length) {
        toast.warn('内容不能为空')
        return
    }

    router.back({
        params: {
            text: get(content)
        }
    })
}
</script>
