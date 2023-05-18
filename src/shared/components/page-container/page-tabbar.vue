<template>
  <div class="tabbar-container fixed flex">
    <view
      v-for="tab in tabbars"
      :key="tab.pagePath"
      class="tab flex-auto flex flex-center flex-col"
      :class="{ 'mid-button': tab.midButton }"
      @click="() => onSelectTab(tab)"
    >
      <image class="icon py-1" mode="widthFix" :src="currentPath === tab.pagePath ? tab.selectedIconPath : tab.iconPath" />
      <div v-if="tab.text" class="text">
        {{ tab.text }}
      </div>
    </view>
  </div>
</template>

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
  }
  else {
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
