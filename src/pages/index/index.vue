<template lang="pug">
view.content
  image.logo(src="../../static/logo.png")
    view
      text.title {{title}} 3232
      uv-button(type="primary" @click="()=>showLog('111')") 测试
      uv-button(type="primary" shape="circle" text="按钮形状" @click="()=>showLog('444')") 123

</template>

<script lang="ts">
import Vue from 'vue'
import { uvButton } from '@/shared/uview'

export default Vue.extend({
    components: {
        uvButton
    },
    data() {
        return {
            title: 'Hello'
        }
    },
    onLoad() {},
    methods: {
        showLog(msg: string) {
            console.log(msg)
        }
    }
})
</script>

<style>
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
    color: #8f8f94;
}
</style>
