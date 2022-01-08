import { defineStore } from 'pinia'
import { Ref } from 'vue'
import { useStorage } from '.'

/**
 * State数据结构
 */
interface State {
    /**
     * 系统准备状态
     */
    ready: boolean
    basis: Ref<AppBaseData>
    panel: AppPanelVisiable
    keyboard: AppKeyboard
}

/**
 * State初始数据
 * @returns
 */
const createState = (): State => ({
    ready: false,
    basis: useStorage('app.basis', {
        base_time: '',
        group_list: [],
        conf: {
            temp_domain: '',
            upload_domain: ''
        },
        sensitive_word: []
    }),
    panel: {
        publish: false
    },
    keyboard: {
        visiable: false,
        height: 0
    }
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
         * 更新基础应用数据
         */
        updateBasis(data: AppBaseData) {
            this.basis = data
        },
        /**
         * 更新版面显示状态
         */
        updatePanelVisiable(
            panel: { [key in keyof AppPanelVisiable]: boolean }
        ) {
            this.panel = Object.assign({}, this.panel, panel)
        },
        /**
         * 更新键盘显示状态
         */
        updateKeyboard(keyboard: AppKeyboard) {
            this.keyboard = keyboard
        }
    }
})

/**
 * 基础应用数据
 */
interface AppBaseData {
    base_time: string
    group_list: any[]
    sensitive_word: string[]
    conf: {
        temp_domain: string
        upload_domain: string
    }
}

/**
 * 发布面板显示状态
 */
interface AppPanelVisiable {
    publish: boolean
}

/**
 * 键盘显示状态
 */
interface AppKeyboard {
    visiable: boolean
    height: number
}
