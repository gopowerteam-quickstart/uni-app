import { useStorage } from '@vueuse/core'
import { defineStore } from 'pinia'
import type { Ref } from 'vue'
import type { ToastType } from '@/shared/types'

/**
 * State数据结构
 */
export interface State {
  /**
   * 系统准备状态
   */
  ready: boolean
  keyboard: AppKeyboard
  message: AppMessage
  basis: Ref<AppBasisData>
  systemInfo: AppSystemInfo
}

/**
 * State初始数据
 * @returns
 */
const createState = (): State => ({
  ready: false,
  basis: useStorage('app.basis', {
    base_time: 0,
    qiniu: {
      domain: '',
    },
  }),
  keyboard: {
    visiable: false,
    height: 0,
  },
  message: {
    visiable: 0,
    type: 'info',
  },
  systemInfo: {
    pixelRatio: 2,
    screenWidth: 0,
    screenHeight: 0,
    windowWidth: 0,
    windowHeight: 0,
  },
})

export const store = defineStore('app', {
  state: createState,
  actions: {
    /**
     * 更新系统准备状态
     */
    updateReady() {
      this.ready = true
    },
    /**
     * 更新键盘显示状态
     */
    updateKeyboard(keyboard: AppKeyboard) {
      this.keyboard = keyboard
    },
    /**
     * 更新基础信息
     * @param data
     */
    updateBasis(data: AppBasisData) {
      this.basis = data
    },
    /**
     * 更新系统信息
     * @param systemInfo
     */
    updateSystemInfo(systemInfo: AppSystemInfo) {
      this.systemInfo = systemInfo
    },
  },
})

/**
 * 键盘显示状态
 */
export interface AppKeyboard {
  visiable: boolean
  height: number
}

/**
 * 应用消息状态
 */
export interface AppMessage {
  visiable: number
  type: ToastType
}

export interface AppBasisData {
  base_time: number
  qiniu: {
    domain: string
  }
}

export interface AppSystemInfo {
  platform?: string
  screenWidth: number
  screenHeight: number
  windowWidth: number
  windowHeight: number
  pixelRatio: number
  safeAreaInsets?: UniApp.SafeAreaInsets
}
