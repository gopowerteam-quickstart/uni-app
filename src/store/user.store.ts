import { defineStore } from 'pinia'
import { Ref } from 'vue'
import { useStorage } from '.'

/**
 * State数据结构
 */
interface State {
    token: Ref<string>
    code: Ref<string>
    key: Ref<string>
    /**
     * 当前用户信息
     */
    current: any
}

/**
 * State初始数据
 * @returns
 */
const createState = (): State => ({
    token: useStorage('user.token', ''),
    key: useStorage('user.key', ''),
    code: useStorage('user.code', ''),
    current: undefined
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
        }
    }
})
