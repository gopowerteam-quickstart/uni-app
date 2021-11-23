import setup from './setup'
import launch from './launch'
import uButton from 'uview-ui/components/u-button/u-button.vue'
import Vue from 'vue'

export default async function () {
    Vue.component('u-button', uButton)
    // 基础功能配置
    await setup()
    // 系统启动
    await launch()
}
