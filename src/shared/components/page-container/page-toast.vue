<template lang="pug">
.page-toast
    fui-message(:background='background' ref='toast')
</template>

<script setup lang="ts">
import { events } from '@/config/event.config'
import { templateRef } from '@vueuse/core'
import type { ToastConfig, ToastType } from '../../types'

const toastRef = templateRef<any>('toast')

const toastType = ref<ToastType>('info')

const background = computed(() => ToastTypeConfig[get(toastType)].background)

// TODO：修改配色
const ToastTypeConfig: Record<ToastType, { background: string }> = {
    success: {
        background: '#00d880'
    },
    info: {
        background: '#00d880'
    },
    error: {
        background: '#00d880'
    },
    warn: {
        background: '#00d880'
    }
}

uni.$on(events.toast.show, (config: ToastConfig) => {
    set(toastType, config.type)

    get(toastRef)?.show({
        text: config.text,
        duration: config.duration
    })
})
</script>
