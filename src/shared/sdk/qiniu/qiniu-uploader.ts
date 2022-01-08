import { useLogger } from '@/shared/hooks'

type TokenFunction = () => string
type AnyFunction = (...args: any[]) => any
const logger = useLogger()
interface QiniuConfig {
    qiniuRegion?: RegionCode
    qiniuImageURLPrefix?: string
    qiniuUploadToken?: string
    qiniuUploadTokenURL?: string
    qiniuUploadTokenFunction?: TokenFunction
    qiniuShouldUseQiniuFileName?: boolean
}

export interface QiniuOptions {
    key?: string
    region?: RegionCode
    domain?: string
    uptoken?: string
    uptokenURL?: string
    uptokenFunc?: TokenFunction
    shouldUseQiniuFileName?: boolean
}

interface QiniuUploadOptions {
    filePath: string
    success?: AnyFunction
    fail?: AnyFunction
    options?: QiniuOptions
    progress?: (res: any) => void
    cancelTask?: AnyFunction
    before?: () => void
    complete?: (res: any) => void
}

let config: QiniuConfig = {} as QiniuConfig

// 在整个程序生命周期中，只需要 init 一次即可
// 如果需要变更参数，再调用 init 即可
export function init(options: QiniuOptions) {
    config = {} as QiniuConfig
    updateConfigWithOptions(options)
}

function updateConfigWithOptions(options: QiniuOptions) {
    if (options.region) {
        config.qiniuRegion = options.region
    } else {
        logger.error('qiniu uploader need your bucket region')
    }
    if (options.uptoken) {
        config.qiniuUploadToken = options.uptoken
    } else if (options.uptokenURL) {
        config.qiniuUploadTokenURL = options.uptokenURL
    } else if (options.uptokenFunc) {
        config.qiniuUploadTokenFunction = options.uptokenFunc
    }
    if (options.domain) {
        config.qiniuImageURLPrefix = options.domain
    }
    if (options.shouldUseQiniuFileName) {
        config.qiniuShouldUseQiniuFileName = options.shouldUseQiniuFileName
    }
}

export function upload(args: QiniuUploadOptions) {
    const { filePath, options } = args
    if (!filePath) {
        logger.error('qiniu uploader need filePath to upload')
        return
    }
    if (options) {
        updateConfigWithOptions(options)
    }
    if (config.qiniuUploadToken) {
        doUpload(args)
    } else if (config.qiniuUploadTokenURL) {
        getQiniuToken(function() {
            doUpload(args)
        })
    } else if (config.qiniuUploadTokenFunction) {
        config.qiniuUploadToken = config.qiniuUploadTokenFunction()
        if (!config.qiniuUploadToken) {
            logger.error(
                'qiniu UploadTokenFunction result is null, please check the return value'
            )
            return
        }
        doUpload(args)
    } else {
        logger.error(
            'qiniu uploader need one of [uptoken, uptokenURL, uptokenFunc]'
        )
        return
    }
}

function doUpload({
    filePath,
    success,
    fail,
    options,
    progress,
    cancelTask,
    before,
    complete
}: QiniuUploadOptions) {
    if (!config.qiniuUploadToken) {
        logger.error(
            'qiniu UploadToken is null, please check the init config or networking'
        )
        return
    }
    const url = uploadURLFromRegionCode(config.qiniuRegion || 'ECN')
    let fileName = filePath.split('//')[1]
    if (options && options.key) {
        fileName = options.key
    }
    const formData: { token: string; key?: string } = {
        token: config.qiniuUploadToken
    }
    if (!config.qiniuShouldUseQiniuFileName) {
        formData['key'] = fileName
    }
    before && before()
    const uploadTask = uni.uploadFile({
        url: url || '',
        filePath: filePath,
        name: 'file',
        formData: formData,
        success: function(res) {
            const dataString = res.data
            //   // this if case is a compatibility with wechat server returned a charcode, but was fixed
            //   if(res.data.hasOwnProperty('type') && res.data.type === 'Buffer'){
            //     dataString = String.fromCharCode.apply(null, res.data.data)
            //   }
            try {
                const dataObject = JSON.parse(dataString)
                //do something
                const fileURL =
                    config.qiniuImageURLPrefix + '/' + dataObject.key
                dataObject.url = fileURL
                success && success(dataObject)
            } catch (e) {
                logger.log('parse JSON failed, origin String is: ' + dataString)
                fail && fail(e)
            }
        },
        fail: function(error) {
            logger.error(error)
            fail && fail(error)
        },
        complete: function(err) {
            complete && complete(err)
        }
    })

    uploadTask.onProgressUpdate(res => {
        progress && progress(res)
    })

    cancelTask &&
        cancelTask(() => {
            uploadTask.abort()
        })
}

function getQiniuToken(callback: () => void) {
    uni.request({
        url: config.qiniuUploadTokenURL || '',
        success: function(res: any) {
            const token = res.data.uptoken
            if (token && token.length > 0) {
                config.qiniuUploadToken = token
                callback && callback()
            } else {
                logger.error(
                    'qiniuUploader cannot get your token, please check the uptokenURL or server'
                )
            }
        },
        fail: function(error) {
            logger.error(
                'qiniu UploadToken is null, please check the init config or networking: ' +
                    error
            )
        }
    })
}

export type RegionCode = 'ECN' | 'NCN' | 'SCN' | 'NA' | 'ASG'

function uploadURLFromRegionCode(code: RegionCode): string | null {
    let uploadURL: string | null = null
    switch (code) {
        case 'ECN':
            uploadURL = 'https://up.qiniup.com'
            break
        case 'NCN':
            uploadURL = 'https://up-z1.qiniup.com'
            break
        case 'SCN':
            uploadURL = 'https://up-z2.qiniup.com'
            break
        case 'NA':
            uploadURL = 'https://up-na0.qiniup.com'
            break
        case 'ASG':
            uploadURL = 'https://up-as0.qiniup.com'
            break
        default:
            logger.error(
                'please make the region is with one of [ECN, SCN, NCN, NA, ASG]'
            )
    }
    return uploadURL
}
