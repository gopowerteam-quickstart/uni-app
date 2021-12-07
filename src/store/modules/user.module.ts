export interface UserState {
    token: string
    code: string
    current: any
}

export default {
    namespaced: true,
    state: (): UserState => ({
        token: '',
        code: '',
        current: undefined
    }),
    mutations: {
        updateUserToken(state: UserState, value: string) {
            state.token = value
        },
        updateUserCode(state: UserState, value: string) {
            state.code = value
        }
    }
}
