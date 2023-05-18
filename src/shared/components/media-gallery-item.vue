<template>
  <div class="media-gallery-item absolute inset-0">
    <UploadProgress :value="task">
      <div class="media-wrapper flex-center absolute inset-0">
        <div class="image-gallery-item w-full h-full">
          <ImagePreview preview :src="url" />
        </div>
      </div>
    </UploadProgress>
    <div class="action flex justify-end space-x-2 p-1">
      <div class="remove" @click="emits('delete', src || task?.key || '')">
        <fui-icon name="close" :size="30" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.media-gallery-item {
  font-size: 0;

  .action {
    position: absolute;
    top: 0;
    right: 0;
  }
}

.media-wrapper {
  overflow: hidden;
  background-color: rgb(0 0 0 / 10%);
}
</style>

<script setup lang="ts">
import type { UnwrapRef } from 'vue'
import type { UploadTask } from '../utils/upload.service'
import UploadProgress from './upload-progress.vue'
import ImagePreview from './image-preview.vue'

const props = defineProps<{
  task?: UploadTask | UnwrapRef<UploadTask>
  src?: string
}>()

const emits = defineEmits({
  delete: (key: string) => key,
})

const url = computed(() => {
  return props.task?.localUrl || (props.src as string)
})

// const mediaGallery = getRootCompoent()

// function getRootCompoent() {
//   const currentInstance = getCurrentInstance()

//   let component = currentInstance?.parent

//   while (component && component?.type?.name !== 'MediaGallery') {
//     component = component.parent
//   }

//   return component
// }
</script>
