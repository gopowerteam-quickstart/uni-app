// TODO: 微信H5上传需要使用 WX JSSDK进行处理

import type { ChooseFilesResult } from '../utils/upload.service'

type MediaSourceType = 'album' | 'camera'
type MediaType = 'image' | 'video'

const ImageSourceMap: {
    label: string
    value: MediaSourceType
}[] = [
    {
        label: '相册',
        value: 'album'
    },
    {
        label: '相机',
        value: 'camera'
    }
]

/**
 * 选择媒体源
 * @returns
 */
function chooseMediaSource(): Promise<MediaSourceType[]> {
    return new Promise((resolve, reject) => {
        uni.showActionSheet({
            itemList: ImageSourceMap.map(x => x.label),
            success: ({ tapIndex }) => {
                const { value } = ImageSourceMap[tapIndex]
                resolve([value])
            },
            fail: function (res) {
                reject(res)
            }
        })
    })
}

/**
 * 选择图片
 * @param param0
 * @returns
 */
export async function chooseImage({
    sourceType
}: {
    sourceType?: MediaSourceType[]
} = {}): Promise<ChooseFilesResult> {
    if (!sourceType || sourceType.length === 0) {
        sourceType = await chooseMediaSource()
    }

    return new Promise((resolve, reject) => {
        uni.chooseImage({
            sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
            sourceType: sourceType, //从相册选择
            success: ({ tempFiles }) => resolve(tempFiles),
            fail: res => reject(res)
        })
    })
}

/**
 * 选择视频
 * @param param0
 */
export async function chooseVideo({
    sourceType
}: {
    sourceType?: MediaSourceType[]
} = {}): Promise<any> {
    if (!sourceType || sourceType.length === 0) {
        sourceType = await chooseMediaSource()
    }

    return new Promise((resolve, reject) => {
        uni.chooseVideo({
            compressed: true,
            sourceType: sourceType, //从相册选择
            success: ({ tempFilePath, tempFile, size }) => {
                // #ifndef MP-WEIXIN
                resolve([tempFile])
                // #endif

                // #ifdef MP-WEIXIN
                resolve([{ path: tempFilePath, size }])
                // #endif
            },
            fail: res => reject(res)
        })
    })
}

interface ChooseMediaOption {
    type: MediaType
    source?: MediaSourceType
}

function chooseMedia({ type, source }: ChooseMediaOption) {
    switch (type) {
        case 'image':
            return chooseImage({
                sourceType: source ? [source] : ['album', 'camera']
            })
        case 'video':
            return chooseVideo({
                sourceType: source ? [source] : ['album', 'camera']
            })
    }
}

export function useMedia() {
    return {
        chooseMedia
    }
}
