import { defineStore } from 'pinia'
import type { Ref } from 'vue'
import { useStorage } from '.'

/**
 * State数据结构
 */
export interface State {
  token: Ref<string>
  code: Ref<string>
  key: Ref<string>
  /**
     * 当前用户信息
     */
  current?: User
}

/**
 * State初始数据
 * @returns
 */
const createState = (): State => ({
  token: useStorage('user.token', ''),
  key: useStorage('user.key', ''),
  code: useStorage('user.code', ''),
  current: undefined,
})

export const store = defineStore('user', {
  state: createState,
  actions: {
    updateKey(value: string) {
      this.key = value
    },
    updateToken(value: string) {
      this.token = value
    },
    updateCode(value: string) {
      this.code = value
    },
    updateCurrent(value: any) {
      this.current = value
    },
    /**
         * 更新用户信息
         */
    updateUserData() {
      // TODO: 更新用户数据
    },
  },
})

interface User {
  // 用户数据结构
}
