import { createSSRApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'

export const createApp = () => ({
    app: createSSRApp(App).use(createPinia())
})
