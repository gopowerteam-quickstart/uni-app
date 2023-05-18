<template>
  <div class="svg-icon" :class="containerClass">
    <image class="icon" :src="iconData" :style="imageStyle" />
    <text v-if="text" class="text" :style="textStyle">
      {{ text }}
    </text>
  </div>
</template>

<style lang="scss" scoped>
.icon {
    display: block;
}
</style>

<script setup lang="ts">
import { icons } from 'virtual:icons'
import { base64Decode, base64Encode } from '../common'

interface Props {
  name: keyof typeof icons
  size?: number | string
  text?: string
  textSize?: number | string
  textColor?: string
  textGap?: number
  textPosition?: 'right' | 'bottom'
  color?: string
}

const props = withDefaults(defineProps<Props>(), {
  size: 50,
  textSize: 30,
  textColor: '#000',
  textPosition: 'right',
  textGap: 2,
})

const changeIconColor = (icon) => {
  if (!props.color) return icon

  return base64Encode(
    base64Decode(icon).replace(/#(?:[0-9a-fA-F]{6})/g, props.color),
  )
}

const iconData = computed(() => {
  const icon = changeIconColor(icons[props.name])

  return `data:image/svg+xml;base64,${icon}`
})

const iconSize = computed(() => {
  if (typeof props.size === 'number')
    return `${uni.upx2px(props.size)}px`

  if (props.size.endsWith('rpx'))
    return `${uni.upx2px(parseInt(props.size.replace('rpx', '')))}px`

  if (props.size.endsWith('px') || props.size.endsWith('rem'))
    return props.size

  return `${uni.upx2px(parseInt(props.size))}px`
})

const imageStyle = computed(() =>
  Object.assign(
    {
      width: get(iconSize),
      height: get(iconSize),
    },
    props.color ? { color: props.color } : {},
  ),
)

const textStyle = computed(() => ({
  'font-size': `${uni.upx2px(parseInt(props.textSize.toString()))}px`,
  'color': props.textColor,
}))

const containerClass = computed(() => ({
  'flex': true,
  'flex-row': props.textPosition === 'right',
  'flex-col': props.textPosition === 'bottom',
  'justify-center': true,
  'items-center': true,
  [`flex-gap-${props.textGap}`]: true,
}))
</script>
