<template>
  <div class="page-container">
    <div v-if="store.ready" class="page-body">
      <div class="page-body-content" :style="containerStyle">
        <slot />
      </div>
      <PageTabbar v-if="tabbar" />
    </div>
    <PageLoading v-else />
    <PageToast />
    <PageDialog />
    <PageLogin />
  </div>
</template>

<script setup lang="ts">
import type { StyleValue } from 'vue'
import { computed } from 'vue'

import PageLoading from './page-loading.vue'
import PageTabbar from './page-tabbar.vue'
import PageToast from './page-toast.vue'
import PageDialog from './page-dialog.vue'
import PageLogin from './page-login.vue'

const props = defineProps<{
  fullscreen?: boolean
  tabbar?: boolean
}>()

const store = useStore(store => store.app)

const containerStyle = computed(() => {
  const fullscreenStyle: StyleValue = props.fullscreen
    ? {
        position: 'absolute',
        left: '0',
        right: '0',
        top: '0',
        bottom: '0',
      }
    : {}

  const tabbarStyle: StyleValue = props.tabbar
    ? {
        paddingBottom: '50px',
      }
    : {}

  return Object.assign({}, fullscreenStyle, tabbarStyle)
})
</script>
