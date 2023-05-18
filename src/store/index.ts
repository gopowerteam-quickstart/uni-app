import { useStorage as useStorageHook } from '@vueuse/core'
import type { StateTree, Store, StoreDefinition } from 'pinia'
import type { Ref } from 'vue'

import { store as appStore } from './app.store'
import { store as userStore } from './user.store'

const stores = {
  app: appStore,
  user: userStore,
}

export function useStore<ID extends string, S extends StateTree, G, A>(
  select: (store: typeof stores) => StoreDefinition<ID, S, G, A>,
): Store<ID, S, G, A> {
  const store = select(stores)
  return store()
}

export function useStorage<T>(key: string, defaultValue: T): Ref<T> {
  const storeKey = '__STORE__'
  return useStorageHook(`${storeKey}${key}`, defaultValue, {
    getItem: key => uni.getStorageSync(key) || null,
    setItem: (key, value) => uni.setStorageSync(key, value),
    removeItem: key => uni.removeStorageSync(key),
  })
}
