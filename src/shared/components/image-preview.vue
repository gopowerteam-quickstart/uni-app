<template>
  <image-container>
    <image
      :mode="mode"
      :src="url"
      :style="customStyle"
      @click="onPreviewImage"
    />
  </image-container>
</template>

<style lang="scss" scoped>
.image-container {
  image {
    max-width: 100%;
    max-height: 100%;
    height: 100%;
  }
}
</style>

<script setup lang="ts">
import { asyncComputed } from '@vueuse/core'
import { DisplayScene } from '@/config/enum.config'

interface Props {
  mode?: string
  src: string
  scene?: DisplayScene
  preview?: boolean
  imageStyle?: string
  rounded?: boolean
  width?: string
  height?: string
  gap?: number
}

const props = withDefaults(defineProps<Props>(), {
  preview: false,
  mode: 'aspectFit',
  scene: DisplayScene.Normal,
  rounded: false,
  width: '',
  height: '',
  imageStyle: '',
  gap: 0,
})

const emits = defineEmits(['click'])

const appStore = useStore(store => store.app)

function getImageSuffix(scene: DisplayScene) {
  // TODO:获取图片样式

  return scene === DisplayScene.Normal ? '' : ''
}

const customStyle = computed(
  () =>
    (props.width ? `width:${props.width};` : '')
    + (props.height ? `height:${props.height};` : '')
    + (props.rounded ? 'border-radius:100%;' : '')
    + props.imageStyle,
)

/**
 * 获取图片相应地址
 * @param key
 * @param scene
 */
function getImageUrl(key: string, scene: DisplayScene) {
  // 获取样式后缀
  const suffix = getImageSuffix(scene)

  return `https://${appStore.basis.qiniu.domain}/${key}${suffix}`
}

/**
 * 获取地址URL
 */
const url = asyncComputed(
  async () => {
    const prefixs = ['blob:', 'http://', 'https://']

    if (prefixs.some(prefix => props.src?.startsWith(prefix)))
      return props.src

    if (props.src)
      return getImageUrl(props.src, props.scene)
  },
  '',
  {
    lazy: true,
  },
)

function onPreviewImage() {
  emits('click')

  if (!props.preview)
    return

  const image = get(url)

  if (image) {
    uni.previewImage({
      urls: [image],
    })
  }
}
</script>
