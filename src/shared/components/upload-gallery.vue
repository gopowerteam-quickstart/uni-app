<template lang="pug">
.upload-gallery
    fui-grid(:showBorder='false' v-if='type === "image"')
        fui-grid-item.p-2(:key='media.key' v-for='media in value')
            .media-wrapper.h-full.flex-center
                UploadProgress(:value='media')
                    image.h-full.w-full(
                        :src='media.localUrl'
                        mode='aspectFill'
                    )
                view.remove(@click='() => onRemoveMedia(media)')
                    fui-icon(color='#fff' name='close' size='30')
        fui-grid-item.p-2(@click='onAddImage' v-if='value.length < maxLength')
            .media-wrapper.h-full.flex-center
                fui-icon(name='plus')
    fui-grid(:showBorder='false' v-if='type === "video"')
        fui-grid-item(:key='media.key' v-for='media in value')
            .media-wrapper.h-full.flex-center
                UploadProgress(:value='media')
                    video.media-video(:controls='false' :src='media.localUrl')
                view.remove(@click='() => onRemoveMedia(media)')
                    fui-icon(color='#fff' name='close' size='30')
</template>

<script lang="ts" setup>
import { UploadTask } from '../utils/upload.service'
import UploadProgress from './upload-progress.vue'

const maxLength = 9
const media = useMedia()
const imageUploader = useUploader('image')

const props = defineProps<{
    value: UploadTask[]
    type: 'video' | 'image'
}>()

function onAddImage() {
    media.chooseMedia({ type: 'image' }).then(files => {
        imageUploader.upload(files).forEach(task => {
            get(props.value).push(task)
        })
    })
}

function onRemoveMedia(media) {
    const index = get(props.value).findIndex(x => x === media)
    get(props.value).splice(index, 1)
}
</script>

<style lang="scss" scoped>
.media-wrapper {
    border: solid 1px rgba(0, 0, 0, 0.1);
    border-radius: 20rpx;
    overflow: hidden;
    position: relative;

    .remove {
        position: absolute;
        right: 5rpx;
        top: 5rpx;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 40rpx;
        height: 40rpx;
        border-radius: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        z-index: 10;
    }
}

.media-video {
    width: 100%;
    height: 100%;
}
</style>
