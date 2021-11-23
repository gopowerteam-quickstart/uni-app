<template lang="pug">
view.content
  image.logo(src="../../static/logo.png")
    view
      text.title.ml-10 {{title}} 3232
      uv-button(type="primary" @click="()=>showLog('111')") 测试
      uv-button.mt-20(type="primary" shape="circle" text="按钮形状" @click="()=>showLog('444')") 123
</template>

<script lang="ts">
import { uvButton } from '@/shared/uview'
import { Component, Vue } from 'vue-property-decorator'

@Component({
    components: {
        uvButton
    }
})
export default class Index extends Vue {
    public title = 'Hello'

    public onLoad() {}

    public showLog(msg: string) {
        console.log(msg)
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
    font-size: 36rpx;
    color: $uni-color-primary;
}
</style>
