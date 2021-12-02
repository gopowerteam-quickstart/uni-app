export interface AppState {
    ready: boolean
}

export default {
    namespaced: true,
    state: (): AppState => ({
        ready: false
    }),
    mutations: {
        updateReady(state: AppState) {
            state.ready = true
        }
    }
}
