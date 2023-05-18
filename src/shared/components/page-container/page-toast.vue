<template>
  <div class="page-toast">
    <fui-message ref="toast" :background="background" />
  </div>
</template>

<script setup lang="ts">
import { templateRef } from '@vueuse/core'
import type { ToastConfig, ToastType } from '../../types'
import { events } from '@/config/event.config'

const toastRef = templateRef<any>('toast')

const toastType = ref<ToastType>('info')

// TODO：修改配色
const ToastTypeConfig: Record<ToastType, { background: string }> = {
  success: {
    background: '#00d880',
  },
  info: {
    background: '#00d880',
  },
  error: {
    background: '#00d880',
  },
  warn: {
    background: '#00d880',
  },
}

const background = computed(() => ToastTypeConfig[get(toastType)].background)

uni.$on(events.toast.show, (config: ToastConfig) => {
  set(toastType, config.type)

  get(toastRef)?.show({
    text: config.text,
    duration: config.duration,
  })
})
</script>
