import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

// modules
import UserModule from './modules/user.module'
import AppModule from './modules/app.module'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        [AppModule.key]: AppModule.module,
        [UserModule.key]: UserModule.module
    },
    plugins: [
        createPersistedState({
            key: 'vuex',
            storage: {
                getItem: key => uni.getStorageSync(key),
                setItem: (key, value) => uni.setStorageSync(key, value),
                removeItem: key => uni.removeStorageSync(key)
            },
            paths: ['user.token']
        })
    ]
})
