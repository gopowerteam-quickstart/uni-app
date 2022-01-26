<template lang="pug">
.page-container
    .page-body(v-if='store.ready')
        .page-body-content(:style='containerStyle')
            slot
        PageTabbar(v-if='tabbar')
    PageLoading(v-else)
    PageToast
    PageDialog
    PageLogin
</template>

<script setup lang="ts">
import type { StyleValue } from 'vue'
import { computed } from 'vue'

import PageLoading from './page-loading.vue'
import PageTabbar from './page-tabbar.vue'
import PageToast from './page-toast.vue'
import PageDialog from './page-dialog.vue'
import PageLogin from './page-login.vue'

const store = useStore(store => store.app)

const props = defineProps<{
    fullscreen?: boolean
    tabbar?: boolean
}>()

const containerStyle = computed(() => {
    const fullscreenStyle: StyleValue = props.fullscreen
        ? {
              position: 'absolute',
              left: '0',
              right: '0',
              top: '0',
              bottom: '0'
          }
        : {}

    const tabbarStyle: StyleValue = props.tabbar
        ? {
              paddingBottom: '50px'
          }
        : {}

    return Object.assign({}, fullscreenStyle, tabbarStyle)
})
</script>
