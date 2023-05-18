<template>
  <div class="safe-area-bottom">
    <div class="safe-area-bottom-content" :class="contentClass">
      <slot />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.safe-area-bottom {
  margin: 0 !important;
  z-index: 1;
  background-color: #fff;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  box-shadow: 0 0 2px 2px rgba(0, 0, 0, 0.1);

  padding-bottom: constant(safe-area-inset-bottom);
  padding-bottom: env(safe-area-inset-bottom);
}
</style>

<script setup lang="ts">
import type { Ref } from 'vue'
import { provides } from '@/config/provide.config'

defineProps<{
  contentClass?: string
}>()

const appStore = useStore(store => store.app)

const spaceBottom = inject<Ref<number>>(provides.pageContainer.spaceBottom)
const defulatSpaceBottom = 0

if (spaceBottom) {
  set(
    spaceBottom,
    Math.abs(appStore.systemInfo.safeAreaInsets?.bottom || defulatSpaceBottom),
  )
}
</script>
