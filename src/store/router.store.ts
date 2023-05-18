import { defineStore } from 'pinia'
import type { Ref } from 'vue'
import { useStorage } from '.'

/**
 * State数据结构
 */
export interface State {
  text?: Ref<Text>
}

/**
 * State初始数据
 * @returns
 */
const createState = (): State => ({
  text: useStorage('edit.text', { placeholder: '', content: '' }),
})

export const store = defineStore('user', {
  state: createState,
  actions: {
    updateText(value: string) {
      if (this.text)
        this.text.content = value
    },
  },
})

interface Text {
  placeholder: string
  content: string
}
