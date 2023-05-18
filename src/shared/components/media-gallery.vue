<template>
  <div class="media-gallery">
    <fui-grid :columns="columns" square @click="onPreview">
      <fui-grid-item v-for="item in values" :key="item" :highlight="false">
        <MediaGalleryItem :src="item" @delete="() => onDelete(item)" />
      </fui-grid-item>
      <fui-grid-item v-for="item in tasks" :key="item.key" :highlight="false">
        <MediaGalleryItem :key="item.key" :task="item" @delete="() => onDelete(item.key)" />
      </fui-grid-item>
      <fui-grid-item v-if="allowUpload && modelValue.length < max" :highlight="false">
        <div class="media-wrapper h-full flex-center" @click="onAddMedia">
          <fui-icon name="plus" :size="40" />
        </div>
      </fui-grid-item>
    </fui-grid>
  </div>
</template>

<script setup lang="ts">
import { useVModel } from '@vueuse/core'
import type { Ref } from 'vue'
import type { UploadTask } from '../utils/upload.service'
import MediaGalleryItem from './media-gallery-item.vue'
import { MediaType } from '@/config/enum.config'

const props = withDefaults(
  defineProps<{
    allowUpload?: boolean
    multiple?: boolean
    max?: number
    type?: MediaType
    columns?: number
    modelValue: string[]
  }>(),
  {
    max: 9,
    columns: 3,
    multiple: false,
    allowUpload: true,
    type: MediaType.image,
  },
)

const emit = defineEmits(['update:modelValue'])
const tasks = ref<UploadTask[]>([])
const values = ref<string[]>([...get(props.modelValue)])

useVModel(props, 'modelValue', emit)

const media = useMedia()
const uploader = useUploader()

/**
 * 添加媒体
 */
function onAddMedia() {
  media
    .chooseMedia({ type: props.type })
    .then((files) => {
      const list = uploader.upload(files)

      // 更新任务列表
      set(tasks, [...(get(tasks) || []), ...list])

      return Promise.all(
        list.map(
          task =>
            new Promise((resolve) => {
              task.onComplete(() => resolve(task.key))
            }),
        ),
      )
    })

    .then((values) => {
      emit('update:modelValue', get([...(props.modelValue || []), ...values]))
    })
}

function onPreview() {
  //  图片预览
}

function getTasksValue() {
  return (get(tasks) || []).map(x => x.key)
}

/**
 * 删除逻辑
 */
function onDelete(value: string) {
  const deleteIndex = (data: Ref<any[] | undefined>, list: string[]) => {
    const index = list.findIndex(x => x === value)

    if (index >= 0)
      get(data)?.splice(index, 1)
  }

  // 删除任务数据
  deleteIndex(
    tasks,
    (get(tasks) || [])?.map(x => x.key),
  )

  // 删除历史数据
  deleteIndex(values, get(values) || [])

  emit('update:modelValue', [...get(values), ...getTasksValue()])
}
</script>
