interface UserState {
    token: string
    current: any
}

const module = {
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

export default {
    key: 'user',
    module
}
