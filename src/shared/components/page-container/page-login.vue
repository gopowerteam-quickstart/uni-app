<template>
  <div class="page-login">
    <fui-modal :buttons="[]" :show="loginVisiable">
      <div class="content space-y-10 py-2">
        <div class="header space-y-5">
          <div class="title text-center">
            您还未登录
          </div>
          <div class="description text-center">
            请先登录后进行更多操作
          </div>
        </div>
        <div class="actions flex flex-gap-10">
          <fui-button
            border-color="#5bbaf7"
            class="cancel"
            color="#5bbaf7"
            height="60rpx"
            plain
            size="24"
            width="200rpx"
            @click="onCancel"
          >
            暂不登录
          </fui-button>
          <!-- #ifdef MP-WEIXIN -->
          <fui-button
            class="submit"
            height="60rpx"
            size="24"
            width="200rpx"
            @click="loginForWeapp"
          >
            立即登录
          </fui-button>
          <!-- #endif -->
          <!-- #ifdef H5 -->
          <fui-button
            class="submit"
            height="60rpx"
            size="24"
            width="200rpx"
            @click="loginForWechat"
          >
            立即登录
          </fui-button>
          <!-- #endif -->
          <!-- #ifdef APP-PLUS -->
          <fui-button
            class="submit"
            height="60rpx"
            size="24"
            width="200rpx"
            @click="loginForApp"
          >
            立即登录
          </fui-button>
          <!-- #endif -->
        </div>
      </div>
    </fui-modal>
  </div>
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

const store = useStore(store => store.user)
const router = useRouter()
const loginVisiable = ref(false)

const showEvent = ref('')
const resultEvent = ref('')

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
  new Promise((resolve) => {
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
