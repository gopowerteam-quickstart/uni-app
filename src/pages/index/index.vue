<template lang="pug">
page-container
    .btn.text-red-500(@click='showLog') 123
</template>

<script lang="ts">
import { LogService } from '@/shared/utils/log.service'
import { Component, Vue } from 'vue-property-decorator'
import { namespace } from 'vuex-class'
const UserModule = namespace('user')

@Component({
    components: {}
})
export default class Index extends Vue {
    private logger = new LogService()

    @UserModule.State
    public token: string

    @UserModule.Mutation
    private updateUserToken

    public title = 'Hello'

    public onLoad() {}

    public showLog(msg: string) {
        this.logger.log('111')
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
