<template>
  <div class="page-dialog">
    <fui-modal
      ref="dialog"
      :buttons="dialogConfig?.buttons"
      :descr="dialogConfig?.message"
      :show="dialogVisiable"
      :title="dialogConfig?.title"
      @click="onSelect"
    />
  </div>
</template>

<script setup lang="ts">
import { events } from '@/config/event.config'
import type { DialogConfig } from '@/shared/types'

const router = useRouter()
const dialogVisiable = ref(false)
const dialogConfig = ref<DialogConfig>()

const defaultConfig = {
  title: '提示',
  buttons: [
    {
      key: 'cancel',
      text: '取消',
    },
    {
      key: 'ok',
      text: '确定',
    },
  ],
}

const showEvent = ref('')
const selectEvent = ref('')

function onSelect(button) {
  set(dialogVisiable, false)
  uni.$emit(get(selectEvent), button)
}

onMounted(() => {
  set(showEvent, `${router.getPath()}:${events.dialog.show}`)
  set(selectEvent, `${router.getPath()}:${events.dialog.select}`)

  uni.$on(get(showEvent), (config: DialogConfig) => {
    set(dialogConfig, Object.assign({}, defaultConfig, config))
    set(dialogVisiable, true)
  })
})
</script>
