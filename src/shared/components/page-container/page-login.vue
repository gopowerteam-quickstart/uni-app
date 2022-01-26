<template lang="pug">
.page-login
    fui-modal(:buttons='[]' :show='loginVisiable')
        .content.space-y-10.py-2
            .header.space-y-5
                .title.text-center 您还未登录
                .description.text-center 请先登录后进行更多操作
            .actions.flex.flex-gap-10
                fui-button.cancel(
                    @click='onCancel'
                    borderColor='#5bbaf7'
                    color='#5bbaf7'
                    height='60rpx'
                    plain
                    size='24'
                    width='200rpx'
                ) 暂不登录

                // #ifdef MP-WEIXIN
                fui-button.submit(
                    @click='loginForWeapp'
                    height='60rpx'
                    size='24'
                    width='200rpx'
                ) 立即登录
                // #endif

                // #ifdef H5
                fui-button.submit(
                    @click='loginForWechat'
                    height='60rpx'
                    size='24'
                    width='200rpx'
                ) 立即登录
                // #endif

                // #ifdef APP-PLUS
                fui-button.submit(
                    @click='loginForApp'
                    height='60rpx'
                    size='24'
                    width='200rpx'
                ) 立即登录
                // #endif
</template>

<style lang="scss" scoped>
.page-login {
    .title {
        font-weight: bold;
    }

    .description {
        font-size: 20rpx;
        color: rgba(0, 0, 0, 0.5);
    }
}
</style>

<script setup lang="ts">
import { events } from '@/config/event.config'
import { lastValueFrom } from 'rxjs'
import { useRequest } from 'virtual:http-request'

const store = useStore(store => store.user)
const router = useRouter()
const loginVisiable = ref(false)

const showEvent = ref('')
const resultEvent = ref('')

function onSelect(button) {}

function loginForWeapp() {
    onTestLogin()
    // TODO: 小程序登录
}

function loginForWechat() {
    onTestLogin()
    // TODO: 微信JSSDK登录
}

function loginForApp() {
    onTestLogin()
    // TODO:App登录
}

function onTestLogin() {
    new Promise(resolve => {
        setTimeout(() => {
            store.updateToken(Math.random().toString())
            store.updateKey(Math.random().toString())
            resolve(true)
        }, 1000)
    })
        .then(() => {
            submitLoginResult(true)
        })
        .catch(() => {
            submitLoginResult('登录失败')
        })
}

function onCancel() {
    submitLoginResult('取消登录')
}

function submitLoginResult(state: boolean | string) {
    set(loginVisiable, false)
    uni.$emit(get(resultEvent), state)
}

onMounted(() => {
    set(showEvent, `${router.getPath()}:${events.login.show}`)
    set(resultEvent, `${router.getPath()}:${events.login.result}`)

    uni.$on(get(showEvent), () => {
        set(loginVisiable, true)
    })
})
</script>
