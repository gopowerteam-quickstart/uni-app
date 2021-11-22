import Vue from 'vue'
import App from './App.vue'

import { router, RouterMount } from './router'

Vue.use(router)
Vue.config.productionTip = false

const app = new Vue({
    ...App
})

function mountApp() {
    // #ifdef H5
    RouterMount(app, router, '#app')
    // #endif

    // #ifndef H5
    app.$mount() //为了兼容小程序及app端必须这样写才有效果
    // #endif
}

mountApp()
