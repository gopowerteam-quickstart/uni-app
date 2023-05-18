import { DisplayScene } from '@/config/enum.config'

/**
 * 获取图片地址后缀
 * @param scene
 * @returns
 */
export function generateImageSuffix(scene: DisplayScene) {
  // TODO: 获取图片样式
  return scene === DisplayScene.Normal ? '' : ''
}

/**
 * 获取图片相应地址
 * @param key
 * @param scene
 */
export function generateImageURL(
  key: string,
  scene: DisplayScene = DisplayScene.Normal,
) {
  const appStore = useStore(store => store.app)

  // 获取样式后缀
  const suffix = generateImageSuffix(scene)

  return `https://${appStore.basis.qiniu.domain}/${key}${suffix}`
}
