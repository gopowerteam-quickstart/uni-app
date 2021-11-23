import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
/* #ifdef MP-WEIXIN */
import { localStorage } from 'mp-storage'
/* #endif */

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
            storage: localStorage,
            paths: []
        })
    ]
})
