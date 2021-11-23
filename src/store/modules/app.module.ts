interface UserState {
    ready: boolean
}

const module = {
    namespaced: true,
    state: (): UserState => ({
        ready: false
    }),
    mutations: {
        updateReady(state: UserState) {
            state.ready = true
        }
    }
}

export default {
    key: 'app',
    module
}
