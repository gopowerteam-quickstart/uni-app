<template lang="pug">
.page-container(:style='containerStyle')
    .page-body(v-if="store.ready")
      slot
    .page-loading(v-else)
      page-loading
    .a {{store.ready}}
    //- publish-panel(v-if='tabbar')
    //- tabbar(v-if='tabbar')
</template>

<script setup lang="ts">
// import PublishPanel from '@/components/publish-panel.vue'
// import Tabbar from '@/components/tabbar.vue'
import type { StyleValue } from 'vue'
import { computed } from 'vue'
import PageLoading from './page-loading.vue'
const store = useStore(store => store.app)

const props = defineProps({
    fullscreen: {
        type: Boolean
    },
    tabbar: {
        type: Boolean
    }
})

const containerStyle = computed(() => {
    const fullscreenStyle: StyleValue = props.fullscreen
        ? {
              position: 'absolute',
              inset: 0
          }
        : {}

    const tabbarStyle: StyleValue = props.tabbar
        ? {
              paddingBottom: '50px'
          }
        : {}

    return Object.assign({}, fullscreenStyle, tabbarStyle)
})

onMounted(()=>{
})
</script>
