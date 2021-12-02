<template lang="pug">
page-container
    .btn.text-red-500 123
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { namespace } from 'vuex-class'
const UserModule = namespace('user')

@Component({
    components: {}
})
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
    color: yellow;
}
</style>
