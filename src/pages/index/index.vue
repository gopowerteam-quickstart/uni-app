<template lang="pug">
view.content
    image.logo(src='../../static/logo.png')
        view
            view.title.p-10.text-red-500.text-4xl {{ title }} 3232
            button(@click='() => showLog("111")') 测试
            button.mt-20.bg-red-500.text-white-500(
                @click='() => showLog("444")'
                shape='circle'
                text='按钮形状'
            ) {{ token }} -go123
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

import { namespace } from 'vuex-class'

const UserModule = namespace('user')

@Component
export default class Index extends Vue {
    @UserModule.State
    public token: string

    @UserModule.Mutation
    private updateUserToken

    public title = 'Hello'

    public onLoad() {}

    public showLog(msg: string) {
        console.log(msg)

        this.updateUserToken(this.token + '1')
    }
}
</script>

<style lang="scss" scoped>
.content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.logo {
    height: 200rpx;
    width: 200rpx;
    margin: 200rpx auto 50rpx auto;
}

.text-area {
    display: flex;
    justify-content: center;
}

.title {
}
</style>
