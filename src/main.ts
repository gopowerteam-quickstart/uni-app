import Vue from 'vue'
import App from './App.vue'

import { router, RouterMount } from '@/router'
import store from '@/store'

import uView from 'uview-ui'
import bootstrap from '@/bootstrap'

Vue.use(router)
Vue.use(uView)

Vue.config.productionTip = false
Vue.prototype.$store = store

/**
 * 页面启动
 */
function mountApp() {
    const app = new Vue({
        ...App
    })

    // #ifdef H5
    RouterMount(app, router, '#app')
    // #endif

    // #ifndef H5
    // 兼容小程序
    app.$mount()
    // #endif
}

// 应用启动
bootstrap().then(mountApp)
