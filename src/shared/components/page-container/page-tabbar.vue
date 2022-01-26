<template lang="pug">
.tabbar-container.fixed.flex
    view.tab.flex-auto.flex.flex-center.flex-col(
        :class='{ "mid-button": tab.midButton }'
        :key='tab.pagePath'
        @click='() => onSelectTab(tab)'
        v-for='tab in tabbars'
    )
        image.icon.py-1(
            :src='currentPath === tab.pagePath ? tab.selectedIconPath : tab.iconPath'
            mode='widthFix'
        )
        .text(v-if='tab.text') {{ tab.text }}
</template>

<script setup lang="ts">
import { onHide } from '@dcloudio/uni-app'

const router = useRouter()
const currentPath = ref('')

const tabbars: {
    text: boolean
    pagePath: string
    iconPath: string
    selectedIconPath: string
    midButton: boolean
}[] = []

function onSelectTab(tab) {
    if (tab.midButton) {
        // TODO
    } else {
        uni.switchTab({ url: tab.pagePath })
    }
}

onMounted(() => {
    set(currentPath, router.getPath())
})

onHide(() => {
    // TODO
})
</script>

<style lang="scss" scoped>
.tabbar-container {
    box-shadow: 0 0 5px 5px rgba(0, 0, 0, 0.1);
    bottom: 0;
    left: 0;
    right: 0;
    background-color: #fff;

    .text {
        font-size: 24rpx;
    }

    .icon {
        width: 50rpx;
        height: 50rpx;
    }

    .mid-button {
        .icon {
            width: 70rpx;
            height: 70rpx;
        }
    }
}
</style>
