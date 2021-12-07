export interface UserState {
    token: string
    current: any
}

export default {
    namespaced: true,
    state: (): UserState => ({
        token: 'zhuchentong',
        current: undefined
    }),
    mutations: {
        updateUserToken(state: UserState, value: string) {
            state.token = value
        }
    }
}
